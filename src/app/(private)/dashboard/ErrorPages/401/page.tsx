import { Button, Container, Group, Title, Text } from "@mantine/core";
import React from "react";
import unauthSvg from "./unauth.svg";
import classes from "./Unauth.module.css";
import WarnSign from "@/components/icon/WarnSign";
import Link from "next/link";

export default function page() {
  return (
    <Container className={classes.root}>
      <div className="text-center">
        <WarnSign />
      </div>

      <Title className={classes.title}> Hold Up! Unauthorized Access !</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, you do not have permission to access this page. Please
        contact your administrator for more information.
      </Text>
      <Group justify="center">
        <Button
          variant="light"
          color="red"
          size="md"
          component={Link}
          href={"/dashboard"}
        >
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
