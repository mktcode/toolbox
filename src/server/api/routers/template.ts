import { TRPCError } from "@trpc/server";
import OpenAI from "openai";
import { z } from "zod";
import { updateBalance } from "~/actions";

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
  llm: "gpt-4o-mini",
  fields: [],
};

export const templateRouter = createTRPCRouter({
  run: protectedProcedure
    .input(
      z.object({
        templateId: z.string().min(1),
        message: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const template = await ctx.db.template.findUnique({
        where: { id: input.templateId },
        include: { llm: true },
      });

      if (!template) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Template not found.",
        });
      }

      if (user.currentBalance <= 0) {
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
        model: template.llm.name,
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
          llm: {
            connect: {
              id: template.llm.id,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
          input: completion.usage.prompt_tokens,
          output: completion.usage.completion_tokens,
        },
      });

      await updateBalance();

      return {
        result,
      };
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const defaultLlm = await ctx.db.llm.findFirst({
      where: { name: defaults.llm },
    });

    if (!defaultLlm) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Default LLM not found.",
      });
    }

    return ctx.db.template.create({
      data: {
        name: defaults.name,
        description: defaults.description,
        body: defaults.body,
        user: { connect: { id: ctx.session.user.id } },
        isPublic: defaults.isPublic,
        llm: {
          connect: {
            id: defaultLlm.id,
          },
        },
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string(),
        body: z.string(),
        isPublic: z.boolean(),
        llmId: z.string().min(1),
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
          llm: { connect: { id: input.llmId } },
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
          llm: true,
          fields: {
            include: { options: true },
          },
        },
      });
    }),
  getOnePublicOrOwned: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const template = await ctx.db.template.findUnique({
        where: {
          id: input.id,
          OR: [{ user: { id: ctx.session?.user?.id } }, { isPublic: true }],
        },
        include: {
          fields: {
            include: { options: true },
          },
        },
      });

      if (!template) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Template not found.",
        });
      }

      return template;
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
