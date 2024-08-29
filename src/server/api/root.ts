import { createCallerFactory, createTRPCRouter } from "./trpc";
import { templateRouter } from "./routers/template";
import { balanceRouter } from "./routers/balance";
import { feedbackRouter } from "./routers/feedback";
import { tokensRouter } from "./routers/tokens";
import { llmProvidersRouter } from "./routers/llmProviders";
import { chatRouter } from "./routers/chat";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  template: templateRouter,
  balance: balanceRouter,
  feedback: feedbackRouter,
  tokens: tokensRouter,
  llmProviders: llmProvidersRouter,
  chat: chatRouter,
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
