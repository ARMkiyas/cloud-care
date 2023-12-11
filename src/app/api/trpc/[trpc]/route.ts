/**
 * creating route for trpc (trpc api creating on next api route)
 *
 * this is not need to edit other wise needed, leave it as it's
 */

import { FetchCreateContextFnOptions, fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';
import { NextRequest } from 'next/server';



const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

// Create a handler function that accepts a request
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
        : undefined,
  });

// Expose the handler function for both GET and POST requests
export { handler as GET, handler as POST };