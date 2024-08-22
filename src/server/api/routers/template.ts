import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
  getAllForUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.template.findMany({
      where: { user: { id: ctx.session.user.id } },
    });
  }),
  getAllPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.template.findMany({
      where: { isPublic: true },
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
  getOnePublic: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.template.findUnique({
        where: { id: input.id, isPublic: true },
        include: {
          fields: {
            include: { options: true },
          },
        },
      });
    }),

  // Fields
  createField: protectedProcedure
    .input(
      z.object({
        templateId: z.string().min(1),
        name: z.string().min(1),
        description: z.string(),
        options: z
          .array(
            z.object({
              value: z.string().min(1),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.templateField.create({
        data: {
          name: input.name,
          description: input.description,
          template: { connect: { id: input.templateId } },
          options: input.options
            ? {
                create: input.options.map((option) => ({
                  value: option.value,
                  field: { connect: { id: input.templateId } },
                })),
              }
            : undefined,
        },
      });
    }),
  updateField: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string(),
        defaultValue: z.string(),
        options: z.array(
          z.object({
            id: z.string().min(1).optional(),
            value: z.string().min(1),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.templateField.update({
        where: {
          id: input.id,
          template: { user: { id: ctx.session.user.id } },
        },
        data: {
          name: input.name,
          description: input.description,
          defaultValue: input.defaultValue,
          options: {
            upsert: input.options.map((option) => ({
              where: { id: option.id },
              update: { value: option.value },
              create: { value: option.value },
            })),
          },
        },
      });
    }),
  getAllFields: protectedProcedure
    .input(z.object({ templateId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.templateField.findMany({
        where: { templateId: input.templateId },
      });
    }),
  deleteField: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.templateField.delete({
        where: {
          id: input.id,
          template: { user: { id: ctx.session.user.id } },
        },
      });
    }),

  // Field Options
  createFieldOption: protectedProcedure
    .input(
      z.object({
        fieldId: z.string().min(1),
        value: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.templateFieldOption.create({
        data: {
          value: input.value,
          field: { connect: { id: input.fieldId } },
        },
      });
    }),
  updateFieldOption: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        value: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.templateFieldOption.update({
        where: {
          id: input.id,
          field: { template: { user: { id: ctx.session.user.id } } },
        },
        data: { value: input.value },
      });
    }),
  deleteFieldOption: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.templateFieldOption.delete({
        where: {
          id: input.id,
          field: { template: { user: { id: ctx.session.user.id } } },
        },
      });
    }),
  getAllFieldOptions: protectedProcedure
    .input(z.object({ fieldId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.templateFieldOption.findMany({
        where: { fieldId: input.fieldId },
      });
    }),
});
