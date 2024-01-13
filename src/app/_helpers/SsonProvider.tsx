"use client";

import { SessionProvider } from "next-auth/react";

export default function SsonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider refetchInterval={2 * 60} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
}
