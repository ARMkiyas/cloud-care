"use client";
import React from "react";
import { useState, ChangeEvent, MouseEvent } from "react";
import { format } from "date-fns";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Button,
  Modal,
  Pagination,
  Select,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
} from "@tabler/icons-react";
import classes from "./TableSort.module.css";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useApiClient } from "@/utils/trpc/Trpc";
import { TScheduleGet } from "@/server/api/ApiTypeFactory";
interface RowData {
  id: string;
  doctorName: string;
  specialization: string;
  recurrence: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  endDate: string;
  every: number;
  maxAppointments: number;
}
interface ScheduleInput {
  doctorId: string;
  scheduleId?: string;
  recurrence: "ONCE" | "WEEKLY" | "MONTHLY";
  maxAppointments?: number;
  once?: {
    date?: Date | undefined;
    startTime: string;
    endTime: string;
  };
  weekly?: {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    day: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
    startTime: string;
    endTime: string;
    every?: number;
  };
  monthly?: {
    date?: Date | undefined;
    endDate?: Date | undefined;
    startTime: string;
    endTime: string;
    every?: number;
  };
}

interface ThProps {
  children: React.ReactNode;
  onSort(): void;
}

function Th({ children, onSort }: ThProps) {
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <Group>
          <Text size="sm">{children}</Text>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export default function TableSort() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    "0": scheduleData,
    "1": {
      isError: scheduleError,
      isLoading: scheduleLoading,
      isFetching: scheduleFetching,
      refetch: scheduleRefresh,
    },
  } = useApiClient.schedule.get.useSuspenseQuery({});
  const { "0": doctors } = useApiClient.manageStaff.getStaff.useSuspenseQuery({
    staffType: "doctors",
  });
  const handleRefetch = async () => {
    try {
      await scheduleRefresh();
    } catch (error) {
      console.error("Error refetching user data:", error);
    }
  };

  const {
    mutateAsync: updateAsync,
    isError: ScheduleUpdateError,
    isSuccess: scheduleUpdateSuccess,
  } = useApiClient.schedule.update.useMutation();
  const {
    mutateAsync: deleteAsync,
    isError: ScheduleDeleteError,
    isSuccess: scheduleDeleteSuccess,
  } = useApiClient.schedule.delete.useMutation();
  const {
    mutateAsync: createAsync,
    isError: scheduleAddError,
    isSuccess: scheduleAddSuccess,
    error: createError,
  } = useApiClient.schedule.create.useMutation();
  const [data, setData] = useState<TScheduleGet["data"]>([
    ...scheduleData.data,
  ]);
  const [doctorData, setDoctorData] = useState(doctors.data);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [saveButtonEnabled, setSaveButtonenabled] = useState(true);
  const [opened, setOpened] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [newRowData, setNewRowData] = useState<RowData>({
    id: null,
    doctorName: "",
    specialization: "",
    recurrence: "",
    date: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    endDate: "",
    every: 1,
    maxAppointments: 1,
  });
  const [editingRowData, setEditingRowData] = useState(null);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setSortBy(field);
    setReverseSortDirection(reversed);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setNewRowData({
      id: null,
      doctorName: "",
      specialization: "",
      recurrence: "",
      date: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      endDate: "",
      every: 1,
      maxAppointments: 1,
    });
  };

  React.useEffect(() => {
    if (scheduleAddError && createError) {
      console.log(
        createError.message || "An error occurred while deleting the schedule.",
      );
    }
  }, [scheduleAddError, createError]);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof RowData,
  ) => {
    setNewRowData({ ...newRowData, [key]: event.target.value });
  };
  const buildInput = (newRowData): ScheduleInput => {
    let input: ScheduleInput = {
      recurrence: newRowData.recurrence,

      doctorId: newRowData.doctorName,
    };

    if (newRowData.recurrence === "ONCE") {
      input.once = {
        date: new Date(newRowData.date),
        startTime: new Date(
          `${newRowData.date}T${newRowData.startTime}`,
        ).toISOString(),
        endTime: new Date(
          `${newRowData.date}T${newRowData.endTime}`,
        ).toISOString(),
      };
    } else if (newRowData.recurrence === "WEEKLY") {
      input.weekly = {
        day: newRowData.dayOfWeek,
        endDate: new Date(newRowData.endDate),
        every: parseInt(newRowData.every, 10),
        startDate: new Date(newRowData.date),
        startTime: new Date(
          `${newRowData.date}T${newRowData.startTime}`,
        ).toISOString(),
        endTime: new Date(
          `${newRowData.date}T${newRowData.endTime}`,
        ).toISOString(),
      };
    } else {
      input.monthly = {
        endDate: new Date(newRowData.endDate),
        every: parseInt(newRowData.every, 10),
        date: new Date(newRowData.date),
        startTime: new Date(
          `${newRowData.date}T${newRowData.startTime}`,
        ).toISOString(),
        endTime: new Date(
          `${newRowData.date}T${newRowData.endTime}`,
        ).toISOString(),
      };
    }
    return input;
  };
  const handleSaveNewRow = async () => {
    // setSaveButtonenabled(false)
    const input = buildInput(newRowData);

    const updatedSchedule = await createAsync(input);
    const selectedDoctor = doctorData.find(
      (doc) => doc.doctor.id === updatedSchedule.data.doctorId,
    );
    const doctorObj = {
      specialization: selectedDoctor.doctor.specialization,
      staff: {
        firstName: selectedDoctor.firstName,
        lastName: selectedDoctor.lastName,
      },
    };

    const savedData = {
      id: updatedSchedule.data.id,
      dayOfWeek: updatedSchedule.data.dayOfWeek,
      doctor: doctorObj,
      recurrence: updatedSchedule.data.recurrence,
      recurringEvery: updatedSchedule.data.recurringEvery,
      endDate: updatedSchedule.data.endDate,
      Date: updatedSchedule.data.Date,
      startTime: updatedSchedule.data.startTime,
      endTime: updatedSchedule.data.endTime,
      totalAppointments: updatedSchedule.data?.totalAppointment,
    };

    setData([
      ...data,
      { ...savedData, id: updatedSchedule.data.id },
    ] as TScheduleGet["data"]);
    setSaveButtonenabled(true);
    handleModalClose();
  };

  const handleEditModalOpen = (rowData: RowData) => {
    const foundRow = displayedRows.find((doc) => doc.id === rowData.id);
    const editData = {
      id: foundRow.id,
      doctorName: foundRow.doctor.id,
      specialization: foundRow.doctor.specialization,
      recurrence: foundRow.recurrence,
      every: foundRow.recurringEvery,
      date: format(foundRow.Date, "yyyy-MM-dd"),
      endDate:
        foundRow.endDate != null ? format(foundRow.endDate, "yyyy-MM-dd") : "",
      dayOfWeek: foundRow.dayOfWeek,
      startTime: format(foundRow.startTime, "HH:mm"),
      endTime: format(foundRow.endTime, "HH:mm"),
      OptRoomsid: foundRow?.OptRoomsid,
      maxAppointments: foundRow?.totalAppointment,
      noOfSlots: foundRow?._count?.Slot,
      appointments: foundRow?._count?.Appointment,
    };
    setEditingRowData(editData);
    setEditModalOpened(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpened(false);
    setEditingRowData(null);
  };

  const handleEditInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof RowData,
  ) => {
    if (!editingRowData) return;
    setEditingRowData({ ...editingRowData, [key]: event.target.value });
  };

  const handleSaveEditedRow = async () => {
    if (!editingRowData) return;
    //   setSaveButtonenabled(false)
    const input = {
      scheduleId: editingRowData.id,
      date: new Date(editingRowData.date),
      startTime: new Date(
        `${editingRowData.date}T${editingRowData.startTime}`,
      ).toISOString(),
      endTime: new Date(
        `${editingRowData.date}T${editingRowData.endTime}`,
      ).toISOString(),
      dayOfWeek: editingRowData.dayOfWeek,
      // maxAppointments: editingRowData.maxAppointments,
      // noOfSlots: editingRowData.noOfSlots,
      // opdRoomid: editingRowData.OptRoomsid
    };

    const updatedSchedule = await updateAsync(input);
    const updatedData = data.map((row) => {
      if (row.id === editingRowData.id) {
        const selectedDoctor = doctorData.find(
          (doc) => doc.doctor.id === editingRowData.doctorName,
        );
        const doctorObj = {
          id: selectedDoctor.doctor.id,
          specialization: selectedDoctor.doctor.specialization,
          staff: {
            firstName: selectedDoctor.firstName,
            lastName: selectedDoctor.lastName,
          },
        };
        // const counts = {
        //   Slot:editingRowData.Slot,
        //   Appointment:editingRowData.appointments
        // }
        const savedData = {
          // totalAppointment:editingRowData.maxAppointments,
          // OptRoomsid:editingRowData.OptRoomsid,
          id: editingRowData.id,
          dayOfWeek: editingRowData.dayOfWeek,
          doctor: doctorObj,
          recurrence: editingRowData.recurrence,
          recurringEvery: editingRowData.every,
          endDate: editingRowData.endDate
            ? new Date(editingRowData.endDate)
            : null,
          Date: new Date(editingRowData.date),
          // _count:counts,
          startTime: new Date(
            `${editingRowData.date}T${editingRowData.startTime}`,
          ).toISOString(),
          endTime: new Date(
            `${editingRowData.date}T${editingRowData.endTime}`,
          ).toISOString(),
        };
        return { ...row, ...savedData };
      }
      return row;
    });
    setData(updatedData as TScheduleGet["data"]);
    setSaveButtonenabled(true);
    handleEditModalClose();
  };

  const handleDeleteRowConfirm = (rowToDelete: RowData) => {
    setDeleteRow(rowToDelete);
    setOpened(true);
  };
  const handleDeleteRow = async (rowToDelete: RowData) => {
    const input = {
      scheduleId: rowToDelete.id,
    };
    await deleteAsync(input);
    const updatedData = data.filter((row) => row.id !== rowToDelete.id);
    setData(updatedData);
  };

  const handleSort = (field: keyof RowData) => {
    setSorting(field);
    const sorted = [...data].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    if (reverseSortDirection) sorted.reverse();
    setData(sorted);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    //  handleRefetch();
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRows = data?.slice(startIndex, endIndex);
  const transformRows = (rows) =>
    rows.map((row) => ({
      id: row.id,
      doctorName: `${row.doctor.staff.firstName} ${row.doctor.staff.lastName}`,
      specialization: row.doctor.specialization,
      recurrence: row.recurrence,
      date: row.Date ? format(row.Date, "MM/dd/yyyy") : "-",
      dayOfWeek: row.dayOfWeek || "-",
      startTime: row.startTime ? format(row.startTime, "hh:mm aa") : "-",
      endTime: row.endTime ? format(row.endTime, "hh:mm aa") : "-",
      endDate: row.endDate ? format(row.endDate, "MM/dd/yyyy") : "-", // Assuming endDate is already in the correct format or does not need formatting
      every: row.recurringEvery ?? "-",
      maxAppointments: row?.totalAppointment,
      noOfSlots: row?._count?.Slot,
      OptRoomsid: row?.OptRoomsid,
      appointments: row?._count?.Appointment,
      // Assuming this is directly usable
    }));

  const transformedRows = transformRows(displayedRows);

  // Now, filter the transformed rows
  const rows = transformedRows
    .filter((row) =>
      Object.values(row)
        .filter((value) => typeof value === "string")
        .some((value) => value.toLowerCase().includes(search.toLowerCase())),
    )
    .map((row, index) => (
      <Table.Tr key={index}>
        <Table.Td>{row.id}</Table.Td>
        <Table.Td>{row.doctorName}</Table.Td>
        <Table.Td>{row.specialization}</Table.Td>
        <Table.Td>{row.recurrence}</Table.Td>
        <Table.Td>{row.date}</Table.Td>
        <Table.Td>{row.endDate}</Table.Td>
        <Table.Td>{row.dayOfWeek}</Table.Td>
        <Table.Td>{row.every}</Table.Td>
        <Table.Td>{row.startTime}</Table.Td>
        <Table.Td>{row.endTime}</Table.Td>
        {/* <Table.Td>{row.maxAppointments}</Table.Td> */}
        <Table.Td>
          <Group style={{ margin: "-8px -4px" }}>
            <IconPencil
              style={{
                width: rem(20),
                height: rem(20),
                color: "green",
                cursor: "pointer",
              }}
              onClick={() => handleEditModalOpen(row)}
            />
            <IconTrash
              style={{
                width: rem(20),
                height: rem(20),
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => handleDeleteRowConfirm(row)}
            />
          </Group>
        </Table.Td>
      </Table.Tr>
    ));
  return (
    <div>
      <h1>Schedules</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          marginRight: "3px",
        }}
      >
        <Button
          onClick={handleModalOpen}
          style={{ backgroundColor: "#4CAF50" }}
        >
          <Group>
            <IconPlus />
            <span style={{ color: "white" }}>Add New Schedule</span>
          </Group>
        </Button>
      </div>

      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Schedule ID
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Doctor Name
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Specialization
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Recurrence
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Date
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                End Date
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Day of week
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Every
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Start Time
              </Table.Th>
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                End Time
              </Table.Th>
              {/* <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Max Appointments</Table.Th> */}
              <Table.Th
                style={{
                  display: "table-cell",
                  textAlign: "left",
                  fontWeight: 500,
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#E6F4EA",
                }}
              >
                Actions
              </Table.Th>
            </Table.Tr>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text style={{ fontWeight: 500, textAlign: "center" }}>
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Modal
        opened={modalOpened}
        onClose={handleModalClose}
        title="Add New Schedule"
        size="sm"
      >
        {/* <TextInput
          label="Schedule ID"
          value={newRowData.id !== null ? String(newRowData.id) : ""}
          onChange={(event) => handleInputChange(event, "id")}
          style={{ marginBottom: "16px" }}
          type="number"
        /> */}
        <Select
          label="Doctor"
          placeholder="Select a doctor"
          value={newRowData.doctorName}
          onChange={(event) => {
            const selectedDoctorId = event;
            // Find the selected doctor from the doctorData array
            const selectedDoctor = doctorData.find(
              (doc) => doc.doctor.id === selectedDoctorId,
            );
            // Update newRowData with the selected doctor's name and specialization
            if (selectedDoctor) {
              setNewRowData((prevState) => ({
                ...prevState,
                doctorName: selectedDoctor.doctor.id, // Storing the doctor's ID
                specialization: selectedDoctor.doctor.specialization, // Assuming you want to store this too
              }));
            }
          }}
          data={doctorData.map((doc) => ({
            value: doc.doctor.id, // Use doctor's ID for value
            label: `${doc.title} ${doc.firstName} ${doc.lastName}`, // Format the label as needed
          }))}
          style={{ marginBottom: "16px" }}
        />

        <TextInput
          label="Specialization"
          value={newRowData.specialization}
          onChange={(event) => handleInputChange(event, "specialization")}
          style={{ marginBottom: "16px" }}
        />
        <Select
          label="Recurrence"
          value={newRowData.recurrence}
          onChange={(event) => {
            setNewRowData({ ...newRowData, ["recurrence"]: event });
          }}
          data={["ONCE", "WEEKLY", "MONTHLY"]}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Date"
          value={newRowData.date}
          onChange={(event) => handleInputChange(event, "date")}
          style={{ marginBottom: "16px" }}
          type="date"
        />
        {["WEEKLY", "MONTHLY"].includes(newRowData.recurrence) && (
          <>
            <TextInput
              label="End Date"
              value={newRowData.endDate}
              onChange={(event) => handleInputChange(event, "endDate")}
              style={{ marginBottom: "16px" }}
              type="date"
            />
            <Select
              label="Day of the Week"
              placeholder="Select a day"
              value={newRowData.dayOfWeek}
              onChange={(event) => {
                setNewRowData({ ...newRowData, ["dayOfWeek"]: event });
              }}
              data={[
                { value: "SUNDAY", label: "Sunday" },
                { value: "MONDAY", label: "Monday" },
                { value: "TUESDAY", label: "Tuesday" },
                { value: "WEDNESDAY", label: "Wednesday" },
                { value: "THURSDAY", label: "Thursday" },
                { value: "FRIDAY", label: "Friday" },
                { value: "SATURDAY", label: "Saturday" },
              ]}
              style={{ marginBottom: "16px" }}
            />
            <TextInput
              label="Every"
              type="number"
              value={newRowData.every}
              onChange={(event) => handleInputChange(event, "every")}
              style={{ marginBottom: "16px" }}
            />
          </>
        )}

        <TextInput
          label="Start Time"
          value={newRowData.startTime}
          onChange={(event) => handleInputChange(event, "startTime")}
          style={{ marginBottom: "16px" }}
          type="time"
        />
        <TextInput
          label="End Time"
          value={newRowData.endTime}
          onChange={(event) => handleInputChange(event, "endTime")}
          style={{ marginBottom: "32px" }}
          type="time"
        />
        {/* <TextInput
          label="Max Appointments"
          value={newRowData.maxAppointments}
          onChange={(event) => handleInputChange(event, "maxAppointments")}
          style={{ marginBottom: "16px" }}
        /> */}
        <Button
          onClick={handleSaveNewRow}
          style={{ backgroundColor: "#4CAF50" }}
          disabled={!saveButtonEnabled}
        >
          Save
        </Button>
      </Modal>

      <Modal
        opened={editModalOpened}
        onClose={handleEditModalClose}
        title="Edit Schedule"
        size="sm"
      >
        {editingRowData && (
          <>
            <Select
              label="Doctor"
              disabled={true}
              placeholder="Select a doctor"
              value={editingRowData.doctorName}
              onChange={(event) => {
                const selectedDoctorId = event;
                // Find the selected doctor from the doctorData array
                const selectedDoctor = doctorData.find(
                  (doc) => doc.doctor.id === selectedDoctorId,
                );
                // Update newRowData with the selected doctor's name and specialization
                if (selectedDoctor) {
                  setEditingRowData((prevState) => ({
                    ...prevState,
                    doctorName: selectedDoctor.doctor.id, // Storing the doctor's ID
                    specialization: selectedDoctor.doctor.specialization, // Assuming you want to store this too
                  }));
                }
              }}
              data={doctorData.map((doc) => ({
                value: doc.doctor.id, // Use doctor's ID for value
                label: `${doc.title} ${doc.firstName} ${doc.lastName}`, // Format the label as needed
              }))}
              style={{ marginBottom: "16px" }}
            />
            <TextInput
              disabled={true}
              label="Specialization"
              value={editingRowData.specialization}
              onChange={(event) =>
                handleEditInputChange(event, "specialization")
              }
              style={{ marginBottom: "16px" }}
            />
            <Select
              disabled={true}
              label="Recurrence"
              value={editingRowData.recurrence}
              onChange={(event) => {
                setEditingRowData({ ...editingRowData, ["recurrence"]: event });
              }}
              data={["ONCE", "WEEKLY", "MONTHLY"]}
              style={{ marginBottom: "16px" }}
            />
            <TextInput
              label="Date"
              value={editingRowData.date}
              onChange={(event) => handleEditInputChange(event, "date")}
              style={{ marginBottom: "16px" }}
              type="date"
            />
            {["WEEKLY", "MONTHLY"].includes(editingRowData.recurrence) && (
              <>
                <TextInput
                  label="End Date"
                  value={editingRowData.endDate}
                  onChange={(event) => handleEditInputChange(event, "endDate")}
                  style={{ marginBottom: "16px" }}
                  type="date"
                />
                <Select
                  label="Day of the Week"
                  placeholder="Select a day"
                  value={editingRowData.dayOfWeek}
                  onChange={(event) => {
                    setEditingRowData({
                      ...editingRowData,
                      ["dayOfWeek"]: event,
                    });
                  }}
                  data={[
                    { value: "SUNDAY", label: "Sunday" },
                    { value: "MONDAY", label: "Monday" },
                    { value: "TUESDAY", label: "Tuesday" },
                    { value: "WEDNESDAY", label: "Wednesday" },
                    { value: "THURSDAY", label: "Thursday" },
                    { value: "FRIDAY", label: "Friday" },
                    { value: "SATURDAY", label: "Saturday" },
                  ]}
                  style={{ marginBottom: "16px" }}
                />
                <TextInput
                  label="Every"
                  type="number"
                  value={editingRowData.every}
                  onChange={(event) => handleEditInputChange(event, "every")}
                  style={{ marginBottom: "16px" }}
                />
              </>
            )}

            <TextInput
              label="Start Time"
              value={editingRowData.startTime}
              onChange={(event) => handleEditInputChange(event, "startTime")}
              style={{ marginBottom: "16px" }}
              type="time"
            />
            <TextInput
              label="End Time"
              value={editingRowData.endTime}
              onChange={(event) => handleEditInputChange(event, "endTime")}
              style={{ marginBottom: "32px" }}
              type="time"
            />
            {/* <TextInput
              label="Room Id"
              type="text"
              value={editingRowData?.OptRoomsid}
              onChange={(event) => handleEditInputChange(event, "OptRoomsid")}
              style={{ marginBottom: '16px' }}
            /> */}
            <TextInput
              disabled={true}
              label="No of Appointments"
              type="number"
              value={editingRowData.appointments}
              style={{ marginBottom: "16px" }}
            />
            {/* <TextInput
              label="Total Appointments"
              type="number"
              value={editingRowData.maxAppointments}
              onChange={(event) => handleEditInputChange(event, "maxAppointments")}
              style={{ marginBottom: '16px' }}
            />
             <TextInput
              label="No of Slots"
              type="number"
              value={editingRowData.noOfSlots}
              onChange={(event) => handleEditInputChange(event, "noOfSlots")}
              style={{ marginBottom: '16px' }}
            /> */}

            <Button
              disabled={!saveButtonEnabled || editingRowData.appointments > 0}
              onClick={handleSaveEditedRow}
              style={{ backgroundColor: "#4CAF50" }}
            >
              Save
            </Button>
          </>
        )}
      </Modal>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this schedule?</p>
        <Group align="right" mt="md">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDeleteRow(deleteRow)}>
            Delete
          </Button>
        </Group>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          color="green"
        />
      </div>
    </div>
  );
}
