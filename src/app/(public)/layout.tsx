/* 

  this layout for the public pages (pages that don't require authentication) like home, about,contact, etc. 
  place here the navbar, footer, etc. that are common to all public pages

*/

import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <ul className="flex space-x-3">
          <div className="">
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/about">About</Link>
          </div>
          <div>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <Link href="/login">Login</Link>
          </div>
        </ul>
      </nav>
      <div className="">{children}</div>

      <footer className="absolute bottom-0 w-full bg-slate-500">
        <div>footer</div>
      </footer>
    </>
  );
}
