import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generateObject, streamText } from "ai";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type ChatMessageRole, type Prisma } from "@prisma/client";
import { updateBalance } from "~/actions";

export const chatRouter = createTRPCRouter({
  getLastEmtpyOrNewSession: protectedProcedure.query(async ({ ctx }) => {
    const lastEmptySession = await ctx.db.chatSession.findFirst({
      where: {
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
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
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
  getAllForUser: protectedProcedure.query(async ({ ctx }) => {
    const chatSessions = await ctx.db.chatSession.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return chatSessions;
  }),
  createSession: protectedProcedure.mutation(async ({ ctx }) => {
    const chatSession = await ctx.db.chatSession.create({
      data: {
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
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
  respond: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string().optional(),
        message: z.object({
          content: z.string(),
        }),
      }),
    )
    .mutation(async function* ({ ctx, input }) {
      let chatSession: Prisma.ChatSessionGetPayload<{
        include: { chatMessages: true };
      }> | null = null;

      if (ctx.session.user.currentBalance <= 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Insufficient balance.",
        });
      }

      if (input.chatSessionId) {
        chatSession = await ctx.db.chatSession.findUnique({
          where: { id: input.chatSessionId },
          include: {
            chatMessages: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        });
      } else {
        chatSession = await ctx.db.chatSession.create({
          include: { chatMessages: true },
          data: {
            user: { connect: { id: ctx.session.user.id } },
          },
        });
      }

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

      await ctx.db.chatMessage.create({
        data: {
          chatSessionId: chatSession.id,
          role: "user",
          content: input.message.content,
        },
      });

      const result = await streamText({
        model,
        messages: [
          {
            role: "user",
            content: input.message.content,
          },
        ],
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

      if (chatSession.chatMessages.length === 0) {
        const { object, usage } = await generateObject({
          model: openai("gpt-4o-mini"),
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
            {
              role: "user",
              content: input.message.content,
            },
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
