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
  Badge,
  Tooltip,
  Flex,
  rem,
} from "@mantine/core";
import {
  IconClick,
  IconEdit,
  IconSearch,
  IconTrash,
  IconTrashX,
  IconX,
  IconCheckbox,
  IconCalendarCancel,
  IconCalendarCheck,
} from "@tabler/icons-react";
// import { useContextMenu } from "mantine-contextmenu";
import dayjs from "dayjs";
import { DataTable, DataTableColumn, DataTableProps } from "mantine-datatable";
import React, { useState } from "react";
import { useApiClient } from "@/utils/trpc/Trpc";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useContextMenu } from "mantine-contextmenu";
import { AppointmentDataType } from "@/utils/types";
import { Appointmentstatus } from "@/utils/comonDatas";
import { useSession } from "next-auth/react";

const PAGE_SIZE = 15;

type searchQueryType = {
  patientSearchQuery: string;
  doctorSearchQuery: string;
  refSearch: string;
  status: (typeof Appointmentstatus)[number] | undefined;
  date: [Date | null, Date | null];
};

export default function AppointmentDataTable() {
  const { data: sessiondata, status } = useSession();

  const [selectedRecords, setSelectedRecords] = useState([]);

  const isTouch = useMediaQuery("(pointer: coarse)");

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
        color: "green",
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
          Are you sure you want to delete the Appointments? This action is
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

  const openEditModal = (
    record: AppointmentDataType[],
    type: (typeof Appointmentstatus)[number],
  ) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to change the status of the Appointments to{" "}
          {type} ?
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleAppointmentedit(record, type),
    });

  const { mutateAsync, isLoading } =
    useApiClient.appointment.editAppointment.useMutation({
      onSuccess: (data) => {
        if (data.data.count > 0) {
          utils.appointment.getAppointments.invalidate();
        }
      },
    });

  const handleAppointmentedit = async (
    record: AppointmentDataType[],
    data: (typeof Appointmentstatus)[number],
  ) => {
    const id = notifications.show({
      title: "Updating",
      message: "Updating the appointment....",
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });
    try {
      const response = await mutateAsync({
        data: record.map((item) => ({
          id: item.id,
          status: data,
          date: item.appointmentDate,
        })),
      });

      if (response.data.count > 0) {
        notifications.update({
          id,
          title: "Updated",
          message: "Appointment updated successfully",
          loading: false,
          autoClose: 5000,
          withCloseButton: true,
          color: "green",
        });
      } else {
        return new Error("Error while Updating the appointment");
      }
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: "Error while Updating the appointment",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    }
  };

  const renderActions: DataTableColumn<AppointmentDataType>["render"] = (
    record,
  ) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <Tooltip
        label={`${
          record.status == "Active" || record.status == "Completed"
            ? "Cannot Make "
            : ""
        }Active`}
      >
        <ActionIcon
          size="sm"
          variant="transparent"
          color="green"
          hidden={!sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT")}
          disabled={
            record.status == "Active" ||
            record.status == "Completed" ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT")
          }
          onClick={() => openEditModal([record], "Active")}
        >
          <IconCheckbox size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label={`${
          record.status == "Cancelled" || record.status == "Completed"
            ? "Cannot Make "
            : ""
        }Completed`}
      >
        <ActionIcon
          size="sm"
          variant="transparent"
          color="green"
          hidden={!sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT")}
          disabled={
            record.status == "Cancelled" ||
            record.status == "Completed" ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT")
          }
          onClick={() => openEditModal([record], "Completed")}
        >
          <IconCalendarCheck size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label={`${record.status == "Completed" ? "Cannot Make " : ""}Cancel`}
      >
        <ActionIcon
          size="sm"
          variant="transparent"
          color="gray"
          hidden={!sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT")}
          disabled={
            record.status == "Completed" ||
            record.status == "Cancelled" ||
            !sessiondata?.user?.Permissions?.includes("APPOINTMENTS_EDIT")
          }
          onClick={() => openEditModal([record], "Cancelled")}
        >
          <IconCalendarCancel size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon
          size="sm"
          variant="transparent"
          color="red"
          hidden={
            !sessiondata?.user?.Permissions?.includes("APPOINTMENTS_DELETE")
          }
          disabled={
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_DELETE")
          }
          onClick={() => {
            return openDeleteModal([record]);
          }}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
  const { showContextMenu, hideContextMenu } = useContextMenu();
  const handleContextMenu: DataTableProps<AppointmentDataType>["onRowContextMenu"] =
    ({ record, event }) =>
      showContextMenu([
        // {
        //   key: "edit",
        //   icon: <IconEdit size={14} />,
        //   title: `Edit ${record.patient.firstName} ${record.patient.lastName}`,
        //   onClick: () => openDeleteModal([record]),
        // },
        {
          key: "active",
          hidden:
            record.status === "Active" ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT"),

          title: `Active ${record.patient.title} ${record.patient.firstName} ${record.patient.lastName} appointment`,
          icon: <IconCheckbox size={14} />,
          color: "green",
          onClick: () => openEditModal([record], "Active"),
        },
        {
          key: "complete",
          hidden:
            record.status === "Completed" ||
            record.status === "Cancelled" ||
            record.status === "Pending" ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT"),
          title: `complete ${record.patient.title} ${record.patient.firstName} ${record.patient.lastName} appointment`,
          icon: <IconCalendarCheck size={14} />,
          color: "green",
          onClick: () => openEditModal([record], "Completed"),
        },
        {
          key: "Cancel Appointment",
          icon: <IconCalendarCancel size={14} />,
          hidden:
            record.status === "Cancelled" ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT"),
          title: `Cancel ${record.patient.title} ${record.patient.firstName} ${record.patient.lastName} appointment`,
          color: "gray",
          onClick: () => openEditModal([record], "Cancelled"),
        },
        {
          key: "delete",
          hidden: !sessiondata?.user?.Permissions.includes(
            "APPOINTMENTS_DELETE",
          ),
          title: `Delete ${record.patient.title} ${record.patient.firstName} ${record.patient.lastName} appointment`,
          icon: <IconTrashX size={14} />,
          color: "red",
          onClick: () => openDeleteModal([record]),
        },
        { key: "divider" },
        {
          key: "activeMany",
          hidden:
            selectedRecords.length <= 1 ||
            !selectedRecords.map((r) => r.id).includes(record.id) ||
            selectedRecords.map((r) => r.status).includes("Active") ||
            selectedRecords.map((r) => r.status).includes("Cancelled") ||
            selectedRecords.map((r) => r.status).includes("Completed") ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT"),
          title: `Active ${selectedRecords.length} selected records`,
          icon: <IconCheckbox size={14} />,
          color: "green",
          onClick: () => openEditModal(selectedRecords, "Active"),
        },
        {
          key: "completemany",
          hidden:
            selectedRecords.length <= 1 ||
            !selectedRecords.map((r) => r.id).includes(record.id) ||
            selectedRecords.map((r) => r.status).includes("Pending") ||
            selectedRecords.map((r) => r.status).includes("Cancelled") ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT"),
          title: `complete ${selectedRecords.length} selected records`,
          icon: <IconCheckbox size={14} />,
          color: "green",
          onClick: () => openEditModal(selectedRecords, "Completed"),
        },
        {
          key: "ceancelMany",
          hidden:
            selectedRecords.length <= 1 ||
            !selectedRecords.map((r) => r.id).includes(record.id) ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_EDIT"),

          title: `Cancel ${selectedRecords.length} selected records`,
          icon: <IconCalendarCancel size={14} />,
          color: "gray",
          onClick: () => openEditModal(selectedRecords, "Cancelled"),
        },
        {
          key: "deleteMany",
          hidden:
            selectedRecords.length <= 1 ||
            !selectedRecords.map((r) => r.id).includes(record.id) ||
            !sessiondata?.user?.Permissions.includes("APPOINTMENTS_DELETE"),
          title: `Delete ${selectedRecords.length} selected records`,
          icon: <IconTrash size={14} />,
          color: "red",
          onClick: () => openDeleteModal(selectedRecords),
        },
      ])(event);

  const rowExpansion: DataTableProps<AppointmentDataType>["rowExpansion"] = {
    allowMultiple: true,
    content: ({ record: { id, patient, patientNote } }) => (
      <Flex p="xs" pl={rem(50)} gap="sm" align="start" direction={"column"}>
        <Text size="sm" fs="italic">
          {patientNote && (
            <div>
              <Badge color="red">Patient Note :</Badge>

              <br />
              {patientNote}
              <br />
            </div>
          )}
        </Text>
        <div>
          <Badge color="cyan">
            {`${patient.title} ${patient.firstName} ${patient.lastName}`} Info:
          </Badge>
        </div>
        <div className="flex flex-col w-full space-y-1 lg:space-y-0 lg:space-x-1 lg:flex-row">
          <Badge color="gray">Gender: {patient.gender}</Badge>
          {patient.NIC ? (
            <Badge color="gray">NIC : {patient.NIC}</Badge>
          ) : (
            <Badge color="gray">Passport : {patient.Passport}</Badge>
          )}

          <Badge color="gray">
            DOB : {dayjs(patient.dateOfBirth).format("DD/MM/YYYY")}
          </Badge>
          {patient.email && <Badge color="gray">Email : {patient.email}</Badge>}
          {patient.phone && (
            <Badge color="gray">Mobile : {patient.phone}</Badge>
          )}
          {patient.address && (
            <Badge color="gray">Address: {patient.address}</Badge>
          )}
        </div>
      </Flex>
    ),
  };

  const Tablecolumns: DataTableProps<AppointmentDataType>["columns"] = [
    {
      accessor: "index",
      title: "#",
      textAlign: "center",
      width: "0%",
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
      textAlign: "center",
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
      textAlign: "center",
      width: "0%",
      render: (record) => (
        <Badge
          color={
            record.status == "Active"
              ? "green"
              : record.status == "Completed"
              ? "indigo"
              : "gray"
          }
        >
          {record.status}
        </Badge>
      ),
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

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        {selectedRecords.length > 0 && isTouch && (
          <Button
            leftSection={<IconTrashX size={16} />}
            color="red"
            radius={8}
            hidden={
              !sessiondata?.user?.Permissions.includes("APPOINTMENTS_DELETE")
            }
            onClick={() => {
              openDeleteModal(selectedRecords);
            }}
          >
            Delete selected
          </Button>
        )}
      </div>
      <DataTable
        textSelectionDisabled={isTouch}
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
        hidden={!sessiondata?.user?.Permissions.includes("APPOINTMENTS_READ")}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        page={page}
        onPageChange={setPage}
        totalRecords={appointmentData?.pagenation.total || 0}
        recordsPerPage={PAGE_SIZE}
        onRowContextMenu={handleContextMenu}
        onScroll={hideContextMenu}
        rowExpansion={rowExpansion}
        records={appointmentData?.data}
        fetching={appointmentFetching}
        columns={Tablecolumns}
      />
    </div>
  );
}
