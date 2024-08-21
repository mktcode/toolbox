import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const defaults = {
  name: "Untitled Template",
  description: "",
  body: "",
  isPublic: false,
  aiModel: "gpt-4o-mini",
  fields: [],
};

export const templateRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.template.create({
      data: {
        name: defaults.name,
        description: defaults.description,
        body: defaults.body,
        user: { connect: { id: ctx.session.user.id } },
        isPublic: defaults.isPublic,
        aiModel: defaults.aiModel,
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        body: z.string().min(1),
        isPublic: z.boolean(),
        aiModel: z.string().min(1),
        fields: z.array(
          z.object({
            id: z.string().min(1).optional(),
            name: z.string().min(1),
            description: z.string(),
            type: z.enum(["TEXT", "CHOICE"]),
            options: z.array(
              z.object({
                id: z.string().min(1).optional(),
                name: z.string().min(1),
                value: z.string().min(1),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.template.update({
        where: { id: input.id },
        data: {
          name: input.name,
          body: input.body,
          description: input.description,
          isPublic: input.isPublic,
          aiModel: input.aiModel,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.template.delete({
        where: { id: input.id },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.template.findMany({
      where: { user: { id: ctx.session.user.id } },
    });
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.template.findUnique({
        where: { id: input.id },
        include: {
          fields: {
            include: { options: true },
          },
        },
      });
    }),
});
