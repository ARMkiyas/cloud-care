import Link from "next/link";
import { Button, Group, Title, Text } from "@mantine/core";

import classes from "@/styles/errorPages/NothingFoundBackground.module.css";
import { Illustration } from "@/components/icon/Illustration";

export default function Error404({ homepagelink }: { homepagelink: string }) {
  return (
    <div className={classes.inner}>
      <Illustration className={classes.image} />

      <div className={classes.content}>
        <Title className={classes.title}>Nothing to see here</Title>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Group justify="center">
          <Button size="md" component={Link} href={homepagelink}>
            Take me back to home page
          </Button>
        </Group>
      </div>
    </div>
  );
}
