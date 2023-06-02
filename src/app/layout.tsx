/**
 *  This root layout of the entire app
 * 
 */

import "./globals.css";
import { Inter } from "next/font/google";
import { TrpcProvider } from "@/utils/TrpcProvider";


//font declaration
const inter = Inter({ subsets: ["latin"] });


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
        <body className={inter.className}>{children}</body>
      </html>
    </TrpcProvider>
  );
}
