"use client";

import Error404 from "@/components/error/Error404";
import { AppShell, Container } from "@mantine/core";

const notFound = () => {
  return (
    <>
      <AppShell.Section className="w-full h-[80vh] grid place-items-center">
        <div className="w-full">
          <Error404 homepagelink="/dashboard" />
        </div>
      </AppShell.Section>
    </>
  );
};

export default notFound;
