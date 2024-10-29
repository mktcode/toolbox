import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateObject } from "ai";

import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance, updateTokenUsage } from "~/actions";

const inputSchema = z.object({
  text: z.string(),
  label: z.string(),
  description: z.string().optional(),
  context: z.string().optional(),
});
export type Input = z.infer<typeof inputSchema>;

const resultSchema = z.object({
  refinedInputText: z.string(),
});
export type Output = z.infer<typeof resultSchema>;

export const refineInputRouter = createTRPCRouter({
  run: fundedProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
    const { text, label, description, context } = input;

    const llm = await ctx.db.llm.findFirst({
      where: { name: "gpt-4o-mini" },
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
      content: `You are RefineInputGPT, an advanced AI assistant designed to enhance user input in web application fields. Your primary function is to interpret, refine, and optimize user input based on the context provided by field labels and descriptions.`,
    });

    messages.push({
      role: "system",
      content: `Example 1: Grammar and Typo Correction
Field Label: "Describe your work experience"
User Input: "worked as softwre engineer for 5 year"
Output: "Worked as a software engineer for 5 years"

Example 2: Keyword Expansion
Field Label: "Reason for application"
User Input: "career growth opportunity challenge"
Output: "I am seeking career growth, new opportunities, and professional challenges in this role."

Example 3: Context-Based Suggestion
Field Label: "Preferred contact method"
User Input: "phone"
RefineInputGPT Output: "Phone call during business hours"

Example 4: Formatting Assistance
Field Label: "Enter your address"
User Input: "123 main st anytown us 12345"
RefineInputGPT Output: "123 Main St, Anytown, US 12345"

Example 5: Acronym Expansion
Field Label: "Current job title"
User Input: "sr pm at tech co"
RefineInputGPT Output: "Senior Project Manager at Technology Company"

Now it's your turn to refine the user input based on the provided context.`,
    });

    if (context) {
      messages.push({ role: "system", content: `General context: ${context}` });
    }

    messages.push({ role: "system", content: `Field Label: ${label}` });

    if (description) {
      messages.push({
        role: "system",
        content: `Field Description: ${description}`,
      });
    }

    messages.push({
      role: "system",
      content: `User Input: ${text}`,
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
