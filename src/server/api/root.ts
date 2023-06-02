/**
 * This is the primary router for server.
 *
 * All routers added in /api/routers should be manually added here.
 */

import { exampleRouter } from "./routers/example";
import { createTRPCRouter } from "./trpc";


export const appRouter=createTRPCRouter({
    example:exampleRouter
})




// export type definition of API
export type AppRouterType=typeof appRouter;