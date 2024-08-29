import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateObject } from "ai";

import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance } from "~/actions";

const searchPrompt = `You help users find information online. You do the research an present the most relevant information in a clear and concise manner.`;

const inputSchema = z.object({
  inputs: z
    .array(
      z.object({
        query: z.string(),
        responseLength: z.enum(["short", "medium", "long"]),
        customInstruction: z.string().optional(),
      }),
    )
    .min(1)
    .max(10),
  llm: z.string().default("gpt-4o-mini"),
  customInstruction: z.string().optional(),
});

const resultSchema = z.object({
  answer: z.string(),
  details: z.array(
    z.object({
      url: z.string(),
      summary: z.string(),
    }),
  ),
});
type Result = z.infer<typeof resultSchema>;

export const nativeSpeakerRouter = createTRPCRouter({
  run: fundedProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
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
    const results: Result[] = [];

    const globalCustomInstruction = input.customInstruction;

    for (const {
      query,
      responseLength,
      customInstruction: itemCustomInstructions,
    } of input.inputs) {
      const messages: CoreMessage[] = [];

      const customInstructions =
        itemCustomInstructions ?? globalCustomInstruction;

      messages.push({ role: "system", content: searchPrompt });
      if (customInstructions) {
        messages.push({
          role: "system",
          content: `User instructions: ${customInstructions}`,
        });
      }
      messages.push({
        role: "system",
        content: `Response length: ${responseLength}`,
      });
      messages.push({ role: "user", content: query });

      const { object, usage } = await generateObject({
        model,
        messages,
        schema: resultSchema,
      });

      results.push(object);

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
    }

    return results;
  }),
});
