import { Badge, Button, Chip, Divider, Overlay, Text } from "@mantine/core";
import React from "react";
import AnimatedCheck from "../icon/animatedCheck/AnimatedCheck";
import {
  IconCalendarCheck,
  IconCalendarClock,
  IconCalendarDot,
  IconCalendarOff,
  IconCalendarSearch,
  IconCircleCheck,
  IconListSearch,
  IconStethoscope,
  IconUser,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";
import { TAppointmentsCheck } from "@/server/api/ApiTypeFactory";

type dataT = TAppointmentsCheck["data"];

type SuccessFullBookprops = {
  BookedDate: Date;
  BookedTime: Date;
  referenceId: string;
  doctorName: string;
  doctorSpecialization: string;
  patientName: string;
  patientNIC: string;
  patientPassport: string;
  appointmentNumber: number;
  status: dataT["status"];
  cancel?: () => void;
  reset?: () => void;
};

export default function AppointmentCheckOverlay({
  BookedDate,
  BookedTime,
  appointmentNumber,
  doctorName,
  doctorSpecialization,
  patientNIC,
  patientName,
  status,
  patientPassport,
  referenceId,
  cancel,
  reset,
}: SuccessFullBookprops) {
  return (
    <div className="z-50 flex flex-col items-center justify-center w-full h-full p-0 m-0 overflow-auto ">
      <Text
        size="lg"
        className="font-bold leading-10 text-blue-950 animate-fade animate-ease-in"
      >
        Your appointment details
      </Text>

      <div className="flex flex-col w-full p-3 space-y-4  justify-evenly animate-fade animate-ease-in animate-delay-[200ms]">
        <div className="flex space-x-3">
          <IconStethoscope className="h-full text-emerald-600" size={32} />
          <div className="">
            <Text size="xs" className="text-slate-600">
              Doctor name
            </Text>
            <div className="inline-flex space-x-3">
              <Text size="sm" className="capitalize">
                {doctorName}
              </Text>
              <Divider orientation="vertical" />
              <Text size="sm" className="capitalize">
                {doctorSpecialization
                  .split("_")
                  .join(" ")
                  .toLocaleLowerCase() || ""}
              </Text>
            </div>
          </div>
        </div>
        <Divider orientation="horizontal" />
        <div className="flex space-x-3">
          <IconUser className="h-full text-emerald-600" size={32} />
          <div className="">
            <Text size="xs" className="text-slate-600">
              Patient
            </Text>

            <div className="inline-flex space-x-3">
              <Text size="sm" className="capitalize">
                {patientName}
              </Text>
              <Divider orientation="vertical" />
              <Text size="sm" className="capitalize">
                {patientNIC
                  ? `NIC: ${patientNIC}`
                  : `Passport: ${patientPassport}`}
              </Text>
            </div>
          </div>
        </div>
        <Divider orientation="horizontal" />
        <div className="flex space-x-3">
          <IconCalendarClock className="h-full text-emerald-600" size={32} />
          <div className="">
            <Text size="xs" className="text-slate-600">
              Date, Time & Number
            </Text>
            <div className="inline-flex space-x-3">
              <Text size="sm">{dayjs(BookedDate).format("YYYY-MM-DD")}</Text>
              <Divider orientation="vertical" />
              <Text size="sm">{dayjs(BookedTime).format("hh:mm A")}</Text>
              <Divider orientation="vertical" />
              <Text size="sm">{appointmentNumber}</Text>
            </div>
          </div>
        </div>
        <Divider orientation="horizontal" />
        <div className="flex space-x-3">
          <IconCalendarSearch className="h-full text-emerald-600" size={32} />
          <div>
            <Text size="xs" className="text-slate-600">
              Reference Id
            </Text>
            <Text size="sm">{referenceId}</Text>
          </div>
        </div>
        <Divider orientation="horizontal" />
        <div className="flex space-x-3">
          {status === "Active" ? (
            <IconCalendarDot className="h-full text-emerald-600" size={32} />
          ) : status === "Cancelled" ? (
            <IconCalendarOff className="h-full text-red-600" size={32} />
          ) : (
            <IconCalendarCheck className="h-full text-indigo-600" size={32} />
          )}

          <div>
            <Text size="xs" className="text-slate-600">
              Status
            </Text>

            <Text size="sm" mt={2}>
              <Badge
                color={
                  status == "Active"
                    ? "green"
                    : status == "Completed"
                    ? "indigo"
                    : status == "Cancelled"
                    ? "red"
                    : "gray"
                }
              >
                {status}
              </Badge>
            </Text>
          </div>
        </div>
      </div>

      <div className="mt-6 space-x-3 animate-fade animate-ease-in">
        <Button
          variant="filled"
          color="teal"
          onClick={() => {
            reset();
          }}
        >
          Check Another Appointment
        </Button>

        {cancel ? (
          <Button variant="outline" color="red" onClick={() => cancel()}>
            Cancel
          </Button>
        ) : (
          <Button variant="outline" color="teal" component={Link} href={"/"}>
            Back to Home
          </Button>
        )}
      </div>
    </div>
  );
}
