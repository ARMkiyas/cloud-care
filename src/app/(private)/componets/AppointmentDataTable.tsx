"use client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  TextInput,
} from "@mantine/core";
import {
  IconClick,
  IconEdit,
  IconMessage,
  IconSearch,
  IconTrash,
  IconTrashX,
  IconX,
} from "@tabler/icons-react";
// import { useContextMenu } from "mantine-contextmenu";
import dayjs from "dayjs";
import {
  DataTable,
  DataTableColumn,
  DataTableProps,
  DataTableSortStatus,
} from "mantine-datatable";
import React, { useState } from "react";
import { useApiClient } from "@/utils/trpc/Trpc";
import type { TAppointmentsGet } from "@/server/api/ApiTypeFactory";

const PAGE_SIZE = 10;

export type AppointmentDataType = TAppointmentsGet["data"][0];

type data = {
  id: string;
  referenceid: string;
  appointmentNumber: number;
  appointmentDate: string;
  appointmentstart: string;
  appointmentEnd: string;
  createdat: string;
  updatedat: string;
  patientNote: any;
  status: string;
  patientId: string;
  doctorId: string;
  nurseId: any;
  oPDId: any;
  scheduleId: string;
  slotId: string;
  Slot: {
    id: string;
    ScheduleId: string;
    maxAppointmentsPerSlot: number;
    startTime: string;
    endTime: string;
  };
  patient: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    NIC: string;
    Passport: any;
  };
  doctor: {
    staff: {
      title: string;
      firstName: string;
      lastName: string;
      image: string;
    };
  };
};

const sampleData = [
  {
    id: "clt9678qh000eyoo0t3301033",
    referenceid: "cloudcare-lt9678qf-xijx",
    appointmentNumber: 3,
    appointmentDate: "Tue Mar 03 2026 05:30:00 GMT+0530",
    appointmentstart: "Thu Jan 01 1970 07:36:00 GMT+0530",
    appointmentEnd: "Thu Jan 01 1970 07:39:00 GMT+0530",
    createdat: "Sat Mar 02 2024 03:02:24 GMT+0530",
    updatedat: "Sat Mar 02 2024 03:02:24 GMT+0530",
    patientNote: null,
    status: "Pending",
    patientId: "clskyf1a6001ct56gofoibcda",
    doctorId: "cls3ikk9r0007fbmgy9i70xgw",
    nurseId: null,
    oPDId: null,
    scheduleId: "clt66udb00000rf5bgdrz67bv",
    slotId: "clt66udb10003rf5brtloj14e",
    Slot: {
      id: "clt66udb10003rf5brtloj14e",
      ScheduleId: "clt66udb00000rf5bgdrz67bv",
      maxAppointmentsPerSlot: 5,
      startTime: "Thu Jan 01 1970 07:30:00 GMT+0530",
      endTime: "Thu Jan 01 1970 07:45:00 GMT+0530",
    },
    patient: {
      id: "clskyf1a6001ct56gofoibcda",
      title: "Mr",
      firstName: "Mohammed",
      lastName: "farnas",
      dateOfBirth: "Fri Feb 14 1992 05:30:00 GMT+0530",
      gender: "male",
      email: "armkiyas99@gmail.com",
      phone: "76721151233",
      address: "21,hostpital road",
      NIC: "866487543v",
      Passport: null,
    },
    doctor: {
      staff: {
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        image: "/img/avatar/person-male.png",
      },
    },
  },
  {
    id: "clt8xe6jy0007n8cl28x36ezc",
    referenceid: "cloudcare-lt8xe6jx-fuh0",
    appointmentNumber: 1,
    appointmentDate: "Sat Mar 03 2018 05:30:00 GMT+0530",
    appointmentstart: "Thu Jan 01 1970 07:30:00 GMT+0530",
    appointmentEnd: "Thu Jan 01 1970 07:33:00 GMT+0530",
    createdat: "Fri Mar 01 2024 22:55:52 GMT+0530",
    updatedat: "Fri Mar 01 2024 22:55:52 GMT+0530",
    patientNote: null,
    status: "Pending",
    patientId: "clskyf1a6001ct56gofoibcda",
    doctorId: "cls3ikk9r0007fbmgy9i70xgw",
    nurseId: null,
    oPDId: null,
    scheduleId: "clt66udb00000rf5bgdrz67bv",
    slotId: "clt66udb10003rf5brtloj14e",
    Slot: {
      id: "clt66udb10003rf5brtloj14e",
      ScheduleId: "clt66udb00000rf5bgdrz67bv",
      maxAppointmentsPerSlot: 5,
      startTime: "Thu Jan 01 1970 07:30:00 GMT+0530",
      endTime: "Thu Jan 01 1970 07:45:00 GMT+0530",
    },
    patient: {
      id: "clskyf1a6001ct56gofoibcda",
      title: "Mr",
      firstName: "Mohammed",
      lastName: "farnas",
      dateOfBirth: "Fri Feb 14 1992 05:30:00 GMT+0530",
      gender: "male",
      email: "armkiyas99@gmail.com",
      phone: "76721151233",
      address: "21,hostpital road",
      NIC: "866487543v",
      Passport: null,
    },
    doctor: {
      staff: {
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        image: "/img/avatar/person-male.png",
      },
    },
  },
  {
    id: "clt8v6y0m0010z5onoeptdgih",
    referenceid: "cloudcare-lt8v6y0k-x85v",
    appointmentNumber: 1,
    appointmentDate: "Sat Mar 03 2018 05:30:00 GMT+0530",
    appointmentstart: "Thu Jan 01 1970 07:00:00 GMT+0530",
    appointmentEnd: "Thu Jan 01 1970 07:03:00 GMT+0530",
    createdat: "Fri Mar 01 2024 21:54:15 GMT+0530",
    updatedat: "Fri Mar 01 2024 21:54:15 GMT+0530",
    patientNote: null,
    status: "Pending",
    patientId: "clskyf1a6001ct56gofoibcda",
    doctorId: "cls3ikk9r0007fbmgy9i70xgw",
    nurseId: null,
    oPDId: null,
    scheduleId: "clt66udb00000rf5bgdrz67bv",
    slotId: "clt66udb10001rf5bgxceyz92",
    Slot: {
      id: "clt66udb10001rf5bgxceyz92",
      ScheduleId: "clt66udb00000rf5bgdrz67bv",
      maxAppointmentsPerSlot: 5,
      startTime: "Thu Jan 01 1970 07:00:00 GMT+0530",
      endTime: "Thu Jan 01 1970 07:15:00 GMT+0530 ",
    },
    patient: {
      id: "clskyf1a6001ct56gofoibcda",
      title: "Mr",
      firstName: "Mohammed",
      lastName: "farnas",
      dateOfBirth: "Fri Feb 14 1992 05:30:00 GMT+0530",
      gender: "male",
      email: "armkiyas99@gmail.com",
      phone: "76721151233",
      address: "21,hostpital road",
      NIC: "866487543v",
      Passport: null,
    },
    doctor: {
      staff: {
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        image: "/img/avatar/person-male.png",
      },
    },
  },
  {
    id: "clt7qlj2x0002z5onfhkbvr65",
    referenceid: "cloudcare-lt7qlj2w-z2tp",
    appointmentNumber: 2,
    appointmentDate: "Wed Mar 13 2024 05:30:00 GMT+0530",
    appointmentstart: "Fri Jan 02 1970 02:18:00 GMT+0530",
    appointmentEnd: "Fri Jan 02 1970 02:21:00 GMT+0530 ",
    createdat: "Fri Mar 01 2024 02:57:51 GMT+0530",
    updatedat: "Fri Mar 01 2024 02:57:51 GMT+0530",
    patientNote: null,
    status: "Pending",
    patientId: "clt7qlj2x0003z5onqp9mglbu",
    doctorId: "cls3ikk9r0007fbmgy9i70xgw",
    nurseId: null,
    oPDId: null,
    scheduleId: "clt6ezsl90005rf5bedufqlku",
    slotId: "clt6ezsla0007rf5bj6v79w5f",
    Slot: {
      id: "clt6ezsla0007rf5bj6v79w5f",
      ScheduleId: "clt6ezsl90005rf5bedufqlku",
      maxAppointmentsPerSlot: 5,
      startTime: "Fri Jan 02 1970 02:15:00 GMT+0530",
      endTime: "Fri Jan 02 1970 02:30:00 GMT+0530",
    },
    patient: {
      id: "clt7qlj2x0003z5onqp9mglbu",
      title: "Mr",
      firstName: "farnas",
      lastName: "mohammed",
      dateOfBirth: "Mon Mar 26 1990 05:30:00 GMT+0530",
      gender: "male",
      email: "arhg@gjfjg.com",
      phone: null,
      address: null,
      NIC: "99943488",
      Passport: null,
    },
    doctor: {
      staff: {
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        image: "/img/avatar/person-male.png",
      },
    },
  },
];

export default function AppointmentDataTable() {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    patientName: undefined,
  });
  const {
    data: appointmentData,
    isFetching: appointmentFetching,
    refetch,
  } = useApiClient.appointment.getAppointments.useQuery(
    {
      limit: PAGE_SIZE,
      page: page,
      patientName: searchQuery.patientName,
    },
    {
      staleTime: 1000 * 60 * 5,
    },
  );

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<data>>({
    columnAccessor: "appointmentDate",
    direction: "asc",
  });

  // const { showContextMenu, hideContextMenu } = useContextMenu();

  const renderActions: DataTableColumn<AppointmentDataType>["render"] = (
    record,
  ) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon size="sm" variant="transparent" color="green">
        <IconMessage size={16} />
      </ActionIcon>
      <ActionIcon size="sm" variant="transparent">
        <IconEdit size={16} />
      </ActionIcon>
    </Group>
  );

  // const handleContextMenu: DataTableProps<data>["onRowContextMenu"] = ({
  //   record,
  //   event,
  // }) =>
  //   showContextMenu([
  //     {
  //       key: "edit",
  //       icon: <IconEdit size={14} />,
  //       title: `Edit ${record.patient.firstName} ${record.patient.lastName}`,
  //       onClick: () => editRecord(record),
  //     },
  //     {
  //       key: "delete",
  //       title: `Delete ${record.patient.firstName} ${record.patient.lastName}`,
  //       icon: <IconTrashX size={14} />,
  //       color: "red",
  //       onClick: () => deleteRecord(record),
  //     },
  //     { key: "divider" },
  //     {
  //       key: "deleteMany",
  //       hidden:
  //         selectedRecords.length <= 1 ||
  //         !selectedRecords.map((r) => r.id).includes(record.id),
  //       title: `Delete ${selectedRecords.length} selected records`,
  //       icon: <IconTrash size={14} />,
  //       color: "red",
  //       onClick: deleteSelectedRecords,
  //     },
  //   ])(event);

  const [query, setQuery] = useState("");

  const Tablecolumns: DataTableProps<AppointmentDataType>["columns"] = [
    {
      accessor: "index",
      title: "#",
      render: (record) => {
        const index = appointmentData?.data.indexOf(record);
        return page * PAGE_SIZE - PAGE_SIZE + (index || 0) + 1;
      },
    },
    {
      accessor: "doctor",
      title: "Doctor",
      render: (record) =>
        `${record.doctor.staff.title} ${record.doctor.staff.firstName} ${record.doctor.staff.lastName}`,
    },
    {
      accessor: "patient",
      title: "patient",
      filter: (
        <div>
          <TextInput
            label="Employees"
            description="Search patient by name,nic or passport Number"
            placeholder="type name and press enter to search"
            leftSection={<IconSearch size={16} />}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSearchQuery({ patientName: query });
              }
            }}
            rightSection={
              query !== "" && (
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  c="dimmed"
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                    setSearchQuery({ patientName: undefined });
                  }}
                >
                  <IconX size={14} />
                </ActionIcon>
              )
            }
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </div>
      ),
      filtering: query !== "",
      render: (record) =>
        `${record.patient.title} ${record.patient.firstName} ${record.patient.lastName}`,
    },
    {
      accessor: "appointmentDate",
      title: "Date",
      render: (record) => dayjs(record.appointmentDate).format("DD/MM/YYYY"),
    },
    {
      accessor: "appointmentstart",
      title: "Start Time",
      render: (record) => dayjs(record.appointmentstart).format("hh:mm A"),
    },
    {
      accessor: "appointmentEnd",
      title: "End Time",
      render: (record) => dayjs(record.appointmentEnd).format("hh:mm A"),
    },
    {
      accessor: "appointmentNumber",
      title: "Number",
    },
    {
      accessor: "referenceid",
      title: "Reference",
    },
    {
      accessor: "status",
      title: "Status",
    },
    {
      accessor: "actions",
      title: (
        <Center>
          <IconClick size={16} />
        </Center>
      ),
      width: "0%",
      render: renderActions,
    },
  ];

  const handleSortStatusChange = (status: DataTableSortStatus<data>) => {
    setSortStatus(status);
  };

  return (
    <div>
      <DataTable
        withTableBorder
        withColumnBorders
        minHeight={500}
        striped
        highlightOnHover
        verticalAlign="center"
        pinLastColumn
        selectionTrigger="cell"
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        page={page}
        onPageChange={setPage}
        totalRecords={appointmentData?.pagenation.total || 0}
        recordsPerPage={PAGE_SIZE}
        // onRowContextMenu={handleContextMenu}
        // onScroll={hideContextMenu}
        // provide data
        records={appointmentData?.data}
        fetching={appointmentFetching}
        // define columns
        columns={Tablecolumns}
        // execute this callback when a row is clicked
      />
    </div>
  );
}
function editRecord(record: AppointmentDataType) {
  throw new Error("Function not implemented.");
}

function deleteRecord(record: AppointmentDataType) {
  throw new Error("Function not implemented.");
}

function deleteSelectedRecords() {
  throw new Error("Function not implemented.");
}
