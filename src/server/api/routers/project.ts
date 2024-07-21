import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.project.create({
        data: {
          name: input.name,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  
    getLatest: protectedProcedure.query(({ ctx }) => {
      return ctx.db.project.findFirst({
        orderBy: { createdAt: "desc" },
        where: { user: { id: ctx.session.user.id } },
      });
    }),
});
