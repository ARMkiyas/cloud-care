"use client";
import React from "react";
import {
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  Button,
  Checkbox,
} from "@mantine/core";
import classes from "./TableReviews.module.css";
import { Grid, Skeleton, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { Paper } from "@mantine/core";
import {
  IconCircleCheck,
  IconClock,
  IconDotsVertical,
  IconTrash,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";

const initialAppointments = [
  {
    id: 1,
    patientId: "6",
    date: "2024-02-14",
    time: "10:00 AM",
    patientName: "Aisha",
    status: "waiting",
  },
  {
    id: 2,
    patientId: "7",
    date: "2024-02-14",
    time: "11:00 AM",
    patientName: "Poorni",
    status: "scheduled",
  },
  {
    id: 3,
    patientId: "39",
    date: "2024-02-14",
    time: "12:00 PM",
    patientName: "Hansini",
    status: "waiting",
  },
  {
    id: 4,
    patientId: "56",
    date: "2024-02-14",
    time: "01:00 PM",
    patientName: "Nethra",
    status: "scheduled",
  },
  {
    id: 5,
    patientId: "58",
    date: "2024-02-14",
    time: "02:00 PM",
    patientName: "Rashini",
    status: "waiting",
  },
  {
    id: 6,
    patientId: "58",
    date: "2024-02-14",
    time: "03:00 PM",
    patientName: "Chandula",
    status: "scheduled",
  },
  {
    id: 7,
    patientId: "6",
    date: "2024-02-14",
    time: "10:00 AM",
    patientName: "Aisha",
    status: "waiting",
  },
  {
    id: 8,
    patientId: "6",
    date: "2024-02-14",
    time: "10:00 AM",
    patientName: "Aisha",
    status: "waiting",
  },
  {
    id: 9,
    patientId: "6",
    date: "2024-02-14",
    time: "10:00 AM",
    patientName: "Aisha",
    status: "waiting",
  },
  {
    id: 10,
    patientId: "6",
    date: "2024-02-14",
    time: "10:00 AM",
    patientName: "Aisha",
    status: "waiting",
  },
];

export default function TableReviews() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [editedAppointment, setEditedAppointment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    patientName: "",
    date: "",
    time: "",
    status: "",
  });
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEditAppointment = (index) => {
    setEditedAppointment(appointments[index]);
    setShowEditModal(true);
  };

  const handleSaveAppointment = () => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === editedAppointment.id ? editedAppointment : appointment,
    );
    setAppointments(updatedAppointments);
    setShowEditModal(false);
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  const handleAddAppointment = () => {
    setShowAddModal(true);
  };

  const handleSaveNewAppointment = () => {
    if (
      newAppointment.patientId &&
      newAppointment.patientName &&
      newAppointment.date &&
      newAppointment.time &&
      newAppointment.status
    ) {
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        {
          id: prevAppointments.length + 1,
          ...newAppointment,
        },
      ]);
      setShowAddModal(false);
      setNewAppointment({
        patientId: "",
        patientName: "",
        date: "",
        time: "",
        status: "",
      });
      setValidationError("");
    } else {
      setValidationError("Please fill all fields");
    }
  };

  const rows = appointments.map((appointment, index) => (
    <Table.Tr key={appointment.id}>
      <Table.Td>
        <input type="checkbox" aria-label="Select row" />
      </Table.Td>
      <Table.Td>{appointment.patientId}</Table.Td>
      <Table.Td>{appointment.patientName}</Table.Td>
      <Table.Td>{appointment.time}</Table.Td>
      <Table.Td>{appointment.date}</Table.Td>
      <Table.Td>
        {appointment.status === "waiting" ? (
          <>
            <IconClock size={20} color="red" />
            <span style={{ marginLeft: 5 }}>Waiting</span>
          </>
        ) : (
          <>
            <IconCircleCheck size={20} color="green" />
            <span style={{ marginLeft: 5 }}>Scheduled</span>
          </>
        )}
      </Table.Td>
      <Table.Td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconPencil
            size={20}
            color="green"
            style={{ cursor: "pointer" }}
            onClick={() => handleEditAppointment(index)}
          />
          <IconTrash
            size={20}
            color="red"
            style={{ marginLeft: 5, cursor: "pointer" }}
            onClick={() => handleDeleteAppointment(index)}
          />
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Appointments</h1>
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        <span>
          {currentDateTime.toLocaleDateString()},{" "}
          <strong>{currentDateTime.toLocaleTimeString()}</strong>
        </span>
        &nbsp;&nbsp;&nbsp;
        <Button color="green" onClick={handleAddAppointment}>
          Add New Appointment
        </Button>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Patient ID</Table.Th>
            <Table.Th>Patient Name</Table.Th>
            <Table.Th>Time</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {showEditModal && (
        <Modal
          opened={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Appointment"
          size="sm"
        >
          <div>
            <TextInput
              value={editedAppointment.patientId}
              onChange={(event) =>
                setEditedAppointment({
                  ...editedAppointment,
                  patientId: event.currentTarget.value,
                })
              }
              label="Patient ID"
            />
            <TextInput
              value={editedAppointment.patientName}
              onChange={(event) =>
                setEditedAppointment({
                  ...editedAppointment,
                  patientName: event.currentTarget.value,
                })
              }
              label="Patient Name"
            />
            <TextInput
              value={editedAppointment.date}
              onChange={(event) =>
                setEditedAppointment({
                  ...editedAppointment,
                  date: event.currentTarget.value,
                })
              }
              label="Date"
            />
            <TextInput
              value={editedAppointment.time}
              onChange={(event) =>
                setEditedAppointment({
                  ...editedAppointment,
                  time: event.currentTarget.value,
                })
              }
              label="Time"
            />
            <TextInput
              value={editedAppointment.status}
              onChange={(event) =>
                setEditedAppointment({
                  ...editedAppointment,
                  status: event.currentTarget.value,
                })
              }
              label="Status"
            />
            <Button
              color="green"
              onClick={handleSaveAppointment}
              style={{ marginTop: "20px", marginRight: "10px" }}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}

      {showAddModal && (
        <Modal
          opened={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Appointment"
          size="sm"
        >
          <div>
            <TextInput
              value={newAppointment.patientId}
              onChange={(event) =>
                setNewAppointment({
                  ...newAppointment,
                  patientId: event.currentTarget.value,
                })
              }
              label="Patient ID"
            />
            <TextInput
              value={newAppointment.patientName}
              onChange={(event) =>
                setNewAppointment({
                  ...newAppointment,
                  patientName: event.currentTarget.value,
                })
              }
              label="Patient Name"
            />
            <TextInput
              value={newAppointment.date}
              onChange={(event) =>
                setNewAppointment({
                  ...newAppointment,
                  date: event.currentTarget.value,
                })
              }
              label="Date"
            />
            <TextInput
              value={newAppointment.time}
              onChange={(event) =>
                setNewAppointment({
                  ...newAppointment,
                  time: event.currentTarget.value,
                })
              }
              label="Time"
            />
            <TextInput
              value={newAppointment.status}
              onChange={(event) =>
                setNewAppointment({
                  ...newAppointment,
                  status: event.currentTarget.value,
                })
              }
              label="Status"
            />
            <Button
              color="green"
              onClick={handleSaveNewAppointment}
              style={{ marginTop: "20px", marginRight: "10px" }}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
