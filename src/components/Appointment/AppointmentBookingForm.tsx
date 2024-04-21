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
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { DateInput, DateInputFactory } from "@mantine/dates";
import { IconCalendarPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import DoctorSelectAsync from "./DoctorSelect";
import dayjs from "dayjs";
import { useForm, zodResolver } from "@mantine/form";
import { BookAppointmentSchema } from "@/utils/ValidationSchemas/FrontendValidation";
import { FormValues } from "./Types";
import { useApiClient } from "@/utils/trpc/Trpc";
import { notifications } from "@mantine/notifications";
import SuccessFullBook from "./SuccessFullBook";
import getweeknumber from "@/utils/lib/others/getweeknumber";
import { gender, title } from "@/utils/lib/others/person";

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

type AppointmentBookingFormProps = {
  cancel?: () => void;
};

export default function AppointmentBookingForm({
  cancel,
}: AppointmentBookingFormProps) {
  const form = useForm<FormValues>({
    initialValues: {
      patientTitle: "Mr",
      patientFirstName: "",
      patientLastName: "",
      idType: "NIC",
      idNumber: "",
      patientGender: "Male",
      patientDob: null,
      patientAddress: "",
      patientMobile: "",
      patientEmail: "",
      patientNote: "",
      AppointmentDate: null,
      slotId: "",
      docid: "",
    },
    validate: zodResolver(BookAppointmentSchema),
  });

  const {
    isLoading,
    isError,
    isFetching,

    data: schedules,
  } = useApiClient.schedule.getPublic.useQuery(
    {
      doctorId: form.values.docid,
    },
    {
      enabled: !!form.values.docid,
    },
  );

  const {
    mutateAsync,
    reset,
    isLoading: createloading,
    isSuccess: createSuccess,
    data: createdDate,
    isError: createError,
  } = useApiClient.appointment.createAppointment.useMutation();

  const [slot, setSlot] = useState([]);

  /// FUNCTION TO CHECK IF THE DATE IS AN APPOINTMENT DATE OR NOT
  const isAppointmentDate = (date) => {
    const key = dayjs(date).format("YYYY-MM-DD");
    // check for one-time appointments
    if (isFetching || isError) return false;

    if (
      schedules.data.some(
        (item) =>
          item.Date &&
          item.recurrence == "ONCE" &&
          dayjs(item.Date).format("YYYY-MM-DD") === key,
      )
    ) {
      return true;
    }
    // check for weekly appointments
    if (
      schedules.data.some(
        (item) =>
          item.dayOfWeek &&
          item.recurrence === "WEEKLY" &&
          // compare the day of the week of the date with the dayOfWeek property
          dayjs(date).day() ===
            dayjs().day(getweeknumber(item.dayOfWeek)).day() &&
          // check if the date is within the recurrence range
          (!item.endDate || dayjs(date).isBefore(dayjs(item.endDate))) &&
          // check if the date matches the recurringEvery interval
          dayjs(date).diff(dayjs(item.createdDate).startOf("week"), "week") %
            item.recurringEvery ===
            0,
      )
    ) {
      return true;
    }
    // check for monthly appointments
    // if (
    //   schedules.data.some(
    //     (item) =>
    //       item.Date &&
    //       item.recurrence === "MONTHLY" &&
    //       //       // compare the day of the month of the date with the dayOfMonth property
    //       dayjs(date).date() === item.dayOfMonth &&
    //       //       // check if the date is within the recurrence range
    //       (!item.endDate || dayjs(date).isBefore(dayjs(item.endDate))) &&
    //       //       // check if the date matches the recurringEvery interval
    //       dayjs(date).diff(dayjs(item.createdDate), "month") %
    //         item.recurringEvery ===
    //         0,
    //   )
    // ) {
    //   return true;
    // }

    return false;
  };

  /// FUNCTION TO SET SLOT OPTIONS
  const setSlotOptions = () => {
    //  GET THE KEY OF THE SELECTED DATE
    const key = dayjs(form.values.AppointmentDate).format("YYYY-MM-DD");

    if (isFetching || isError) return;

    // FIND THE ITEM THAT MATCHES THE KEY
    const item = schedules.data.filter((item) => {
      if (
        item.Date &&
        item.recurrence == "ONCE" &&
        dayjs(item.Date).isAfter(dayjs()) &&
        dayjs(item.Date).format("YYYY-MM-DD") === key
      ) {
        return true;
      }
      if (
        item.dayOfWeek &&
        item.recurrence === "WEEKLY" &&
        dayjs(form.values.AppointmentDate).day() ===
          dayjs().day(getweeknumber(item.dayOfWeek)).day() &&
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

    type Slottype = (typeof item)[0]["Slot"][0];

    let slotsNoSorted: Slottype[] = [];

    item.map((item) => {
      item.Slot.map((slot) => {
        if (slot._count.appointment < slot.maxAppointmentsPerSlot) {
          slotsNoSorted.push(slot);
        }
      });
    });
    const slotsSorted = slotsNoSorted
      .sort((a, b) => {
        return (a.startTime as any) - (b.startTime as any);
      })
      .map((item) => {
        if (item._count.appointment === item.maxAppointmentsPerSlot) return;
        return {
          label: `${dayjs(item.startTime).format("hh:mm A")} - ${dayjs(
            item.endTime,
          ).format("hh:mm A")} (${item._count.appointment})`,
          value: item.id,
        };
      });

    setSlot(slotsSorted);
    return slotsSorted || [];
  };

  //  FUNCTION TO EXCLUDE NON-APPOINTMENT DATES
  const excludeDate = (date) => {
    return !isAppointmentDate(date);
  };

  const [optionRef, setOptionRef] = useState(false);

  /// FUNCTION TO RESET ALL THE FORM VALUES
  const ALLResetter = () => {
    form.reset();
    reset();
    setOptionRef(true);
    setSlot([]);
  };

  /// FUNCTION TO HANDLE FORM SUBMISSION
  const formsubmitHanlder = async () => {
    console.log(form.values);
    try {
      const createAppointment = await mutateAsync({
        AppointmentDate: form.values.AppointmentDate,
        patientDob: form.values.patientDob,
        patientEmail: form.values.patientEmail,
        patientFirstName: form.values.patientFirstName,
        patientGender: form.values.patientGender === "Male" ? "male" : "female",
        patientLastName: form.values.patientLastName,

        patientNote: form.values.patientNote,
        patientTitle: form.values.patientTitle,
        slotId: form.values.slotId,
        ...(form.values.idType === "NIC"
          ? { patientNIC: form.values.idNumber }
          : { patientPassport: form.values.idNumber }),

        ...(form.values.patientAddress && {
          patientAddress: form.values.patientAddress,
        }),
        ...(form.values.patientMobile && {
          patientMobile: form.values.patientMobile,
        }),
      });
      if (createAppointment && !createError) {
        notifications.show({
          title: "Appointment Booked",
          message: "Your appointment has been booked successfully",
          duration: 5000,
          color: "teal",
          icon: <IconCalendarPlus />,
          iconLabel: "Appointment Booked",
        });
      }
    } catch {}
  };

  return (
    <div className="relative">
      <LoadingOverlay
        visible={createloading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "cyan", type: "bars" }}
      />
      {createSuccess && (
        <SuccessFullBook
          BookedDate={createdDate.data.appointmentDate}
          BookedTime={createdDate.data.appointmentstart}
          cancel={cancel}
          referenceId={createdDate.data.referenceid}
          reset={ALLResetter}
        />
      )}
      <form
        action=""
        onSubmit={form.onSubmit(() => {
          return formsubmitHanlder();
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
            maxDate={new Date()}
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
          <DoctorSelectAsync
            form={form}
            key={createSuccess && createdDate.status}
          />
        </div>
        <div className="flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap">
          <DateInput
            minDate={new Date()}
            size="md"
            excludeDate={excludeDate}
            disabled={!form.values.docid || isFetching}
            classNames={TextInputClasses}
            placeholder="Pick an appointment date"
            rightSection={isFetching && <Loader size={18} />}
            valueFormat="DD MMM YYYY"
            {...form.getInputProps("AppointmentDate")}
          />
          <Select
            size="md"
            placeholder="Your slot"
            key={createSuccess && createdDate.status}
            classNames={TextInputClasses}
            data={slot}
            onDropdownOpen={() => {
              setSlotOptions();
            }}
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
            {...form.getInputProps("patientNote")}
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
    </div>
  );
}
