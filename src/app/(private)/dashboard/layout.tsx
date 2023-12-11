"use client";

import Image from "next/image";
import { Button ,Group } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {NavbarNested} from './Navbar/NavbarNested';
import myImage from "./Header/assets/logo-inline-qRb.png";
import {IconBellRinging2Filled} from '@tabler/icons-react';
import classes from './Header/HeaderSearch.module.css';
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
      <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image src={myImage} alt="cloudCare" className='w-[180px]  h-9 mx-2 mt-3'/>
        </Group>
      </div>    
      {session ? (
        <Button className={classes.button}
          component={Link}
          loaderProps={{ type: "dots" }}
          onClick={signouthandler}
          href={"/"}
        >
          
          logout
        </Button>
              ) : (
        ""
      )} </header> 
      <div className="navBar">
      <NavbarNested/>
      </div>
      <div>{children}</div>
      
    </>
  );
}
