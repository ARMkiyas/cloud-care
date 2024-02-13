import "server-only";
import { publicProcedure } from "../../trpc";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { TRPCError } from "@trpc/server";
import { createAppointmentSchema } from "./validation/schema";


function generateUniqueReferenceId(prefix: string = 'cloudcare'): string {
    const timestamp = Date.now().toString(36); // Base 36 for compactness
    const randomSuffix = Math.random().toString(36).substring(2, 6); // First 2 chars are redundant
    return `${prefix}-${timestamp}-${randomSuffix}`;
}


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
            return new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "The slot is not available",
            })
        }


        const isPetiontHasAppointment = await ctx.db.appointment.findFirst({
            where: {
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
            return new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "You already have an appointment for this slot",
            })
        }


        if (slot.maxAppointmentsPerSlot <= slot._count.appointment) {
            return new TRPCError({
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
                            dateOfBirth: input.patientDob,
                            email: input.patientEmail,
                            gender: input.patientGender,
                            address: input.patientAddress,
                            phone: input.patientMobile
                        },
                    }
                },
                referenceid: uniqueId,
                appointmentNumber: slot._count.appointment + 1,
                appointmentstart: new Date(new Date(slot.startTime).getTime() + (slotTimePerAppointment * (slot._count.appointment))).toISOString(),
                appointmentEnd: new Date(new Date(slot.startTime).getTime() + (slotTimePerAppointment * (slot._count.appointment + 1))).toISOString(),
                status: "Pending"

            }
        })






        return {
            data: appointment,
            status: 200,
            error: null,
            ok: true,

        }










    } catch (error) {

        console.log(error);

        return ErrorHandler(error, "createAppointment", "An error occured while creating an appointment. Please try again later.")


    }


})


export default createAppointment