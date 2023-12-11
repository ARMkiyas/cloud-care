import React from "react";
import { Loader } from "@mantine/core";
import PageLoader from "@/components/PageLoader";
//server side rendering or server side component data fetch loading comp
export default function loading() {
  return <PageLoader />;
}
