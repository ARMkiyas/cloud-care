
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { EditAppointmentProcedureSchema } from "./validation/schema";
import { assert, count } from "console";
import { appointmentNotificationT, commonAppointmentRequestPayloadT, SendEmailAppointmentRequestPayloadT, SendMessageAppointmentPayloadT } from "@/utils/types";
import dayjs from "dayjs";
import { addQueue_ToSend } from "@/utils/lib/com_queue";



const EditAppointmentProcedure = protectedProcedure.input(EditAppointmentProcedureSchema).mutation(async ({ input, ctx }) => {


    try {
        if ((ctx.session.user.role !== UserRoles.ROOTUSER) && !(ctx.session.user?.Permissions?.includes("APPOINTMENTS_EDIT"))) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        // if (ctx.session.user.role === UserRoles.DOCTOR) {
        //     const checkitDoctorsAppointment = await ctx.db.appointment.findFirst({
        //         where: {
        //             id: {
        //                 equals: input.appointmentId.trim()
        //             },
        //             doctorId: {
        //                 equals: ctx.session.user.id.trim()
        //             }
        //         }
        //     })

        //     if (!checkitDoctorsAppointment) {
        //         throw new TRPCError({
        //             code: "UNPROCESSABLE_CONTENT",
        //             message: "appointment not found"
        //         })
        //     }
        // }



        const appointment = await ctx.db.$transaction(
            input.data.map((item) => {
                return ctx.db.appointment.update({
                    where: {
                        id: item.id

                    },
                    data: {
                        status: item.status,
                    },
                    include: {
                        doctor: {
                            select: {
                                staff: {
                                    select: {
                                        title: true,
                                        firstName: true,
                                        lastName: true
                                    }
                                }
                            }
                        },
                        patient: {
                            select: {
                                title: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                phone: true
                            }
                        }
                    }
                })

            })


        )





        if (appointment.length <= 0) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "appointment is not found or already updated"
            })

        }



        // sending notification 



        appointment.map(async (item) => {
            let payload = {
                date: dayjs(item.appointmentDate).format("DD/MM/YYYY"),
                doctorName: `${item.doctor.staff.title} ${item.doctor.staff.firstName} ${item.doctor.staff.lastName}`,
                patientName: `${item.patient.title} ${item.patient.title} ${item.patient.lastName}`,
                referenceId: item.referenceid,
                time: `${dayjs(item.appointmentstart).format("hh:mm A")}`,
                type: item.status === "Active" ? "rescheduled" : item.status === "Cancelled" ? "cancelled" : item.status === "Completed" ? "completed" : "booking" as appointmentNotificationT
            }

            if (item.patient.email?.trim()) {
                // Send an email to the patient
                const Emailpayload: SendEmailAppointmentRequestPayloadT = {
                    email: item.patient.email?.trim(),
                    ...payload
                }

                await addQueue_ToSend(Emailpayload, "appointment", "email")

            }

            if (item.patient.phone?.trim()) {
                // Send an email to the patient
                const Emailpayload: SendMessageAppointmentPayloadT = {
                    phoneNumber: item.patient.phone?.trim(),
                    ...payload
                }

                await addQueue_ToSend(Emailpayload, "appointment", "wp")

            }



        })





        return {
            data: {
                count: appointment.length,
                message: "appointment updated successfully"
            },
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {
        console.log(error);

        throw ErrorHandler(error, "Update Appointment", "An error occurred while trying to delete appointment")
    } finally {
        ctx.db.$disconnect()
    }




})


export default EditAppointmentProcedure