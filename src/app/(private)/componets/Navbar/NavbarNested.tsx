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
import permissions from "@/utils/lib/Permissons";

//import { useState, useEffect } from 'react';

const PageLinks = [
  {
    label: "Dashboard",
    icon: IconGauge,
    rootLink: "/dashboard",
    permission: permissions.DASHBOARD_READ,
  },
  {
    label: "Appointments",
    icon: IconStethoscope,
    rootLink: "/dashboard/appointments",
    permission: permissions.APPOINTMENTS_READ,
    /*initiallyOpened: false,*/
  },
  {
    label: "Shedule",
    icon: GrSchedule,
    rootLink: "/dashboard/shedule",
    permission: permissions.SCHEDULES_READ,
  },
  {
    label: "Patients",
    icon: IconDisabled,
    rootLink: "/dashboard/patients",
    permission: permissions.PATIENTS_READ,
  },
  {
    label: "User Management",
    icon: GrUserManager,
    rootLink: "/dashboard/user-management",
    permission: permissions.USERS_READ,
  },
  {
    label: "Staffs",
    icon: FaUserDoctor,
    links: [
      { label: "All Staff", link: "/dashboard/staffs/all-staffs" },
      { label: "Doctors", link: "/dashboard/staffs/doctors" },

      { label: "Nurses", link: "/dashboard/staffs/nurses" },
      {
        label: "Administrators and Managers",
        link: "/dashboard/staffs/admins",
      },
    ],
    permission: permissions.STAFF_READ,
  },
  {
    label: "System Logs",
    icon: BiLogInCircle,
    rootLink: "/dashboard/system-logs",
    permission: permissions.LOGS_READ,
  },
];

export function NavbarNested() {
  const { data, status, update } = useSession();

  const links = PageLinks.map((item) => {
    return (
      <div key={item.label}>
        {status === "loading" ? (
          <div className="flex px-4 py-[10px] space-x-3">
            <Skeleton height={30} width={40} />
            <Skeleton height={30} />
          </div>
        ) : (
          data.user.Permissions.includes(item.permission) && (
            <LinksGroup {...item} />
          )
        )}
      </div>
    );
  });

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
