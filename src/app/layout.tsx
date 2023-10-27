/**
 *  This root layout of the entire app
 *  do not change this file if you don't know what you are doing
 *
 */

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import AppRootProvider from "./AppRootProvider";
import { TrpcProvider } from "@/utils/TrpcProvider";

// creating metedata
export const metadata = {
  title: "Cloud Care",
  description: "Cloud Care is a platform for managing your health data.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRootProvider>
      <TrpcProvider>
        <html lang="en">
          <body className="">{children}</body>
        </html>
      </TrpcProvider>
    </AppRootProvider>
  );
}
