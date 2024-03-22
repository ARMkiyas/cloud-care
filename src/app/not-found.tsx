import { Container } from "@mantine/core";
import classes from "@/styles/errorPages/NothingFoundBackground.module.css";
import Error404 from "@/components/error/Error404";

export default async function NotFound() {
  return (
    <Container className={classes.root}>
      <Error404 homepagelink="/" />
    </Container>
  );
}
