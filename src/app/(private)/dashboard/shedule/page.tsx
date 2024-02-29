"use client";
import React from "react";
import { useState,ChangeEvent, MouseEvent } from 'react';
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
  Pagination
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch,IconPlus, } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import {  IconPencil, IconTrash } from '@tabler/icons-react';
interface RowData {
  id: number;
  doctorName: string;
  specialization: string;
  recurrence: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
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

const initialData: RowData[] = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    specialization: "Cardiology",
    recurrence: "Weekly",
    date: "2023.09.09",
    dayOfWeek: "Monday",
    startTime: "09:00 AM",
    endTime: "11:00 AM"
  },
  {
    id: 2,
    doctorName: "Dr. Alice Smith",
    specialization: "Orthopedics",
    recurrence: "Bi-weekly",
    date: "2023.09.10",
    dayOfWeek: "Tuesday",
    startTime: "10:00 AM",
    endTime: "12:00 PM"
  },
  {
    id: 3,
    doctorName: "Dr. Michael Johnson",
    specialization: "Dermatology",
    recurrence: "Monthly",
    date: "2023.09.11",
    dayOfWeek: "Wednesday",
    startTime: "11:00 AM",
    endTime: "01:00 PM"
  },
  {
    id: 4,
    doctorName: "Dr. Emily Brown",
    specialization: "Pediatrics",
    recurrence: "Weekly",
    date: "2023.09.12",
    dayOfWeek: "Thursday",
    startTime: "01:00 PM",
    endTime: "03:00 PM"
  },
  {
    id: 5,
    doctorName: "Dr. David Wilson",
    specialization: "Neurology",
    recurrence: "Bi-weekly",
    date: "2023.09.13",
    dayOfWeek: "Friday",
    startTime: "02:00 PM",
    endTime: "04:00 PM"
  },
  {
    id: 6,
    doctorName: "Dr. Sarah Lee",
    specialization: "Oncology",
    recurrence: "Monthly",
    date: "2023.09.14",
    dayOfWeek: "Saturday",
    startTime: "03:00 PM",
    endTime: "05:00 PM"
  },
  {
    id: 7,
    doctorName: "Dr. Robert Taylor",
    specialization: "Psychiatry",
    recurrence: "Weekly",
    date: "2023.09.15",
    dayOfWeek: "Sunday",
    startTime: "04:00 PM",
    endTime: "06:00 PM"
  },
  {
    id: 8,
    doctorName: "Dr. Jennifer Martinez",
    specialization: "Gynecology",
    recurrence: "Bi-weekly",
    date: "2023.09.16",
    dayOfWeek: "Monday",
    startTime: "05:00 PM",
    endTime: "07:00 PM"
  },
  {
    id: 9,
    doctorName: "Dr. Richard Thompson",
    specialization: "Urology",
    recurrence: "Monthly",
    date: "2023.09.17",
    dayOfWeek: "Tuesday",
    startTime: "06:00 PM",
    endTime: "08:00 PM"
  },
  {
    id: 10,
    doctorName: "Dr. Jessica Garcia",
    specialization: "Endocrinology",
    recurrence: "Weekly",
    date: "2023.09.18",
    dayOfWeek: "Wednesday",
    startTime: "07:00 PM",
    endTime: "09:00 PM"
  },
  {
    id: 11,
    doctorName: "Dr. Daniel Hernandez",
    specialization: "Gastroenterology",
    recurrence: "Bi-weekly",
    date: "2023.09.19",
    dayOfWeek: "Thursday",
    startTime: "08:00 PM",
    endTime: "10:00 PM"
  },
  {
    id: 12,
    doctorName: "Dr. Maria Lopez",
    specialization: "Rheumatology",
    recurrence: "Monthly",
    date: "2023.09.20",
    dayOfWeek: "Friday",
    startTime: "09:00 PM",
    endTime: "11:00 PM"
  }
  // Add more initial data as needed...
];

export default function TableSort() {
  const [data, setData] = useState<RowData[]>(initialData);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [newRowData, setNewRowData] = useState<RowData>({
    id: null,
    doctorName: "",
    specialization: "",
    recurrence: "",
    date: "",
    dayOfWeek: "",
    startTime: "",
    endTime: ""
  });
  const [editingRowData, setEditingRowData] = useState<RowData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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
    setNewRowData({ id: null, doctorName: "", specialization: "", recurrence: "", date: "", dayOfWeek: "", startTime: "", endTime: "" });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, key: keyof RowData) => {
    setNewRowData({ ...newRowData, [key]: event.target.value });
  };

  const handleSaveNewRow = () => {
    setData([...data, { ...newRowData, id: data.length + 1 }]);
    handleModalClose();
  };

  const handleEditModalOpen = (rowData: RowData) => {
    setEditingRowData(rowData);
    setEditModalOpened(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpened(false);
    setEditingRowData(null);
  };

  const handleEditInputChange = (event: ChangeEvent<HTMLInputElement>, key: keyof RowData) => {
    if (!editingRowData) return;
    setEditingRowData({ ...editingRowData, [key]: event.target.value });
  };

  const handleSaveEditedRow = () => {
    if (!editingRowData) return;
    const updatedData = data.map((row) => {
      if (row.id === editingRowData.id) {
        return { ...row, ...editingRowData };
      }
      return row;
    });
    setData(updatedData);
    handleEditModalClose();
  };

  const handleDeleteRow = (rowToDelete: RowData) => {
    const updatedData = data.filter((row) => row !== rowToDelete);
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
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRows = data.slice(startIndex, endIndex);

  const rows = displayedRows
    .filter((row) =>
      Object.values(row)
        .filter((value) => typeof value === "string")
        .some((value) => value.toLowerCase().includes(search.toLowerCase()))
    )
    .map((row, index) => (
      <Table.Tr key={index}>
        <Table.Td>{row.id}</Table.Td>
        <Table.Td>{row.doctorName}</Table.Td>
        <Table.Td>{row.specialization}</Table.Td>
        <Table.Td>{row.recurrence}</Table.Td>
        <Table.Td>{row.date}</Table.Td>
        <Table.Td>{row.dayOfWeek}</Table.Td>
        <Table.Td>{row.startTime}</Table.Td>
        <Table.Td>{row.endTime}</Table.Td>
        <Table.Td>
          <Group style={{ margin: "-8px -4px" }}>
            <IconPencil
              style={{ width: rem(20), height: rem(20), color: "green", cursor: "pointer" }}
              onClick={() => handleEditModalOpen(row)}
            />
            <IconTrash
              style={{ width: rem(20), height: rem(20), color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteRow(row)}
            />
          </Group>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <div>
      <h1>Schedules</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginRight: '3px' }}>
        <Button onClick={handleModalOpen} style={{ backgroundColor: "#4CAF50" }}>
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
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table>
          <Table.Tbody>
          <Table.Tr>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Schedule ID</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Doctor Name</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Specialization</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Recurrence</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Date</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Day of week</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Start Time</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>End Time</Table.Th>
    <Table.Th style={{ display: 'table-cell', textAlign: 'left', fontWeight: 500, borderBottom: '2px solid #ddd', backgroundColor: '#E6F4EA' }}>Actions</Table.Th>
  </Table.Tr>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text style={{ fontWeight: 500, textAlign: "center" }}>Nothing found</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Modal opened={modalOpened} onClose={handleModalClose} title="Add New Schedule" size="sm">
        <TextInput
          label="Schedule ID"
          value={newRowData.id !== null ? String(newRowData.id) : ""}
          onChange={(event) => handleInputChange(event, "id")}
          style={{ marginBottom: "16px" }}
          type="number"
        />
        <TextInput
          label="Doctor Name"
          value={newRowData.doctorName}
          onChange={(event) => handleInputChange(event, "doctorName")}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Specialization"
          value={newRowData.specialization}
          onChange={(event) => handleInputChange(event, "specialization")}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Recurrence"
          value={newRowData.recurrence}
          onChange={(event) => handleInputChange(event, "recurrence")}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Date"
          value={newRowData.date}
          onChange={(event) => handleInputChange(event, "date")}
          style={{ marginBottom: "16px" }}
          type="date"
        />
        <TextInput
          label="Day of Week"
          value={newRowData.dayOfWeek}
          onChange={(event) => handleInputChange(event, "dayOfWeek")}
          style={{ marginBottom: "16px" }}
        />
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
        <Button onClick={handleSaveNewRow} style={{ backgroundColor: "#4CAF50" }}>
          Save
        </Button>
      </Modal>

      <Modal opened={editModalOpened} onClose={handleEditModalClose} title="Edit Schedule" size="sm">
        {editingRowData && (
          <>
            <TextInput
              label="Doctor Name"
              value={editingRowData.doctorName}
              onChange={(event) => handleEditInputChange(event, "doctorName")}
              style={{ marginBottom: "16px" }}
            />
            <TextInput
              label="Specialization"
              value={editingRowData.specialization}
              onChange={(event) => handleEditInputChange(event, "specialization")}
              style={{ marginBottom: "16px" }}
            />
            <TextInput
              label="Recurrence"
              value={editingRowData.recurrence}
              onChange={(event) => handleEditInputChange(event, "recurrence")}
              style={{ marginBottom: "16px" }}
            />
            <TextInput
              label="Date"
              value={editingRowData.date}
              onChange={(event) => handleEditInputChange(event, "date")}
              style={{ marginBottom: "16px" }}
              type="date"
            />
            <TextInput
              label="Day of Week"
              value={editingRowData.dayOfWeek}
              onChange={(event) => handleEditInputChange(event, "dayOfWeek")}
              style={{ marginBottom: "16px" }}
            />
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
            <Button onClick={handleSaveEditedRow} style={{ backgroundColor: "#4CAF50" }}>
              Save
            </Button>
          </>
        )}
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
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