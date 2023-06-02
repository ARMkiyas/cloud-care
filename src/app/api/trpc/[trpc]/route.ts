/**
 * creating route for trpc (trpc api creating on next api route)
 *
 * this is not need to edit other wise needed, leave it as it's
 */

import { FetchCreateContextFnOptions, fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';

// Create a handler function that accepts a request
const handler = (req: Request) =>
  fetchRequestHandler({
    // The endpoint that the handler will respond to
    endpoint: '/api/trpc',
    // Pass the request object to the handler
    req,
    // Pass the router to the handler that we created earlier
    router: appRouter,
    // Create a context object for the handler
    createContext: function (opts: FetchCreateContextFnOptions): object | Promise<object> {
        // empty context
        return {}
    }
  });

// Expose the handler function for both GET and POST requests
export { handler as GET, handler as POST };