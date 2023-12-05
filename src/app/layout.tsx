/**
 *  This root layout of the entire app
 *  do not change this file if you don't know what you are doing
 *
 */
import "@/styles/globals.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import theme from "@styles/Mglobaltheme";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Inter } from "next/font/google";

import { TrpcProvider } from "@/utils/TrpcProvider";
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
    <TrpcProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body className="">
          <SsonProvider>
            <MantineProvider theme={theme}>
              <Notifications />
              {children}
            </MantineProvider>
          </SsonProvider>
        </body>
      </html>
    </TrpcProvider>
  );
}
