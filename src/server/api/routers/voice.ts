import fs from "fs";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance, updateTokenUsage } from "~/actions";
import OpenAI from "openai";
import { availableTTSModels, availableVoices } from "~/app/tools/voice/_lib";
import { type CompletionTokenUsage } from "ai";
import { randomUUID } from "crypto";

const inputSchema = z.object({
  text: z.string(),
  voice: z.enum(availableVoices),
  speed: z.number(),
  model: z.enum(availableTTSModels),
});
export type Input = z.infer<typeof inputSchema>;

const resultSchema = z.object({
  url: z.string(),
});
export type Output = z.infer<typeof resultSchema>;

export const voiceRouter = createTRPCRouter({
  run: fundedProcedure.input(inputSchema).mutation(async ({ input, ctx }) => {
    const { text, voice, speed, model } = input;

    const ttsModel = await ctx.db.llm.findFirst({
      where: { name: model },
    });

    if (!ttsModel) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "TTS Model not found",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Missing OPENAI_API_KEY",
      });
    }

    if (!process.env.DATA_DIR) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Missing DATA_DIR",
      });
    }

    if (!process.env.DATA_URL) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Missing DATA_URL",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const mp3 = await openai.audio.speech.create({
      model: ttsModel.name,
      voice: voice,
      input: text,
      speed: speed,
    });

    const promptTokens = text.length / 4;
    const usage: CompletionTokenUsage = {
      promptTokens,
      completionTokens: 0,
      totalTokens: promptTokens,
    };

    await updateTokenUsage(usage, ttsModel);
    await updateBalance();

    // uuid
    const uuid = randomUUID();
    const speechDir = path.resolve(`${process.env.DATA_DIR}/voice`);
    const speechFile = path.resolve(`${speechDir}/${uuid}.mp3`);
    await fs.promises.mkdir(speechDir, { recursive: true });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    const url = `${process.env.DATA_URL}/voice/${uuid}.mp3`;

    return { url };
  }),
});
