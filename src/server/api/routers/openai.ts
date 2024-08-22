import { z } from "zod";
import { OpenAI } from "openai";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { tokenPrices } from "~/server/tokenPrices";

export const openaiRouter = createTRPCRouter({
  complete: protectedProcedure
    .input(
      z.object({
        message: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      if (user.currentBalance === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Insufficient balance.",
        });
      }

      if (!process.env.OPENAI_API_KEY) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API key is not set.",
        });
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: input.message,
          },
        ],
      });

      const result = completion.choices[0]?.message?.content;

      if (!result) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API did not return a result.",
        });
      }

      if (!completion.usage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API did not return usage information.",
        });
      }

      await ctx.db.tokenUsage.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          input: completion.usage.prompt_tokens,
          output: completion.usage.completion_tokens,
        },
      });

      // update balance
      const tokenUsage = await ctx.db.tokenUsage.findMany({
        where: { userId: user.id },
      });
      const topUps = await ctx.db.topUp.findMany({
        where: { userId: user.id, confirmedAt: { not: null } },
      });

      const totalTokenCost = tokenUsage.reduce((acc, { input, output }) => {
        return acc + input * tokenPrices.input + output * tokenPrices.output;
      }, 0);

      const totalTopUp = topUps.reduce((acc, { amount }) => {
        return acc + (amount ?? 0);
      }, 0);

      const balance = totalTopUp - totalTokenCost;

      await ctx.db.user.update({
        where: { id: user.id },
        data: { currentBalance: balance },
      });

      return {
        result,
      };
    }),
});
