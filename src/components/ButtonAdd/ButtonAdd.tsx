"use client";
import {
  Button,
  Menu,
  Text,
  rem,
  useMantineTheme,
  Modal,
  Input,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { UserForm } from "../UserForm/UserForm";
import { useApiClient } from "@/utils/trpc/Trpc";

export function ButtonAdd() {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const utils = useApiClient.useUtils();

  return (
    <div className="flex justify-end p-3">
      <Modal
        opened={opened}
        onClose={() => {
          utils.manageUsers.getUsers.invalidate();
          close();
        }}
        title="Add User"
        centered
      >
        <UserForm />
      </Modal>
      <Menu
        transitionProps={{ transition: "pop-top-right" }}
        position="top-end"
        width={220}
        withinPortal
      >
        <Menu.Target>
          <Button
            onClick={open}
            leftSection={
              <IconPlus
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            }
            pr={12}
          >
            Add New User
          </Button>
        </Menu.Target>
      </Menu>
    </div>
  );
}
