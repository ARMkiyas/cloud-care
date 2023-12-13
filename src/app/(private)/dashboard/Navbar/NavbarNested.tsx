import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
  IconUser,
  IconStethoscope,
  IconDisabled,
  IconUsers,
  IconGauge,
  IconPresentationAnalytics,
 } from '@tabler/icons-react';
import { UserButton } from './UserButton';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './NavbarNested.module.css';
import { useState, useEffect } from 'react';
import Dashboard from '../page';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Appointments',
    icon: IconStethoscope,
    /*initiallyOpened: false,*/

  },
  {
    label: 'Doctors',
    icon: IconUser,
   /* links: [
      { label: 'Available Doctors', link: '/' },
      { label: 'Doctor Schedule', link: '/' },
    ],*/
  },
  { label: 'Departments', icon: IconPresentationAnalytics },
  { label: 'Patients',
   icon: IconDisabled,
   /*links: [
    { label: 'Appointed Patients', link: '/' },
    { label: 'Emergency Patients', link: '/' },
    { label: 'Clinic Patients', link: '/' },
    { label: 'OPD Patients', link: '/' },
    { label: 'Ward Patients', link: '/' },
  ],*/
   },
  { label: 'Staffs',
   icon: IconUsers, 
  },
];



export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);


  return (
    <nav className={`${classes.navbar} h-full`}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}