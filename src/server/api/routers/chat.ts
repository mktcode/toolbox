import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatMessage, isAIMessage } from "@langchain/core/messages";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const chatRouter = createTRPCRouter({
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
        chatSessionId: z.string(),
        message: z.object({
          content: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chatSession = await ctx.db.chatSession.findUnique({
        where: { id: input.chatSessionId },
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
          message: "Chat session not found",
        });
      }

      await ctx.db.chatMessage.create({
        data: {
          chatSession: {
            connect: {
              id: chatSession.id,
            },
          },
          role: "user",
          content: input.message.content,
        },
      });

      const model = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0,
      });
      const prompt = ChatPromptTemplate.fromMessages([
        [
          "system",
          `You are a helpful assistant who remembers all details the user shares with you.`,
        ],
        ["placeholder", "{chat_history}"],
        ["human", "{input}"],
      ]);

      const chain = prompt.pipe(model);
      const chatHistory = chatSession.chatMessages.map(
        (chatMessage) => new ChatMessage(chatMessage),
      );
      const response = await chain.invoke({
        chat_history: chatHistory,
        input: input.message.content,
      });

      if (!isAIMessage(response) || typeof response.content !== "string") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid response from AI",
        });
      }

      await ctx.db.chatMessage.create({
        data: {
          chatSession: {
            connect: {
              id: chatSession.id,
            },
          },
          role: "assistant",
          content: response.content,
        },
      });

      return response;
    }),
});
