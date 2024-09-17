import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateObject } from "ai";

import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance } from "~/actions";

const shaperPrompt = `You are an AI assistant designed to help users avoid common pitfalls in feature development. Below are a few examples where initial plans for features were too complex or misaligned with user needs. Your task is to assist users in refining their feature ideas to ensure smooth implementation and that the final solution effectively addresses the core problem. Use the following examples as a guide and help users avoid similar issues in their own projects.

- Data Export Feature: A client initially wanted a complex export tool for reports supporting various formats. After analysis, it turned out users only needed a filtered Excel view. The project was simplified to a basic "Export to Excel" feature.
- Notification System: A team planned an extensive notification system for a project management tool, but users found it overwhelming. Instead, a weekly digest report was created to summarize key updates.
- Search and Filter Feature: A client wanted an advanced search function for an e-commerce site. Analysis showed users preferred simple filters like "Bestsellers." The implementation was streamlined accordingly.
`;

const inputSchema = z.object({
  productContext: z.string(),
  featureIdea: z.string(),
  llm: z.string().default("gpt-4o-mini"),
  customInstruction: z.string().optional(),
});

const outputSchema = z.object({
  productSummary: z.string(),
  featureFeedback: z.string(),
});
export type Output = z.infer<typeof outputSchema>;

export const shaperRouter = createTRPCRouter({
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

    const messages: CoreMessage[] = [];

    messages.push({ role: "system", content: shaperPrompt });
    messages.push({
      role: "user",
      content: `Product context: ${input.productContext}`,
    });
    messages.push({
      role: "user",
      content: `Feature idea: ${input.featureIdea}`,
    });
    if (input.customInstruction) {
      messages.push({
        role: "system",
        content: `User instructions: ${input.customInstruction}`,
      });
    }

    const { object, usage } = await generateObject({
      model,
      messages,
      schema: outputSchema,
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
