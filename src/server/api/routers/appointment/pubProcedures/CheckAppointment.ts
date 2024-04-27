

import "server-only";
import { publicProcedure } from "@/server/api/trpc";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { CheckAppointmentProcedureSchema } from "../validation/schema";




const CheckAppointmentProcedure = publicProcedure.input(CheckAppointmentProcedureSchema).mutation(async ({ input, ctx }) => {



    try {

        const appointments = await ctx.db.appointment.findFirst({
            where: {
                AND: {
                    referenceid: {
                        equals: input.referenceId && input.referenceId.trim()
                    },
                    patient: {
                        NIC: {
                            equals: input.patientNIC && input.patientNIC.trim()
                        },
                        Passport: {
                            equals: input.patientPassport && input.patientPassport.trim()
                        }

                    }
                }
            },
            include: {
                patient: {
                    select: {
                        title: true,
                        firstName: true,
                        lastName: true,
                        NIC: true,
                        Passport: true,

                    }
                },
                doctor: {
                    select: {
                        staff: {
                            select: {
                                title: true,
                                firstName: true,
                                lastName: true,
                            },

                        },
                        specialization: true,
                    }
                }
            }


        })



        const responsedata = {
            doctor: {
                name: `${appointments.doctor.staff.title} ${appointments.doctor.staff.firstName} ${appointments.doctor.staff.lastName}`,
                docspecialization: appointments.doctor.specialization,
            },
            patient: {
                name: `${appointments.patient.title} ${appointments.patient.firstName} ${appointments.patient.lastName}`,
                NIC: appointments.patient.NIC,
                Passport: appointments.patient.Passport,
            },
            referenceId: appointments.referenceid,
            date: appointments.appointmentDate,
            time: appointments.appointmentstart,
            number: appointments.appointmentNumber,
            status: appointments.status,
            created: appointments.createdat,
            updated: appointments.updatedat,

        }

        return {
            data: responsedata,
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {
        throw ErrorHandler(error, "GetAppointments", "An error occurred while trying to get appointments")
    } finally {
        ctx.db.$disconnect()
    }


})


export default CheckAppointmentProcedure