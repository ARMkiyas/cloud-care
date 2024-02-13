"use client";
import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Button,
  Paper,
  Text,
  Box,
  Flex,
  Drawer,
  ScrollArea,
  UnstyledButton,
  Collapse,
  Divider,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconChevronDown,
  IconClock,
  IconMapPin,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import classes from "./HeaderMenu.module.css";
import { Logo } from "@/components/dash_AnaliticalComponets/Logo";
import NavTopBar, { StaffLogBtn } from "./NavTopBar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
  { link: "/doctors", label: "Doctors" },
  {
    link: "#1",
    label: "Appointments",
    links: [
      { link: "/appointment/book", label: "Book an Appointment" },
      { link: "/appointment/check", label: "Check your Appointment" },
    ],
  },
  { link: "/contact", label: "contact" },
];

function Header() {
  const router = useRouter();

  const [opened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item, index) => (
      <Link
        href={item.link}
        className="no-underline "
        data-active={active === link.link || undefined}
        onClick={() => {
          setActive(item.link);
        }}
        key={item.link}
      >
        <Box>
          <Menu.Item>
            <div
              className={classes.sublink}
              data-active={active === item.link || undefined}
            >
              {item.label}
            </div>
          </Menu.Item>
        </Box>
      </Link>
    ));

    const collapmenuitems = link.links?.map((item, index) => (
      <Link
        href={item.link}
        className="no-underline "
        data-active={active === link.link || undefined}
        onClick={() => {
          setActive(item.link);
        }}
        key={item.link}
      >
        <div
          className={classes.link}
          data-active={active === item.link || undefined}
        >
          {item.label}
        </div>
      </Link>
    ));

    if (menuItems) {
      return (
        <Box key={link.label}>
          <Box visibleFrom="sm">
            <Menu
              key={link.label}
              trigger="hover"
              transitionProps={{ exitDuration: 0 }}
              withinPortal
            >
              <Menu.Target>
                <Link
                  href={link.link}
                  className={classes.link}
                  data-active={active.includes("appointment") || undefined}
                >
                  <Center>
                    <span className={classes.linkLabel}>{link.label}</span>
                    <IconChevronDown size="0.9rem" stroke={1.5} />
                  </Center>
                </Link>
              </Menu.Target>
              <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
          </Box>
          <Box hiddenFrom="sm">
            <UnstyledButton
              className={classes.link}
              onClick={toggle}
              data-active={active.includes("appointment") || undefined}
            >
              <Center inline>
                <Box component="span" mr={5}>
                  <Center>
                    <span className={classes.linkLabel}>{link.label}</span>
                    <IconChevronDown size="0.9rem" stroke={1.5} />
                  </Center>
                </Box>
              </Center>
            </UnstyledButton>
            <Collapse in={opened}>{collapmenuitems}</Collapse>
          </Box>
        </Box>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link}
        data-active={active === link.link || undefined}
        onClick={() => setActive(link.link)}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Box>
      <header className={classes.header}>
        <Box visibleFrom="sm">
          <NavTopBar />
        </Box>
        <div className={classes.inner}>
          <Link href={"/"}>
            <Logo
              src={""}
              alt={""}
              width={150}
              height={42}
              onClick={() => setActive(links[0].link)}
            />
          </Link>
          <Group gap={5} visibleFrom="sm" className="absolute right-0 h-full">
            {items}
            <Button<typeof Link>
              className="flex items-center justify-center h-full px-5 bg-blue-900"
              rightSection={<IconArrowRight size={20} />}
              size="compact-md"
              variant="filled"
              href={"/appointment/book"}
              onClick={(e) => {
                e.preventDefault();
                router.push("/appointment/book");
                setActive(links[3].links[0]?.link);
              }}
            >
              Book an Appointment
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            size="sm"
            hiddenFrom="sm"
          />
        </div>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
        title={
          <Link href={"/"}>
            <Logo
              src={""}
              alt={""}
              width={150}
              height={42}
              onClick={() => setActive(links[0].link)}
            />
          </Link>
        }
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {items}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <StaffLogBtn />
          </Group>
          <div className="absolute bottom-0 w-full">
            <NavTopBar />
          </div>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
