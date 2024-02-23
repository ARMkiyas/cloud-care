/**
 * this file provide a end point for client
 *
 *  this is not need to edit other wise needed, leave it as it's
 */

import { createTRPCReact } from "@trpc/react-query";
import { type AppRouterType } from "@/server/api/root";

// creating api endpoint to client side components that can access trpc api in the in client side
export const useApiClient = createTRPCReact<AppRouterType>();
