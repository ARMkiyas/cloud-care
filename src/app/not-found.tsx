import Link from "next/link";
import { headers } from "next/headers";
import { Button, Container, Group, Title, Text } from "@mantine/core";

import classes from "@/styles/errorPages/NothingFoundBackground.module.css";
import { Illustration } from "@/components/icon/Illustration";
import { Logo } from "@/components/dash_AnaliticalComponets/Logo";

export default async function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />

        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Button size="md" component={Link} href={"/"}>
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
