import "server-only";
import { publicProcedure } from "../../trpc";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { TRPCError } from "@trpc/server";
import { createAppointmentSchema } from "./validation/schema";
import generateUniqueReferenceId from "@/utils/lib/UniqueReferenceIdGenerator";
import dayjs from "dayjs";
import { commonAppointmentRequestPayloadT, SendEmailAppointmentRequestPayloadT, SendMessageAppointmentPayloadT } from "@/utils/types";
import { addQueue_ToSend } from "@/utils/lib/com_queue";


const createAppointment = publicProcedure.input(createAppointmentSchema).mutation(async ({ input, ctx }) => {


    try {

        // Check if the slot is available
        const slot = await ctx.db.slot.findUnique({
            where: {
                id: input.slotId.trim()
            },
            include: {
                availability: true,
                _count: {
                    select: {
                        appointment: true
                    }
                }
            }
        })


        if (!slot) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "The slot is not available",
            })
        }


        const isPetiontHasAppointment = await ctx.db.appointment.findFirst({
            where: {
                appointmentDate: new Date(dayjs(input.AppointmentDate).format("YYYY-MM-DD")).toISOString(),
                Slot: {
                    id: input.slotId.trim()
                },
                patient: {
                    OR: [
                        {
                            NIC: {
                                equals: input.patientNIC && input.patientNIC.trim()
                            }
                        },
                        {
                            Passport: {
                                equals: input.patientPassport && input.patientPassport.trim()
                            }
                        }
                    ]
                }

            }
        })

        if (isPetiontHasAppointment) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "You already have an appointment in this date. Please select another date",
            })
        }


        if (slot.maxAppointmentsPerSlot <= slot._count.appointment) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "the slot is full. Please select another slot.",
            })
        }


        const uniqueId = generateUniqueReferenceId('cloudcare'); // Generate a unique reference id for the appointment

        const slotTimePerAppointment = (new Date(slot.endTime).getTime() - new Date(slot.startTime).getTime()) / slot.maxAppointmentsPerSlot

        const appointment = await ctx.db.appointment.create({
            data: {
                doctor: {
                    connect: {
                        id: slot.availability.doctorId
                    }
                },
                Slot: {
                    connect: {
                        id: input.slotId.trim()
                    }
                },
                schedule: {
                    connect: {
                        id: slot.ScheduleId
                    }
                },
                patient: {
                    connectOrCreate: {
                        where: {
                            NIC: input.patientNIC && input.patientNIC.trim(),
                            Passport: input.patientPassport && input.patientPassport.trim()
                        },

                        create: {
                            title: input.patientTitle,
                            firstName: input.patientFirstName,
                            lastName: input.patientLastName,
                            NIC: input.patientNIC && input.patientNIC.trim(),
                            Passport: input.patientPassport && input.patientPassport.trim(),
                            dateOfBirth: new Date(dayjs(input.patientDob).format("YYYY-MM-DD")).toISOString(),
                            email: input.patientEmail,
                            gender: input.patientGender,
                            address: input.patientAddress,
                            phone: input.patientMobile
                        },
                    }
                },
                appointmentDate: new Date(dayjs(input.AppointmentDate).format("YYYY-MM-DD")).toISOString(),
                patientNote: input.patientNote,
                referenceid: uniqueId,
                appointmentNumber: slot._count.appointment + 1,
                appointmentstart: new Date(new Date(slot.startTime).getTime() + (slotTimePerAppointment * (slot._count.appointment))).toISOString(),
                appointmentEnd: new Date(new Date(slot.startTime).getTime() + (slotTimePerAppointment * (slot._count.appointment + 1))).toISOString(),
                status: "Active"

            },

            include: {
                doctor: {
                    include: {
                        staff: true
                    }
                },
            }
        })

        const notificationpayload: commonAppointmentRequestPayloadT = {
            date: dayjs(appointment.appointmentDate).format("DD/MM/YYYY"),
            doctorName: `${appointment.doctor.staff.title} ${appointment.doctor.staff.firstName} ${appointment.doctor.staff.lastName}`,
            patientName: `${input.patientTitle} ${input.patientFirstName} ${input.patientLastName}`,
            referenceId: appointment.referenceid,
            time: `${dayjs(appointment.appointmentstart).format("hh:mm A")}`,
            type: "booking"
        }


        if (input.patientEmail?.trim()) {
            // Send an email to the patient
            const Emailpayload: SendEmailAppointmentRequestPayloadT = {
                email: input.patientEmail?.trim(),
                ...notificationpayload
            }

            await addQueue_ToSend(Emailpayload, "appointment", "email")

        }
        if (input?.patientMobile?.trim() && input?.patientMobile?.trim().length > 1) {
            // Send an message to the patient
            const Messagepayload: SendMessageAppointmentPayloadT = {
                phoneNumber: input?.patientMobile?.trim(),
                ...notificationpayload
            }

            await addQueue_ToSend(Messagepayload, "appointment", "wp")
        }

        return {
            data: appointment,
            status: 200,
            error: null,
            ok: true,

        }


    } catch (error) {

        throw ErrorHandler(error, "createAppointment", "An error occured while creating an appointment. Please try again later.")


    } finally {

        ctx.db.$disconnect()
    }


})


export default createAppointment