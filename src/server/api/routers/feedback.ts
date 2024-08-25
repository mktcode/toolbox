import { TRPCError } from "@trpc/server";
import OpenAI from "openai";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
  newPublicFeedback: publicProcedure.query(async ({ ctx }) => {
    const latestSummary = await ctx.db.feedbackSummary.findFirst({
      orderBy: { createdAt: "desc" },
    });

    const newFeedback = await ctx.db.feedback.findMany({
      where: {
        isPublic: true,
        createdAt: { gt: latestSummary?.createdAt },
      },
    });

    return newFeedback;
  }),
  latestSummary: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.feedbackSummary.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
  regenerateSummary: publicProcedure.mutation(async ({ ctx }) => {
    if (!process.env.OPENAI_API_KEY) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "OpenAI API key is not set.",
      });
    }

    const latestSummary = await ctx.db.feedbackSummary.findFirst({
      orderBy: { createdAt: "desc" },
    });

    const newPubicFeedback = await ctx.db.feedback.findMany({
      where: {
        isPublic: true,
        createdAt: { gt: latestSummary?.createdAt },
      },
    });

    if (!newPubicFeedback.length) {
      return latestSummary;
    }

    const publicFeedbackLatest100 = await ctx.db.feedback.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    // TODO: Filter out injections (user input that does not look like product feedback)

    const concatenatedFeedback = publicFeedbackLatest100
      .map((f) => f.body)
      .join("\n");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const feedbackSummaryPrompt = `You are FeedbackSummaryGPT. You are given a list of feedback entries. Your task is to summarize the feedback in a concise manner. Here is the list of feedback entries:\n\n${concatenatedFeedback}\n\nSummary:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: feedbackSummaryPrompt,
        },
      ],
    });

    const summary = completion.choices[0]?.message?.content;

    if (!summary) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "OpenAI API did not return a result.",
      });
    }

    return ctx.db.feedbackSummary.create({
      data: {
        body: summary,
        rating: 0, // TODO: Implement rating system (maybe)
      },
    });
  }),
});
