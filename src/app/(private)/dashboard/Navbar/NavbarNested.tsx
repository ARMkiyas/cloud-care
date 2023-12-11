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

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Appointments',
    icon: IconStethoscope,
    /*initiallyOpened: false,*/
    links: [
      { label: 'Appointment Details', link: '/' },
      { label: 'Special Appointment', link: '/' },
      { label: '', link: '/' },
      ],
  },
  {
    label: 'Doctors',
    icon: IconUser,
    links: [
      { label: 'Available Doctors', link: '/' },
      { label: 'Doctor Schedule', link: '/' },
    ],
  },
  { label: 'Departments', icon: IconPresentationAnalytics },
  { label: 'Patients',
   icon: IconDisabled,
   links: [
    { label: 'Appointed Patients', link: '/' },
    { label: 'Emergency Patients', link: '/' },
    { label: 'Clinic Patients', link: '/' },
    { label: 'OPD Patients', link: '/' },
    { label: 'Ward Patients', link: '/' },
  ],
   },
  { label: 'Staffs',
   icon: IconUsers, 
   links: [
    { label: 'Doctors', link: '/' },
    { label: 'Nurses', link: '/' },
    { label: 'Clinic staffs', link: '/' },
    { label: 'Other Hospital Staffs', link: '/' },
    { label: 'Pharmacist', link: '/' },
    { label: 'Surgens', link: '/' },
  ],},
  {
    label: 'Clinic',
    icon: IconDisabled,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];



export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}