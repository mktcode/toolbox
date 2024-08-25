import { get_encoding } from "tiktoken";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { tokenPrices } from "~/server/tokenPrices";

const encodings = {
  GPT4o: "o200k_base",
  GPTlegacy: "cl100k_base",
} as const;

export const tokensRouter = createTRPCRouter({
  calculatePrice: publicProcedure
    .input(
      z.object({
        input: z.string(),
        output: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const encoding = get_encoding(encodings.GPT4o);
      const inputTokens = encoding.encode(input.input);
      const outputTokens = encoding.encode(input.output);
      encoding.free();

      return {
        inputTokens: inputTokens.length,
        outputTokens: outputTokens.length,
        inputPrice: inputTokens.length * tokenPrices.input,
        outputPrice: outputTokens.length * tokenPrices.output,
      };
    }),
});
