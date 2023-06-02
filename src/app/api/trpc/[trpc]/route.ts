/**
 * creating route for trpc (trpc api creating on next api route)
 *
 * this is not need to edit other wise needed, leave it as it's
 */

import { FetchCreateContextFnOptions, fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: function (opts: FetchCreateContextFnOptions): object | Promise<object> {
        // empty context
        return {}
    }
  });

export { handler as GET, handler as POST };