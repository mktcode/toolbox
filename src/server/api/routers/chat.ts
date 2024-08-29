import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateObject, streamText } from "ai";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type ChatMessageRole } from "@prisma/client";
import { updateBalance } from "~/actions";

export const chatRouter = createTRPCRouter({
  getLastEmtpyOrNewSession: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const lastEmptySession = await ctx.db.chatSession.findFirst({
        where: {
          templateId: input.templateId,
          userId: ctx.session.user.id,
          chatMessages: {
            none: {},
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (lastEmptySession) {
        return lastEmptySession;
      }

      const newSession = await ctx.db.chatSession.create({
        data: {
          template: { connect: { id: input.templateId } },
          user: { connect: { id: ctx.session.user.id } },
        },
      });

      return newSession;
    }),
  getOneForUser: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const chatSession = await ctx.db.chatSession.findFirst({
        where: {
          id: input.chatSessionId,
          userId: ctx.session.user.id,
        },
        include: {
          chatMessages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      return chatSession;
    }),
  getAllForUserAndTemplate: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
      }),
    )
    .query(async ({ ctx }) => {
      const chatSessions = await ctx.db.chatSession.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      return chatSessions;
    }),
  createSession: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const chatSession = await ctx.db.chatSession.create({
        data: {
          template: { connect: { id: input.templateId } },
          user: { connect: { id: ctx.session.user.id } },
        },
      });

      return chatSession;
    }),
  getHistory: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const chatMessages = await ctx.db.chatMessage.findMany({
        where: { chatSessionId: input.chatSessionId },
        orderBy: {
          createdAt: "asc",
        },
      });

      return chatMessages;
    }),
  addMessage: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string(),
        role: z.enum(["user", "assistant", "system", "tool"]),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chatSession = await ctx.db.chatSession.findFirst({
        where: {
          id: input.chatSessionId,
          userId: ctx.session.user.id,
        },
      });

      if (!chatSession) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat session not found or owned",
        });
      }

      const addedMessage = await ctx.db.chatMessage.create({
        data: {
          chatSessionId: input.chatSessionId,
          role: input.role,
          content: input.content,
        },
      });

      return addedMessage;
    }),
  updateMessageContent: protectedProcedure
    .input(
      z.object({
        chatMessageId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chatMessage = await ctx.db.chatMessage.findFirst({
        where: {
          id: input.chatMessageId,
          chatSession: {
            userId: ctx.session.user.id,
          },
        },
      });

      if (!chatMessage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat message not found or owned",
        });
      }

      await ctx.db.chatMessage.update({
        where: { id: input.chatMessageId },
        data: { content: input.content },
      });

      return true;
    }),
  deleteMessage: protectedProcedure
    .input(
      z.object({
        chatMessageId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.chatMessage.delete({
        where: {
          id: input.chatMessageId,
          chatSession: {
            userId: ctx.session.user.id,
          },
        },
      });
    }),
  respond: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string(),
        message: z
          .object({
            role: z.enum(["user", "assistant", "system", "tool"]),
            content: z.string(),
          })
          .optional(),
      }),
    )
    .mutation(async function* ({ ctx, input }) {
      if (ctx.session.user.currentBalance <= 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Insufficient balance.",
        });
      }

      const chatSession = await ctx.db.chatSession.findUnique({
        where: { id: input.chatSessionId, userId: ctx.session.user.id },
        include: {
          chatMessages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      if (!chatSession) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat session not found or created",
        });
      }

      const llm = await ctx.db.llm.findFirst({
        where: { name: "gpt-4o-mini" },
      });

      if (!llm) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LLM not found",
        });
      }

      const model = openai(llm.name);
      const titleGenerationModel = openai("gpt-4o-mini");
      const messages = chatSession.chatMessages as CoreMessage[];
      const generateTitle =
        messages.length > 1 && chatSession.title === "New Chat";

      if (input.message) {
        await ctx.db.chatMessage.create({
          data: {
            chatSessionId: chatSession.id,
            ...input.message,
          },
        });

        messages.push(input.message as CoreMessage);
      }

      const result = await streamText({
        model,
        messages,
        onFinish: async (event) => {
          await ctx.db.tokenUsage.create({
            data: {
              input: event.usage.promptTokens,
              inputCost:
                event.usage.promptTokens * llm.priceIn * (1 + llm.margin / 100),
              output: event.usage.completionTokens,
              outputCost:
                event.usage.completionTokens *
                llm.priceOut *
                (1 + llm.margin / 100),
              llm: { connect: { id: llm.id } },
              user: { connect: { id: ctx.session.user.id } },
            },
          });
        },
      });

      const newAssistantMessage: { role: ChatMessageRole; content: string } = {
        role: "assistant",
        content: "",
      };

      for await (const token of result.textStream) {
        newAssistantMessage.content += token;
        yield token;
      }

      await ctx.db.chatMessage.create({
        data: {
          chatSessionId: chatSession.id,
          ...newAssistantMessage,
        },
      });

      if (generateTitle) {
        const { object, usage } = await generateObject({
          model: titleGenerationModel,
          system:
            "Given the following chat session, generate a chat session title (~20-80 characters)",
          schema: z.object({
            title: z
              .string()
              .min(10)
              .max(100)
              .describe("The title of chat session"),
          }),
          messages: [
            ...messages,
            {
              role: "assistant",
              content: newAssistantMessage.content,
            },
          ],
        });

        await ctx.db.tokenUsage.create({
          data: {
            input: usage.promptTokens,
            inputCost:
              usage.promptTokens * llm.priceIn * (1 + llm.margin / 100),
            output: usage.completionTokens,
            outputCost:
              usage.completionTokens * llm.priceOut * (1 + llm.margin / 100),
            llm: { connect: { id: llm.id } },
            user: { connect: { id: ctx.session.user.id } },
          },
        });

        await ctx.db.chatSession.update({
          where: { id: chatSession.id },
          data: {
            title: object.title,
          },
        });
      }

      await updateBalance();
    }),
  deleteOwnedSession: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.chatSession.delete({
        where: {
          id: input.chatSessionId,
          userId: ctx.session.user.id,
        },
      });

      return true;
    }),
});
