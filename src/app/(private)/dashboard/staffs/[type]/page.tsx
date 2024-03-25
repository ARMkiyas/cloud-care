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

  return (
    <>
      <StaffTable type={params.type} />
    </>
  );
}
