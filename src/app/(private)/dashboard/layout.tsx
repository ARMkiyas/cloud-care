"use client";

import { Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
/* 

  this layout for the dashboard pages (pages that require authentication) 
  place here the navbar, appshell, footer, etc. that are common to all dashboard pages

*/

export default function layout({ children }: { children: React.ReactNode }) {
  async function signouthandler(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): Promise<void> {
    const signout = await signOut({
      redirect: false,
    });
  }

  const { data: session, status } = useSession();
  console.log(session);

  return (
    <>
      {session ? (
        <Button
          component={Link}
          variant="danger"
          loaderProps={{ type: "dots" }}
          onClick={signouthandler}
          href={"/"}
        >
          logout
        </Button>
      ) : (
        ""
      )}
      <div>{children}</div>
    </>
  );
}
