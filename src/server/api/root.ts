/**
 * This is the primary router for server.
 *
 * All routers added in /api/routers should be manually added here.
 */

import { exampleRouter } from "./routers/example";
import { createTRPCRouter } from "./trpc";


// This is the primary router for server. All routers added in /api/trpc/[Routers] should be manually added here.
export const appRouter=createTRPCRouter({
    // End point for this is /api/trpc/example
    example:exampleRouter
})




// Export type definition of API
export type AppRouterType=typeof appRouter;