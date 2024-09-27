import fs from "fs";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, fundedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateBalance, updateTokenUsage } from "~/actions";
import OpenAI from "openai";
import { availableVoices } from "~/app/tools/voice/_lib";

const inputSchema = z.object({
  text: z.string(),
  voice: z.enum(availableVoices),
  speed: z.number(),
});
export type Input = z.infer<typeof inputSchema>;

const resultSchema = z.object({
  url: z.string(),
});
export type Output = z.infer<typeof resultSchema>;

export const voiceRouter = createTRPCRouter({
  run: fundedProcedure.input(inputSchema).mutation(async ({ input }) => {
    const { text, voice, speed } = input;

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
      model: "tts-1",
      voice: voice,
      input: text,
      speed: speed,
    });

    // await updateTokenUsage(usage, llm);
    // await updateBalance();

    const randomHash = Math.random().toString(36).substring(12);
    const speechDir = path.resolve(`${process.env.DATA_DIR}/voice`);
    const speechFile = path.resolve(`${speechDir}/${randomHash}.mp3`);
    await fs.promises.mkdir(speechDir, { recursive: true });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    const url = `${process.env.DATA_URL}/voice/${randomHash}.mp3`;

    return { url };
  }),
});
