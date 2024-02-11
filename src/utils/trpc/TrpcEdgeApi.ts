import "server-only";

import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { transformer } from "./shared";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { AppRouterType } from "@/server/api/root";



export const proxyClientedge = createTRPCProxyClient<AppRouterType>({
    transformer,
    links: [

        loggerLink({
            enabled: (op) =>
                process.env.NODE_ENV === "development" ||
                (op.direction === "down" && op.result instanceof Error),
        }),


        httpBatchLink({
            url: 'http://localhost:3000/api/trpc',
        }),

    ],
});

export const apiedge = createServerSideHelpers({
    client: proxyClientedge,
});