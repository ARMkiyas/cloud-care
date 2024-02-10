"use client";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import classes from "./HeaderMenu.module.css";
import {
  IconClock,
  IconMapPin,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const StaffLogBtn = () => {
  // Fixed component name
  const router = useRouter();
  return (
    <Button
      variant="light"
      color="teal"
      radius={"xl"}
      leftSection={<IconUser />}
      size="compact-md"
      className="hover:bg-teal-500 hover:text-white"
      onClick={(e) => {
        e.preventDefault();
        router.push("/auth/login");
      }}
    >
      Staff Login
    </Button>
  );
};

const NavTopBar = () => {
  return (
    <Paper className={classes.topBar}>
      <Flex align="center" gap="xl">
        <Flex align={"inherit"} gap="7px">
          <IconMapPin size="0.9rem" color="#0463FA" />
          <Text c="dimmed" className="flex items-center" size="sm">
            123 Street, abc, Sri Lanka
          </Text>
        </Flex>
        <Flex align={"inherit"} gap="7px">
          <IconPhone size="0.9rem" color="#0463FA" />
          <Text c="dimmed" className="flex items-center" size="sm">
            +9412 345 6789
          </Text>
        </Flex>
        <Flex align={"inherit"} gap="7px">
          <IconClock size="0.9rem" color="#0463FA" />
          <Text c="dimmed" className="flex items-center" size="sm">
            Mon - Fri : 09.00 AM - 04.00 PM
          </Text>
        </Flex>
      </Flex>
      <Box visibleFrom="sm">
        <StaffLogBtn />
      </Box>
    </Paper>
  );
};

export default NavTopBar;
