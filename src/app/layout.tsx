/**
 *  This root layout of the entire app
 *  do not change this file if you don't know what you are doing
 *
 */

import '@mantine/core/styles.layer.css';
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import 'mantine-datatable/styles.layer.css';
import "@/styles/globals.css";

import theme from "@styles/Mglobaltheme";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TrpcProvider } from "@/utils/trpc/TrpcProvider";
import { Notifications } from "@mantine/notifications";
import SsonProvider from "./_helpers/SsonProvider";
import { ModalsProvider } from '@mantine/modals';

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
              <ModalsProvider>     
                 {children}
              </ModalsProvider>
            </MantineProvider>
          </TrpcProvider>
        </SsonProvider>
      </body>
    </html>
  );
}
