"use client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Select,
  TextInput,
  Text,
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
import { useDebouncedValue } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

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

const Appointmentstatus = [
  "Pending",
  "Confirmed",
  "Cancelled",
  "Completed",
] as const;

type searchQueryType = {
  patientSearchQuery: string;
  doctorSearchQuery: string;
  refSearch: string;
  status: (typeof Appointmentstatus)[number] | undefined;
  date: [Date | null, Date | null];
};

export default function AppointmentDataTable() {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<searchQueryType>({
    patientSearchQuery: "",
    doctorSearchQuery: "",
    refSearch: "",
    status: undefined,
    date: [null, null],
  });

  const [debounced] = useDebouncedValue(searchQuery, 700);

  const { data: appointmentData, isFetching: appointmentFetching } =
    useApiClient.appointment.getAppointments.useQuery(
      {
        limit: PAGE_SIZE,
        page: page,
        patientSearchQuery: debounced.patientSearchQuery,
        doctorSearchQuery: debounced.doctorSearchQuery,
        referenceId: debounced.refSearch,
        status: debounced.status,
        date: debounced.date,
      },
      {
        staleTime: 1000 * 60 * 5,
      },
    );

  const utils = useApiClient.useUtils();

  const { mutateAsync: deleteappointasync, isSuccess: deletedsuccess } =
    useApiClient.appointment.deleteAppointment.useMutation({
      onSuccess: (data) => {
        if (data.data.count > 0) {
          utils.appointment.getAppointments.invalidate();
        }
      },
    });

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<data>>({
    columnAccessor: "appointmentDate",
    direction: "asc",
  });

  const deleteHandler = async (deleteId: { id: string }[]) => {
    const id = notifications.show({
      title: "Deleting",
      message: "Deleting the appointment....",
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });
    try {
      console.log(deleteId);
      const response = await deleteappointasync({ deleteMany: deleteId });
      console.log(response);
      notifications.update({
        id,
        title: "Deleted",
        message: "Appointment deleted successfully",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: "Error while deleting the appointment",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    }
  };

  const openDeleteModal = (record) =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your the Appointment? This action is
          destructive and the data cannot be recovered.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },

      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        const data = record.map((item) => ({
          id: item.id,
        }));
        return deleteHandler(data);
      },
    });

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
      <ActionIcon
        size="sm"
        variant="transparent"
        color="red"
        onClick={() => {
          return openDeleteModal([record]);
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  );

  // const { showContextMenu, hideContextMenu } = useContextMenu();
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

  const [datefilter, setdatefilter] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

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

      filter: (
        <div>
          <TextInput
            label="Doctor"
            description="Search Doctor by last or first name"
            placeholder="type to search...."
            leftSection={<IconSearch size={16} />}
            rightSection={
              searchQuery.doctorSearchQuery !== "" && (
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  c="dimmed"
                  onClick={() => {
                    setPage(1);
                    setSearchQuery((pevstate) => ({
                      ...pevstate,
                      doctorSearchQuery: "",
                    }));
                  }}
                >
                  <IconX size={14} />
                </ActionIcon>
              )
            }
            value={searchQuery.doctorSearchQuery}
            onChange={(e) =>
              setSearchQuery((pevstate) => ({
                ...pevstate,
                doctorSearchQuery: e.target.value,
              }))
            }
          />
        </div>
      ),
      filtering: searchQuery.patientSearchQuery !== "",
    },
    {
      accessor: "patient",
      title: "patient",
      filter: (
        <div>
          <TextInput
            label="Patients"
            description="Search patient by last or first name,nic or passport Number"
            placeholder="type to search...."
            leftSection={<IconSearch size={16} />}
            rightSection={
              searchQuery.patientSearchQuery !== "" && (
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  c="dimmed"
                  onClick={() => {
                    setPage(1);
                    setSearchQuery((pevstate) => ({
                      ...pevstate,
                      patientSearchQuery: "",
                    }));
                  }}
                >
                  <IconX size={14} />
                </ActionIcon>
              )
            }
            value={searchQuery.patientSearchQuery}
            onChange={(e) =>
              setSearchQuery((pevstate) => ({
                ...pevstate,
                patientSearchQuery: e.target.value,
              }))
            }
          />
        </div>
      ),
      filtering: searchQuery.patientSearchQuery !== "",
      render: (record) =>
        `${record.patient.title} ${record.patient.firstName} ${record.patient.lastName}`,
    },
    {
      accessor: "appointmentDate",
      title: "Date",
      render: (record) => dayjs(record.appointmentDate).format("DD/MM/YYYY"),
      filter: (
        <div>
          <DatePicker
            locale=""
            type="range"
            value={searchQuery.date}
            onChange={(e) => {
              setPage(1);
              setSearchQuery((pevstate) => ({
                ...pevstate,
                date: e,
              }));
            }}
          />
        </div>
      ),
      filtering: searchQuery.date[0] !== null || searchQuery.date[1] !== null,
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
      filter: (
        <div>
          <TextInput
            label="Patients"
            description="Search patient by Appointment Reference Id"
            placeholder="type to search...."
            leftSection={<IconSearch size={16} />}
            rightSection={
              searchQuery.refSearch !== "" && (
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  c="dimmed"
                  onClick={() => {
                    setPage(1);
                    setSearchQuery((pevstate) => ({
                      ...pevstate,
                      refSearch: "",
                    }));
                  }}
                >
                  <IconX size={14} />
                </ActionIcon>
              )
            }
            value={searchQuery.refSearch}
            onChange={(e) =>
              setSearchQuery((pevstate) => ({
                ...pevstate,
                refSearch: e.target.value,
              }))
            }
          />
        </div>
      ),
      filtering: searchQuery.refSearch !== "",
    },
    {
      accessor: "status",
      title: "Status",
      filter: (
        <div>
          <Select
            label="Status"
            description="Filter by status"
            placeholder="type to search...."
            leftSection={<IconSearch size={16} />}
            rightSection={
              searchQuery.status !== undefined && (
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  c="dimmed"
                  onClick={() => {
                    setPage(1);
                    setSearchQuery((pevstate) => ({
                      ...pevstate,
                      status: undefined,
                    }));
                  }}
                >
                  <IconX size={14} />
                </ActionIcon>
              )
            }
            clearable
            data={Appointmentstatus}
            value={searchQuery.status}
            onChange={(e: (typeof Appointmentstatus)[number]) => {
              setPage(1);
              setSearchQuery((pevstate) => ({
                ...pevstate,
                status: e,
              }));
            }}
          />
        </div>
      ),
      filtering: searchQuery.status !== undefined,
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
    <div className="space-y-2">
      <div className="flex justify-end">
        {selectedRecords.length > 0 && (
          <Button
            leftSection={<IconTrashX size={16} />}
            color="red"
            radius={8}
            onClick={() => {
              openDeleteModal(selectedRecords);
            }}
          >
            Delete selected
          </Button>
        )}
      </div>
      <DataTable
        title="Appointments"
        withTableBorder
        withColumnBorders
        minHeight={500}
        borderRadius={12}
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
