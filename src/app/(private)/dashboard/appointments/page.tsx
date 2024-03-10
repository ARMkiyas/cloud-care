"use client";
import React from "react";
import { Button } from "@mantine/core";

import { Modal } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";

import { useApiClient } from "@/utils/trpc/Trpc";
import AppointmentDataTable from "../../componets/AppointmentDataTable/AppointmentDataTable";
import AppointmentBookingForm from "@/components/Appointment/AppointmentBookingForm";

export default function TableReviews() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const utils = useApiClient.useUtils();

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
          <AppointmentBookingForm
            cancel={() => {
              setShowAddModal(false);
              utils.appointment.getAppointments.invalidate();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
