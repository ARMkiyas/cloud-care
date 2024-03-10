
import "server-only";
import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { DayOfWeek, DoctorSpecialization, RecurrencePattern, UserRoles } from "@prisma/client";

const GetScheduledDocsProcedureSchema = z.object({

    docnmae: z.string().nonempty().optional(),
})


import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { publicProcedure } from "@/server/api/trpc";

const GetScheduledDocs = publicProcedure.input(GetScheduledDocsProcedureSchema).query(async ({ input, ctx }) => {

    try {



        const doctors = await ctx.db.doctor.findMany({
            where: {

                schedules: {
                    some: {
                    }
                }
            },
            include: {
                staff: {
                    select: {
                        title: true,
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                },

            }

        })


        const response = doctors.map((doc) => {
            return {
                id: doc.id,
                title: doc.staff.title,
                firstName: doc.staff.firstName,
                lastName: doc.staff.lastName,
                image: doc.staff.image,
                specialization: doc.specialization
            }
        })

        return {
            data: response,
            status: 200,
            error: null,
            ok: true,
        }




    } catch (error) {



        throw ErrorHandler(error, "schedule", "Error getting schedule")
    } finally {
        ctx.db.$disconnect()
    }




})


export default GetScheduledDocs