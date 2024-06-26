"use client";

/**
 * This is the provider  for the client side components from server, that provide trpc client access (easy api aceess)
 *
 *  this is not need to edit other wise needed, leave it as it's
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  TRPCClientError,
  TRPCClientErrorLike,
  httpBatchLink,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { useState } from "react";
import { useApiClient } from "@/utils/trpc/Trpc";
import SuperJSON from "superjson";
import { getUrl, transformer } from "./shared";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { ZodError } from "zod";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const errorHander = (error) => {
  if (error instanceof TRPCClientError) {
    notifications.show({
      title: error.data.code || "Error",
      message: error.message,
      color: "red",
    });
  } else {
    notifications.show({
      title: "Error",
      message: "Something went wrong, please try again or contact support",
      color: "red",
    });
  }
};

export const TrpcProvider: React.FC<{
  children: React.ReactNode;
  cookies: string;
}> = (props) => {
  const { data: session } = useSession();

  // Create a new QueryClient
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            onError: errorHander,
          },
          mutations: {
            onError: errorHander,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    useApiClient.createClient({
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
  //     useApiClient.createClient({
  //       links: [
  //         httpBatchLink({
  //           url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`,
  //         }),
  //       ],
  //       transformer,
  //     }),
  //   );

  return (
    // Wrap the trpcClient in the useApiClient.Provider
    <useApiClient.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </useApiClient.Provider>
  );
};
