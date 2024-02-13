

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
            }

        })

        return {
            data: appointments,
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {
        return ErrorHandler(error, "GetAppointments", "An error occurred while trying to get appointments")
    } finally {
        ctx.db.$disconnect()
    }


})


export default CheckAppointmentProcedure