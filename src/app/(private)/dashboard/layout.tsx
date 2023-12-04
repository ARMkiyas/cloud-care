"use client";

import { Button } from "@mantine/core";
import { signIn, signOut } from "next-auth/react";
/* 

  this layout for the dashboard pages (pages that require authentication) 
  place here the navbar, appshell, footer, etc. that are common to all dashboard pages

*/

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Button variant="danger" loaderProps={{ type: "dots" }}>
        logout
      </Button>
      <div>{children}</div>
    </>
  );
}
