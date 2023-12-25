

import { appRouter } from "@/server/api/root";
import { TRPCError } from '@trpc/server';
import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from 'next/server';
import { fetchHandler } from 'trpc-playground/handlers/fetch';

const PLAYGROUND_ENABLED =
    process.env.ENABLE_TRPC_PLAYGROUND?.toLowerCase() === 'true';




const handlerPromise = fetchHandler({
    router: appRouter,
    trpcApiEndpoint: "/api/trpc",
    playgroundEndpoint: "/api/trpc-playground",
    request: {
        superjson: true,

    }
});




const fn = async (req: NextRequest): Promise<Response> => {
    if (!PLAYGROUND_ENABLED) {
        return new NextResponse("Not Found", { status: 404 })

    }

    const handler = await handlerPromise;
    return handler(req);
};

export { fn as GET, fn as POST };
