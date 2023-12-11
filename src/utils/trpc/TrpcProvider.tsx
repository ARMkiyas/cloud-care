"use client";

/**
 * This is the provider  for the client side components from server, that provide trpc client access (easy api aceess)
 *
 *  this is not need to edit other wise needed, leave it as it's
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpBatchLink,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { useState } from "react";
import { apiclient } from "@/utils/trpc/Trpc";
import SuperJSON from "superjson";
import { getUrl, transformer } from "./shared";

export const TrpcProvider: React.FC<{
  children: React.ReactNode;
  cookies: string;
}> = (props) => {
  // Create a new QueryClient
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    apiclient.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: getUrl(),
          headers() {
            return {
              cookie: props.cookies,
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    }),
  );
  //   // Create a new trpcClient
  //   const [trpcClient] = useState(() =>
  //     apiclient.createClient({
  //       links: [
  //         httpBatchLink({
  //           url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`,
  //         }),
  //       ],
  //       transformer,
  //     }),
  //   );

  return (
    // Wrap the trpcClient in the apiclient.Provider
    <QueryClientProvider client={queryClient}>
      <apiclient.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </apiclient.Provider>
    </QueryClientProvider>
  );
};
