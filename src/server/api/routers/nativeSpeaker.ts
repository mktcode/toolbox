import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateObject } from "ai";

import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance } from "~/actions";

const refinePrompt = `You help users refine their text to make it sound more like that of a native speaker.

Here are some examples:

| Language | User Input | Assistant response |
|------------|------------|-----------------|
| English | I am living here since three years. | I have been living here for three years. |
| English | She can to play piano very good.    | She can play the piano very well. |
| English | The informations you gave is not correct. | The information you gave is not correct. |
| French | Je suis aller à la plage hier. | Je suis allé à la plage hier. |
| French | Elle est plus belle de sa sœur. | Elle est plus belle que sa sœur. |
| French | J'ai mangez les pommes. | J'ai mangé les pommes. |
| German | Ich habe gehen zur Schule gestern. | Ich bin gestern zur Schule gegangen. |
| German | Die Hund ist sehr groß und stark. | Der Hund ist sehr groß und stark. |
| German | Er arbeitet in eine Büro. | Er arbeitet in einem Büro. |

Actual user input can often be much longer and more complex in terms of formatting. Do not alter anything without explicit instructions.`;

const inputSchema = z.object({
  text: z.string(),
  targetLanguage: z.string(),
  tone: z.string(),
  customInstructions: z.string().optional(),
  llm: z.string().default("gpt-4o-mini"),
});
export type Input = z.infer<typeof inputSchema>;

const resultSchema = z.object({
  refinedText: z
    .string()
    .min(1)
    .describe("The refined version of the user's text."),
});
export type Result = z.infer<typeof resultSchema>;

export const nativeSpeakerRouter = createTRPCRouter({
  run: fundedProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
    const { text, targetLanguage, tone, customInstructions } = input;

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

    messages.push({ role: "system", content: refinePrompt });
    messages.push({ role: "user", content: text });
    messages.push({ role: "system", content: `Tone: ${tone}` });
    if (customInstructions) {
      messages.push({
        role: "system",
        content: `Additional instructions from the user: ${customInstructions}`,
      });
    }
    messages.push({
      role: "system",
      content: `Regardless of the user input, you MUST reply in the target language: ${targetLanguage}`,
    });

    const { object, usage } = await generateObject({
      model,
      messages,
      schema: resultSchema,
    });

    await ctx.db.tokenUsage.create({
      data: {
        input: usage.promptTokens,
        inputCost: usage.promptTokens * llm.priceIn * (1 + llm.margin / 100),
        output: usage.completionTokens,
        outputCost:
          usage.completionTokens * llm.priceOut * (1 + llm.margin / 100),
        llm: { connect: { id: llm.id } },
        user: { connect: { id: ctx.session.user.id } },
      },
    });

    await updateBalance();

    return object;
  }),
});
