"use client";

import Image from "next/image";
import { Button ,AppShell, Burger, Group, Skeleton} from "@mantine/core";
import { IconLogout } from '@tabler/icons-react';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {NavbarNested} from './Navbar/NavbarNested';
import myImage from "./Header/assets/logo-inline-qRb.png";
import {IconBellRinging2Filled} from '@tabler/icons-react';
import classes from './Header/HeaderSearch.module.css';
import { useDisclosure } from '@mantine/hooks';
/* 

  this layout for the dashboard pages (pages that require authentication) 
  place here the navbar, appshell, footer, etc. that are common to all dashboard pages

*/

export default function layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
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
    <AppShell
      header={{ height: { base: 60} }}
      navbar={{
        width: { base: 200, md: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src={myImage} alt="cloudCare" className='w-[180px]  h-12 '/>
          
        </Group>
        {session ? (
           <Button className={classes.button}
            component={Link}
            loaderProps={{ type: "dots" }}
            onClick={signouthandler}
            href={"/"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" 
            width="22" height="22" viewBox="0 0 22 22" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
          </Button>
              ) : (
        ""
      )}

      </AppShell.Header>
      <AppShell.Navbar>
      <div className="navbar">
        <NavbarNested/></div>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
    {/*<div >
        <header className={classes.header}>
          <div className={classes.inner}>
            <Group>
              <Image src={myImage} alt="cloudCare" className='w-[180px]  h-11 mx-2 my-3'/>
           </Group>
          </div>    
        {session ? (
           <Button className={classes.button}
            component={Link}
            loaderProps={{ type: "dots" }}
            onClick={signouthandler}
            href={"/"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" 
            width="22" height="22" viewBox="0 0 22 22" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
          </Button>
              ) : (
        ""
      )} </header> 
      <div className="flex">
      <div className="navbar"><NavbarNested/></div>
      <div className="p-6 flex-1 overflow-x-auto">{children}</div>
      </div>
              </div>*/}
      
    </>
  );
}
