import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useSession } from "next-auth/react";
import Link from 'next/link';

export function UserButton() {

  const { data: session, status } = useSession();
  console.log(session);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be logged in to view this page</div>;
  }


  return (

    <UnstyledButton<typeof Link> href='/dashboard/user-Profile' className={`${classes.user} w-full` } component={Link}>
      <Group>
        <Avatar
           src={session?.user?.image || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
          {session?.user?.name || "Guest"}
          </Text>

          <Text c="dimmed" size="xs">
          {session?.user?.email || "guest@example.com"}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>

  );
}