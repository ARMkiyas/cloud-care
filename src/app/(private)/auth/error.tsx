"use client";

import { Container, Title, Text, Group, Button } from "@mantine/core";
import classes from "@/styles/errorPages/ServerError.module.css";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className={classes.root}>
      <Container className="flex flex-col items-center justify-center w-full min-h-[80vh]">
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Our servers could not handle your request. Don&apos;t worry, our
          development team was already notified. Try refreshing the page.
        </Text>
        <Group justify="center">
          <Button
            variant="white"
            size="md"
            onClick={() => {
              reset();
            }}
          >
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default error;
