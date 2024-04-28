"use client";
import React from "react";

import { useApiClient } from "@/utils/trpc/Trpc";
import TableSort from "@/components/TableSort/TableSort";
import { useSession } from "next-auth/react";
import { Title } from "@mantine/core";

export default function page() {
  const { data: sessiondata } = useSession();

  return (
    <div>
      <div className="pt-5 ">
        <Title order={1} className="capitalize">
          User Management
        </Title>
      </div>
      {sessiondata?.user?.Permissions.includes("USERS_READ") && <TableSort />}
    </div>
  );
}
