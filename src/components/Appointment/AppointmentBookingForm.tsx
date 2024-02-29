"use client";
import {
  TextInput,
  ClassNames,
  TextInputFactory,
  NativeSelect,
  InputBase,
  Textarea,
  Button,
  AutocompleteFactory,
  NativeSelectFactory,
  Select,
  SelectFactory,
} from "@mantine/core";
import { DateInput, DateInputFactory } from "@mantine/dates";
import { IconCalendarPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import DoctorSelectAsync from "./DoctorSelect";
import dayjs from "dayjs";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { BookAppointmentSchema } from "@/utils/ValidationSchemas/FrontendValidation";
import { FormValues } from "./Types";

const sampleData = [
  {
    id: "clskwnyuq000kt56gf8a2n5lb",
    dayOfWeek: null,
    createdDate: new Date(2024, 1, 14, 3, 29), // February 14, 2024 at 03:29
    Date: new Date(2024, 1, 14, 5, 30), // February 14, 2024 at 05:30
    recurrence: "ONCE",
    recurringEvery: 1,
    startTime: new Date(1970, 0, 2, 2, 0), // January 2, 1970 at 02:00
    endTime: new Date(1970, 0, 2, 3, 0), // January 2, 1970 at 03:00
    endDate: null,
    totalAppointment: 20,
    doctorId: "cls3inf74000ffbmgyjtk4lxr",
    OptRoomsid: null,
    doctor: {
      id: "cls3inf74000ffbmgyjtk4lxr",
      staff: {
        title: "Dr",
        firstName: "Robert",
        lastName: "White",
      },
    },
  },
  {
    id: "clskwp91p000ut56g3uqb30qq",
    dayOfWeek: 1,
    createdDate: new Date(2024, 1, 14, 3, 30), // February 14, 2024 at 03:30
    Date: null,
    recurrence: "WEEKLY",
    recurringEvery: 1,
    startTime: new Date(1970, 0, 1, 8, 4), // January 1, 1970 at 08:04
    endTime: new Date(1970, 0, 1, 12, 0), // January 1, 1970 at 12:00
    endDate: null,
    totalAppointment: 20,
    doctorId: "cls3inf74000ffbmgyjtk4lxr",
    OptRoomsid: null,
    doctor: {
      id: "cls3inf74000ffbmgyjtk4lxr",
      staff: {
        title: "Dr",
        firstName: "Robert",
        lastName: "White",
      },
    },
  },
  {
    id: "clskwogoc000pt56gfjiwq10l",
    dayOfWeek: 3,
    createdDate: new Date(2024, 1, 14, 3, 29, 24), // February 14, 2024 at 03:29:24
    Date: null,
    recurrence: "WEEKLY",
    recurringEvery: 1,
    startTime: new Date(1970, 0, 1, 7, 0), // January 1, 1970 at 07:00
    endTime: new Date(1970, 0, 1, 8, 0), // January 1, 1970 at 08:00
    endDate: null,
    totalAppointment: 20,
    doctorId: "cls3inf74000ffbmgyjtk4lxr",
    OptRoomsid: null,
    doctor: {
      id: "cls3inf74000ffbmgyjtk4lxr",
      staff: {
        title: "Dr",
        firstName: "Robert",
        lastName: "White",
      },
    },
  },
];

const title = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof"] as const;
const gender = ["Male", "Female"] as const;

const TextInputClasses: ClassNames<
  | TextInputFactory
  | DateInputFactory
  | AutocompleteFactory
  | NativeSelectFactory
  | SelectFactory
> = {
  input:
    "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
  root: "w-full",
};

export default function AppointmentBookingForm() {
  const [data, setData] = useState(sampleData);

  const form = useForm<FormValues>({
    initialValues: {
      patientTitle: "Mr",
      patientFirstName: undefined,
      patientLastName: undefined,
      idType: "NIC",
      idNumber: undefined,
      patientGender: "Male",
      patientDob: undefined,
      patientAddress: undefined,
      patientMobile: undefined,
      patientEmail: undefined,
      patientProblem: undefined,
      AppointmentDate: undefined,
      slotId: undefined,
      docid: undefined,
    },
    validate: zodResolver(BookAppointmentSchema),
  });

  const isAppointmentDate = (date) => {
    const key = dayjs(date).format("YYYY-MM-DD");
    // check for one-time appointments

    if (
      data.some(
        (item) => item.Date && dayjs(item.Date).format("YYYY-MM-DD") === key,
      )
    ) {
      return true;
    }
    // check for weekly appointments
    if (
      data.some(
        (item) =>
          item.dayOfWeek &&
          item.recurrence === "WEEKLY" &&
          // compare the day of the week of the date with the dayOfWeek property
          dayjs(date).day() === dayjs().day(item.dayOfWeek).day() &&
          // check if the date is within the recurrence range
          (!item.endDate || dayjs(date).isBefore(dayjs(item.endDate))) &&
          // check if the date matches the recurringEvery interval
          dayjs(date).diff(dayjs(item.createdDate).startOf("week"), "week") %
            item.recurringEvery ===
            0,
      )
    ) {
      console.log("weekly");
      return true;
    }
    // check for monthly appointments
    // if (
    //   data.some(
    //     (item) =>
    //       item.dayOfMonth &&
    //       item.recurrence === "MONTHLY" &&
    //       // compare the day of the month of the date with the dayOfMonth property
    //       dayjs(date).date() === item.dayOfMonth &&
    //       // check if the date is within the recurrence range
    //       (!item.endDate || dayjs(date).isBefore(dayjs(item.endDate))) &&
    //       // check if the date matches the recurringEvery interval
    //       dayjs(date).diff(dayjs(item.createdDate), "month") %
    //         item.recurringEvery ===
    //         0,
    //   )
    // ) {
    //   return true;
    // }
    // otherwise, return false
    return false;
  };

  const getId = () => {
    //  GET THE KEY OF THE SELECTED DATE
    const key = dayjs(form.values.AppointmentDate).format("YYYY-MM-DD");

    // FIND THE ITEM THAT MATCHES THE KEY
    const item = data.filter((item) => {
      if (item.Date && dayjs(item.Date).format("YYYY-MM-DD") === key) {
        console.log("once");
        return true;
      }

      if (
        item.dayOfWeek &&
        item.recurrence === "WEEKLY" &&
        dayjs(form.values.AppointmentDate).day() ===
          dayjs().day(item.dayOfWeek).day() &&
        (!item.endDate ||
          dayjs(form.values.AppointmentDate).isBefore(dayjs(item.endDate))) &&
        dayjs(form.values.AppointmentDate).diff(
          dayjs(item.createdDate).startOf("week"),
          "week",
        ) %
          item.recurringEvery ===
          0
      ) {
        return true;
      }

      return false;
    });

    console.log(item);

    // RETURN  THE ITEM
    return item ? item : null;
  };

  //  FUNCTION TO EXCLUDE NON-APPOINTMENT DATES
  const excludeDate = (date) => {
    return !isAppointmentDate(date);
  };

  const formsubmitHanlder = () => {
    const id = getId();

    console.log(form.values);
    console.log(id);
    console.log("submitted");
  };

  return (
    <>
      <form
        action=""
        onSubmit={form.onSubmit(() => {
          formsubmitHanlder();
        })}
      >
        <div className="flex items-stretch justify-between gap-2 max-md:max-w-full max-md:flex-wrap">
          <NativeSelect
            size="md"
            classNames={{
              input:
                "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
              root: "w-[40%]",
            }}
            data={title}
            {...form.getInputProps("patientTitle")}
          />
          <TextInput
            size="md"
            placeholder="First Name"
            classNames={TextInputClasses}
            {...form.getInputProps("patientFirstName")}
          />
          <TextInput
            size="md"
            placeholder="Last Name"
            classNames={TextInputClasses}
            {...form.getInputProps("patientLastName")}
          />
        </div>
        <div className="flex items-start justify-between gap-4 mt-4 max-md:max-w-full max-md:flex-wrap ">
          <NativeSelect
            size="md"
            classNames={{
              input:
                "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
              root: "w-[40%]",
            }}
            data={["NIC", "Passport"]}
            {...form.getInputProps("idType")}
          />
          <TextInput
            size="md"
            placeholder="Your ID Number"
            classNames={TextInputClasses}
            {...form.getInputProps("idNumber")}
          />
        </div>
        <div className="flex items-stretch justify-between gap-3.5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <NativeSelect
            size="md"
            classNames={{
              input:
                "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
              root: "w-[40%]",
            }}
            data={gender}
            {...form.getInputProps("patientGender")}
          />
          <DateInput
            size="md"
            placeholder="Date of Birth"
            classNames={TextInputClasses}
            {...form.getInputProps("patientDob")}
          />
        </div>
        <div className="flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap">
          {/* <NativeSelect
            size="md"
            classNames={{
              input:
                "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
              root: "w-[40%]",
            }}
            data={countryCode}
          /> */}
          <TextInput
            size="md"
            placeholder="Email Address"
            classNames={TextInputClasses}
            {...form.getInputProps("patientEmail")}
          />
          <InputBase
            component={IMaskInput}
            mask="+94 (000) 000-0000"
            size="md"
            placeholder="Your Phone Number (optional)"
            classNames={TextInputClasses}
            {...form.getInputProps("patientMobile", {
              type: "input",
            })}
          />
        </div>
        <div className="flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap">
          <TextInput
            size="md"
            placeholder="Your Address (Optional)"
            classNames={TextInputClasses}
            {...form.getInputProps("patientAddress")}
          />
        </div>
        <div className="flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap">
          <DoctorSelectAsync form={form} />
        </div>
        <div className="flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap">
          <DateInput
            minDate={new Date()}
            size="md"
            excludeDate={excludeDate}
            disabled={!form.values.docid}
            classNames={TextInputClasses}
            placeholder="Pick an appointment date"
            valueFormat="DD MMM YYYY"
            {...form.getInputProps("AppointmentDate")}
          />
          <Select
            size="md"
            placeholder="Your slot"
            classNames={TextInputClasses}
            data={[
              {
                label: " 08:00 AM - 09:00 AM",
                value: "clskwnyuq000kt56gf8a2n5lb",
              },
            ]}
            disabled={!form.values.docid || !form.values.AppointmentDate}
            {...form.getInputProps("slotId")}
          />
        </div>

        <div className="mt-5 ">
          <Textarea
            size="md"
            placeholder="Describe your problem (Optional)"
            classNames={{
              input: "",
              root: "w-full",
            }}
            minRows={5}
            maxRows={6}
            {...form.getInputProps("patientProblem")}
          />
        </div>
        <div className="mt-8">
          <Button
            leftSection={<IconCalendarPlus />}
            fullWidth
            type="submit"
            size="lg"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Book Appointment
          </Button>
        </div>
      </form>
    </>
  );
}
