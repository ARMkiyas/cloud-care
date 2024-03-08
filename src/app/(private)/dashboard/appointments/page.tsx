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
import AppointmentDataTable from "../../componets/AppointmentDataTable";
import AppointmentBookingForm from "@/components/Appointment/AppointmentBookingForm";
import { useApiClient } from "@/utils/trpc/Trpc";

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

  const handleSaveAppointment = () => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === editedAppointment.id ? editedAppointment : appointment,
    );
    setAppointments(updatedAppointments);
    setShowEditModal(false);
  };

  const utils = useApiClient.useUtils();

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  const handleAddAppointment = () => {
    setShowAddModal(true);
  };

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
      <AppointmentDataTable />

      {showAddModal && (
        <Modal
          opened={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            utils.appointment.getAppointments.invalidate();
          }}
          title="Add New Appointment"
          size="lg"
          centered
          transitionProps={{
            transition: "rotate-left",
            duration: 500,
            timingFunction: "ease",
          }}
        >
          <AppointmentBookingForm />
        </Modal>
      )}
    </div>
  );
}
