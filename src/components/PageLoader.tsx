import { Loader } from "@mantine/core";
import React from "react";

export default function PageLoader() {
  return (
    <div className="absolute p-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
      <Loader />
    </div>
  );
}
