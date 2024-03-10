import { AppointmentDataType } from "@/utils/types";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import {
  IconCalendarCancel,
  IconCalendarCheck,
  IconCheckbox,
  IconTrash,
} from "@tabler/icons-react";
import { DataTableColumn } from "mantine-datatable";

export const renderActions: DataTableColumn<AppointmentDataType>["render"] = (
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
        disabled={record.status == "Active" || record.status == "Completed"}
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
        disabled={record.status == "Cancelled" || record.status == "Completed"}
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
        disabled={record.status == "Completed"}
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
        onClick={() => {
          return openDeleteModal([record]);
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);
function openEditModal(
  arg0: ({
    patient: {
      id: string;
      title: import("@prisma/client").$Enums.title;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      gender: import("@prisma/client").$Enums.gender;
      email: string;
      phone: string;
      address: string;
      NIC: string;
      Passport: string;
    };
    doctor: {
      staff: {
        title: import("@prisma/client").$Enums.title;
        firstName: string;
        lastName: string;
        image: string;
      };
    };
    Slot: {
      id: string;
      ScheduleId: string;
      maxAppointmentsPerSlot: number;
      startTime: Date;
      endTime: Date;
    };
  } & {
    id: string;
    referenceid: string;
    appointmentNumber: number;
    appointmentDate: Date;
    appointmentstart: Date;
    appointmentEnd: Date;
    createdat: Date;
    updatedat: Date;
    patientNote: string;
    status: import("@prisma/client").$Enums.Appointmentstatus;
    patientId: string;
    doctorId: string;
    nurseId: string;
    oPDId: number;
    scheduleId: string;
    slotId: string;
  })[],
  arg1: string,
): void {
  throw new Error("Function not implemented.");
}
