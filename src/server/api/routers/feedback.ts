import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        body: z.string().min(1),
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
});
