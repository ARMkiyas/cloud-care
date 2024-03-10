
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";

import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { scheduleGetProcedureSchema } from "./validation/schema";




const GetAppointmentsProcedure = protectedProcedure.input(scheduleGetProcedureSchema).query(async ({ input, ctx }) => {



    try {

        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER) && (ctx.session.user.role !== UserRoles.DOCTOR)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        // allow only doctor to get his schedule
        ctx.session.user.role === UserRoles.DOCTOR ? input.doctorid = ctx.session.user.id : null


        const appointments = await ctx.db.appointment.findMany({
            where: {
                doctorId: {
                    equals: input.doctorid
                },
                referenceid: {
                    contains: input.referenceId
                },
                patient: {
                    firstName: {
                        search: input.patientName
                    },
                    lastName: {
                        search: input.patientName
                    },
                    NIC: {
                        contains: input.patientNIC
                    },
                    Passport: {
                        contains: input.patientPassport
                    },
                    phone: {
                        contains: input.patientMobile
                    },
                    email: {
                        contains: input.patientEmail
                    }


                },
            },
            include: {
                Slot: true,
                patient: true
            }
        })

        return {
            data: appointments,
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {
        console.log(error);
        throw ErrorHandler(error, "GetAppointments", "An error occurred while trying to get appointments")
    } finally {
        ctx.db.$disconnect()
    }


})


export default GetAppointmentsProcedure