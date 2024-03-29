"use client";
import React from "react";

import { useApiClient } from "@/utils/trpc/Trpc";
import TableSort from "@/components/TableSort/TableSort";

export default function page() {
  return (
    <div>
      <TableSort />
    </div>
  );
}
