import { ScrollArea, Skeleton } from "@mantine/core";
import { IconStethoscope, IconDisabled, IconGauge } from "@tabler/icons-react";
import { BiLogInCircle } from "react-icons/bi";
import { GrSchedule } from "react-icons/gr";
import { GrUserManager } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import classes from "./NavbarNested.module.css";
import { useSession } from "next-auth/react";

//import { useState, useEffect } from 'react';

const PageLinks = [
  { label: "Dashboard", icon: IconGauge, rootLink: "/dashboard" },
  {
    label: "Appointments",
    icon: IconStethoscope,
    rootLink: "/dashboard/appointments",

    /*initiallyOpened: false,*/
  },
  {
    label: "Shedule",
    icon: GrSchedule,
    rootLink: "/dashboard/shedule",
  },
  { label: "Patients", icon: IconDisabled, rootLink: "/dashboard/patients" },
  {
    label: "User Management",
    icon: GrUserManager,
    rootLink: "/dashboard/user-management",
  },
  {
    label: "Staffs",
    icon: FaUserDoctor,
    links: [
      { label: "All Staff", link: "/dashboard/staffs/all-staff" },
      { label: "Doctors", link: "/dashboard/staffs/doctors" },
      { label: "Specialists", link: "/dashboard/staffs/specialists" },
      { label: "Nurses", link: "/dashboard/staffs/nurses" },
      {
        label: "Administrators and Managers",
        link: "/dashboard/staffs/administrators-managers",
      },
    ],
  },
  {
    label: "System Logs",
    icon: BiLogInCircle,
    rootLink: "/dashboard/system-logs",
  },
];

export function NavbarNested() {
  const { data, status, update } = useSession();

  const links = PageLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <div>
      <div>
        <nav className={classes.navbar}>
          <ScrollArea className={classes.links}>
            <div className={classes.linksInner}>{links}</div>
          </ScrollArea>
          <div className={classes.footer}>
            <UserButton />
          </div>
        </nav>
      </div>
    </div>
  );
}
