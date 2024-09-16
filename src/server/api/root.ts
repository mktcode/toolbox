import { createCallerFactory, createTRPCRouter } from "./trpc";
import { templateRouter } from "./routers/template";
import { topupRouter } from "./routers/topup";
import { feedbackRouter } from "./routers/feedback";
import { tokensRouter } from "./routers/tokens";
import { llmProvidersRouter } from "./routers/llmProviders";
import { nativeSpeakerRouter } from "./routers/nativeSpeaker";
import { shaperRouter } from "./routers/shaper";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  feedback: feedbackRouter,
  llmProviders: llmProvidersRouter,
  nativeSpeaker: nativeSpeakerRouter,
  shaper: shaperRouter,
  template: templateRouter,
  tokens: tokensRouter,
  topup: topupRouter,
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
