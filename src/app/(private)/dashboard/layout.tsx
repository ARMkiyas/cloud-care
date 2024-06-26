"use client";

import Image from "next/image";
import { Button, AppShell, Burger, Group, Skeleton } from "@mantine/core";
//import { IconLogout } from '@tabler/icons-react';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { NavbarNested } from "../componets/Navbar/NavbarNested";
import myImage from "../componets/Header/assets/logo-inline-qRb.png";
//import {IconBellRinging2Filled} from '@tabler/icons-react';
import classes from "../componets/Header/HeaderSearch.module.css";
import { useDisclosure } from "@mantine/hooks";
/* 

  this layout for the dashboard pages (pages that require authentication) 
  place here the navbar, appshell, footer, etc. that are common to all dashboard pages

*/

export const dynamic = "force-dynamic";

export default function layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  async function signouthandler(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): Promise<void> {
    const signout = await signOut({});
  }

  const { data: session, status } = useSession();

  return (
    <>
      <AppShell
        header={{ height: { base: 60 } }}
        navbar={{
          width: { base: 200, md: 300 },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Image
              src={myImage}
              alt="cloudCare"
              className="w-[180px]  h-12 "
              loading="lazy"
              placeholder="blur"
              blurDataURL=""
            />
          </Group>

          {session ? (
            <Button
              className={classes.button}
              component={Link}
              loaderProps={{ type: "dots" }}
              onClick={signouthandler}
              href={"/"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-logout"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M9 12h12l-3 -3" />
                <path d="M18 15l3 -3" />
              </svg>
            </Button>
          ) : (
            ""
          )}
        </AppShell.Header>
        <AppShell.Navbar>
          <div className="navbar">
            <NavbarNested />
          </div>
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} animate={false} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main
          classNames={{
            main: "h-full w-full",
          }}
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
