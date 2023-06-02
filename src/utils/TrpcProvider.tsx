"use client"

/**
 * This is the provider  for the client side components from server, that provide trpc client access (easy api aceess)
 *
 *  this is not need to edit other wise needed, leave it as it's
 */

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {httpBatchLink} from "@trpc/client"
import {useState} from "react"
import {apiclient} from "@/utils/Trpc"

export const TrpcProvider: React.FC<{children: React.ReactNode}> = p => {
    // Create a new QueryClient
    const [queryClient] = useState(() => new QueryClient())
  

    // Create a new trpcClient
    const [trpcClient] = useState(() =>
        apiclient.createClient({
            links: [
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`
                })
            ],
        })
    )


    return (
        // Wrap the trpcClient in the apiclient.Provider
        <apiclient.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {p.children}
             </QueryClientProvider>
        </apiclient.Provider>
    )
}