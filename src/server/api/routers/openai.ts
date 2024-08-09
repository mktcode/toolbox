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
    .mutation(async ({ input }) => {
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

      const result = completion.choices[0]?.message?.content ?? null;

      return {
        result,
      };
    }),
});
