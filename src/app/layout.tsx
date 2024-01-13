/**
 *  This root layout of the entire app
 *  do not change this file if you don't know what you are doing
 *
 */

import "@mantine/core/styles.css";

import "@/styles/globals.css";

import "@mantine/notifications/styles.css";
import theme from "@styles/Mglobaltheme";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TrpcProvider } from "@/utils/trpc/TrpcProvider";
import { Notifications } from "@mantine/notifications";
import SsonProvider from "./_helpers/SsonProvider";

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
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="">
        <SsonProvider>
          <TrpcProvider cookies={cookies().toString()}>
            <MantineProvider theme={theme}>
              <Notifications />
              {children}
            </MantineProvider>
          </TrpcProvider>
        </SsonProvider>
      </body>
    </html>
  );
}
