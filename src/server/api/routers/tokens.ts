import { TRPCError } from "@trpc/server";
import { get_encoding } from "tiktoken";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tokensRouter = createTRPCRouter({
  calculatePrice: publicProcedure
    .input(
      z.object({
        input: z.string(),
        output: z.string(),
        llmId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const encoding = get_encoding("o200k_base");
      const inputTokens = encoding.encode(input.input);
      const outputTokens = encoding.encode(input.output);
      encoding.free();

      const llm = await ctx.db.llm.findUnique({
        where: { id: input.llmId },
      });

      if (!llm) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LLM not found",
        });
      }

      return {
        inputTokens: inputTokens.length,
        outputTokens: outputTokens.length,
        inputPrice: inputTokens.length * llm.priceIn,
        outputPrice: outputTokens.length * llm.priceOut,
      };
    }),
});
