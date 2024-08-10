import { createCallerFactory, createTRPCRouter } from "./trpc";
import { projectRouter } from "./routers/project";
import { templateRouter } from "./routers/template";
import { openaiRouter } from "./routers/openai";
import { topUpRouter } from "./routers/topUp";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  template: templateRouter,
  openai: openaiRouter,
  topUp: topUpRouter,
  user: userRouter,
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
