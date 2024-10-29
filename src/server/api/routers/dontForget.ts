import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateObject } from "ai";

import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance, updateTokenUsage } from "~/actions";

const inputSchema = z.object({
  text: z.string(),
  topic: z.string(),
  llm: z.string(),
  customInstructions: z.string().optional(),
});
export type Input = z.infer<typeof inputSchema>;

const resultSchema = z.object({
  response: z.string(),
});
export type Output = z.infer<typeof resultSchema>;

export const dontForgetRouter = createTRPCRouter({
  run: fundedProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
    const { text, topic, customInstructions } = input;

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

    messages.push({
      role: "system",
      content: `As you review the user's plan or task list, identify any important steps, details, or considerations that may have been overlooked. Ask thought-provoking questions to ensure thorough planning, and suggest specific actions or elements that are commonly forgotten in similar tasks. Be clear, concise, and provide actionable recommendations for what should be remembered or reconsidered in order to ensure successful execution.`,
    });
    if (customInstructions) {
      messages.push({
        role: "system",
        content: `Additional instructions from the user: ${customInstructions}`,
      });
    }
    messages.push({ role: "system", content: `Topic: ${topic}` });
    messages.push({ role: "user", content: text });
    messages.push({
      role: "system",
      content: `Now start with your review.`,
    });

    const { object, usage } = await generateObject({
      model,
      messages,
      schema: resultSchema,
    });

    await updateTokenUsage(usage, llm);
    await updateBalance();

    return object;
  }),
});
