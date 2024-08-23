import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        isPublic: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedback.create({
        data: {
          body: input.body,
          isPublic: input.isPublic,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        body: z.string(),
        isPublic: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedback.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          body: input.body,
          isPublic: input.isPublic,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedback.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.feedback.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
