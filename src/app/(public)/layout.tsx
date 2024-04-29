/* 

  this layout for the public pages (pages that don't require authentication) like home, about,contact, etc. 
  place here the navbar, footer, etc. that are common to all public pages

*/

import Link from "next/link";
import React from "react";
import Header from "./components/navbar/Header";
import Footer from "./components/footer/Footer";

export const dynamic = "force-dynamic";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
