import { z } from "zod";
import { OpenAI } from "openai";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const openaiRouter = createTRPCRouter({
  complete: protectedProcedure
    .input(z.object({
      message: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!process.env.OPENAI_API_KEY) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API key is not set.",
        })
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: input.message,
          },
        ],
      })

      const result = completion.choices[0]?.message?.content;

      if (!result) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API did not return a result.",
        })
      }

      if (!completion.usage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API did not return usage information.",
        })
      }

      await ctx.db.tokenUsage.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          input: completion.usage.prompt_tokens,
          output: completion.usage.completion_tokens,
        },
      });

      return {
        result,
      };
    }),
});
