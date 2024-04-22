"use client";

import React from "react";

import "../book/BookPageStyles.css";
import AppointmentContactCard from "../../components/AppointmentContactCard";
import PubPageTopContainer from "../../components/PubPageTopContainer";
import {
  Button,
  InputBase,
  NativeSelect,
  Space,
  TextInput,
  Text,
} from "@mantine/core";
import { IMaskInput } from "react-imask";
import { IconCalendarSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useForm, zodResolver } from "@mantine/form";
import { useApiClient } from "@/utils/trpc/Trpc";
import { notifications } from "@mantine/notifications";
import AppointmentCheckOverlay from "@/components/Appointment/AppointmentChecOverlay";
import dayjs from "dayjs";

import type { TAppointmentsCheck } from "@server/api/ApiTypeFactory";
import { z } from "zod";

type forminitvalues = {
  idtype: "NIC" | "Passport";
  idnumber: string;
  referenceId: string;
};

type dataT = TAppointmentsCheck["data"];

const formvalidation = z.object({
  idtype: z.union([z.literal("NIC"), z.literal("Passport")]),
  idnumber: z.string().min(1, "Id is Required"),
  referenceId: z
    .string()
    .regex(/^cloudcare-\w{8}-\w{4}$/, "Invalid Reference ID"),
});

export default function page() {
  const form = useForm<forminitvalues>({
    initialValues: {
      idtype: "NIC",
      idnumber: "",
      referenceId: "",
    },
    validate: zodResolver(formvalidation),
  });

  const {
    mutate,
    data: checkData,
    isLoading,
    reset: mutateReset,
  } = useApiClient.appointment.CheckAppointment.useMutation({
    onSuccess: (data) => {
      notifications.show({
        message: "Appointment Found",
        color: "teal",
      });
    },

    onError(error, variables, context) {
      notifications.show({
        message: "Appointment Not Found",
        color: "red",
      });
    },
  });

  async function formsubmitHanlder() {
    try {
      const response = await mutate({
        ...(form.values.idtype === "NIC"
          ? { patientNIC: form.values.idnumber }
          : { patientPassport: form.values.idnumber }),
        referenceId: form.values.referenceId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const reset = () => {
    form.reset();
    mutateReset();
  };

  return (
    <div>
      <PubPageTopContainer
        title="Check Your Appointment"
        path={["Home", "Appointment", "Check Your Appointment"]}
      />
      <div className="mainContainer">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex flex-col grow max-md:max-w-full max-md:mt-10">
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                Appointment
              </div>
              <div className="max-w-[593px] text-blue-950 text-4xl font-bold leading-10 self-stretch mr-5 mt-4 max-md:max-w-full max-md:mr-2.5">
                Check Your Appointment To Visi
                <br />
                Our Doctor
              </div>
              <div className="self-stretch mt-6 text-base leading-6 text-neutral-400 max-md:max-w-full">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam
                <br />
                et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit
                clita duo justo magna
                <br />
                dolore erat amet
              </div>
              <AppointmentContactCard />
            </div>
          </div>

          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-center self-stretch justify-center w-full px-10 py-12 rounded-lg bg-blue-50 grow max-md:max-w-full max-md:mt-10 max-md:px-5 ">
              {checkData && (
                <AppointmentCheckOverlay
                  doctorName={checkData.data.doctor.name}
                  doctorSpecialization={checkData.data.doctor.docspecialization}
                  patientName={checkData.data.patient.name}
                  patientNIC={checkData.data.patient.NIC}
                  patientPassport={checkData.data.patient.Passport}
                  appointmentNumber={checkData.data.number}
                  BookedDate={dayjs(checkData.data.date).toDate()}
                  BookedTime={dayjs(checkData.data.time).toDate()}
                  referenceId={checkData.data.referenceId}
                  reset={reset}
                  status={checkData.data.status as dataT["status"]}
                />
              )}

              <form
                className={`items-start self-stretch  text-gray-500 justify-centertext-base whitespace-nowrap max- d:max-w-full max-md:pr-5  animate-fade animate-ease-in  ${
                  checkData && "hidden"
                }`}
                onSubmit={form.onSubmit(() => {
                  return formsubmitHanlder();
                })}
              >
                <div className="space-y-10">
                  <div>
                    <div className="flex items-start gap-4 mt-4 max-md:max-w-full max-md:flex-wrap ">
                      <NativeSelect
                        size="lg"
                        classNames={{
                          input:
                            "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
                          root: "w-[30%]",
                        }}
                        data={["NIC", "Passport"]}
                        {...form.getInputProps("idtype")}
                      />
                      <TextInput
                        size="lg"
                        placeholder="Your ID Number"
                        classNames={{
                          input:
                            "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
                          root: "w-full",
                        }}
                        {...form.getInputProps("idnumber")}
                      />
                    </div>

                    <div className="flex items-start gap-4 mt-4 max-md:max-w-full max-md:flex-wrap ">
                      <InputBase
                        component={IMaskInput}
                        mask="cloudc\are-[********]-[****]"
                        size="lg"
                        placeholder="Your Referance Id"
                        classNames={{
                          input:
                            "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
                          root: "w-full",
                        }}
                        {...form.getInputProps("referenceId", {
                          type: "input",
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <Button
                      leftSection={<IconCalendarSearch />}
                      loading={isLoading}
                      loaderProps={{
                        type: "dots",
                      }}
                      fullWidth
                      type="submit"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 90 }}
                    >
                      Check Appointment
                    </Button>
                    <div className="mt-3">
                      <Link
                        href={"/appointment/book"}
                        className="no-underline "
                      >
                        <Text size="xs" c="dimmed">
                          If you haven&#39;t Booked an appointment, click here
                          to book one
                        </Text>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
