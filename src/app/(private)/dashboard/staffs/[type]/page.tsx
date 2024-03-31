"use client";

import dayjs from "dayjs";
import { notFound } from "next/navigation";
import React from "react";
import type {
  TStaffGet,
  TStaffCreate,
  TStaffDelete,
  TStaffUpdate,
  TStaffUpdateInput,
} from "@/server/api/ApiTypeFactory";
import { MantineReactTable } from "mantine-react-table";
import StaffTable from "@/app/(private)/componets/StaffDataTable/StaffTable";
import { stafftypes } from "@/utils/comonDatas";
import { TStaffTypes } from "@/utils/types";
import { Button, Modal, Title } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import AddStaffModal from "@/app/(private)/componets/AddStaffModal";

type staffType = TStaffGet["data"];

type propsType = {
  params: {
    type: TStaffTypes;
  };
};

export default function Page({ params }: propsType) {
  if (!stafftypes.includes(params.type)) {
    notFound();
  }

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <AddStaffModal opened={opened} close={close} />
      <div className="space-y-5">
        <div className="pt-5 ">
          <Title order={1} className="capitalize">
            {params.type.split("-").join(" ")}
          </Title>
        </div>

        <div className="flex justify-end w-full ">
          <Button
            color="teal"
            size="md"
            leftSection={<IconUserPlus size={20} />}
            variant="light"
            onClick={open}
          >
            Create an New Staff
          </Button>
        </div>
        <StaffTable type={params.type} />
      </div>
    </>
  );
}
