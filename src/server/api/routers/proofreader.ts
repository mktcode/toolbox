import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateObject } from "ai";

import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance, updateTokenUsage } from "~/actions";

const mainPrompt = `You are a professional editor. Your task is to proofread the user's text below. Make sure it is free of errors and reads well.`;

const inputSchema = z.object({
  text: z.string(),
  customInstructions: z.string().optional(),
  llm: z.string().default("gpt-4o-mini"),
});
export type Input = z.infer<typeof inputSchema>;

const resultSchema = z.object({
  language: z.string().describe("The language of the text"),
  corrections: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Mistakes in the text and their corrections"),
  suggestions: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Suggestions for improving the text"),
  correctedText: z.string().describe("The corrected text"),
});
export type Output = z.infer<typeof resultSchema>;

export const proofreaderRouter = createTRPCRouter({
  run: fundedProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
    const { text, customInstructions } = input;

    const llm = await ctx.db.llm.findFirst({
      where: { name: input.llm },
    });

    if (!llm) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "LLM not found",
      });
    }

    const model = openai(llm.name);

    const messages: CoreMessage[] = [];

    messages.push({ role: "system", content: mainPrompt });
    if (customInstructions) {
      messages.push({
        role: "system",
        content: `Additional instructions from the user: ${customInstructions}`,
      });
    }
    messages.push({
      role: "system",
      content: `The next message is the user's text that you need to proofread. Please talk to the user in the language they used.`,
    });
    messages.push({
      role: "user",
      content: `${text}`,
    });
    messages.push({
      role: "system",
      content: `Now it's your turn to proofread the text. If there are no mistakes or you don't want to make any suggestions, submit an empty array. Remember to talk in the language the user used.`,
    });

    const { object, usage } = await generateObject({
      model,
      messages,
      schema: resultSchema,
      temperature: 0.5,
    });

    await updateTokenUsage(usage, llm);
    await updateBalance();

    return object;
  }),
});
