import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const llmProvidersRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.llmProvider.findMany({
      include: {
        llms: true,
      },
    });
  }),
});
