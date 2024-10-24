import { createCallerFactory, createTRPCRouter } from "./trpc";
import { topupRouter } from "./routers/topup";
import { feedbackRouter } from "./routers/feedback";
import { tokensRouter } from "./routers/tokens";
import { llmProvidersRouter } from "./routers/llmProviders";
import { nativeSpeakerRouter } from "./routers/nativeSpeaker";
import { shaperRouter } from "./routers/shaper";
import { dontForgetRouter } from "./routers/dontForget";
import { voiceRouter } from "./routers/voice";
import { refineInputRouter } from "./routers/refineInput";
import { proofreaderRouter } from "./routers/proofreader";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  dontForget: dontForgetRouter,
  feedback: feedbackRouter,
  llmProviders: llmProvidersRouter,
  nativeSpeaker: nativeSpeakerRouter,
  shaper: shaperRouter,
  tokens: tokensRouter,
  topup: topupRouter,
  voice: voiceRouter,
  refineInput: refineInputRouter,
  proofreader: proofreaderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
