import "server-only";

import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";
import { scheduleGetProcedureSchema } from "./validation/schema";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";

const scheduleGetProcedure = protectedProcedure.input(scheduleGetProcedureSchema).query(async ({ input, ctx }) => {

    try {


        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER) && (ctx.session.user.role !== UserRoles.DOCTOR)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        // allow only doctor to get his schedule
        ctx.session.user.role === UserRoles.DOCTOR ? input.doctorId = ctx.session.user.id : null


        const schedules = await ctx.db.schedule.findMany({
            where: {
                doctorId: {
                    equals: input.doctorId
                },
                id: {
                    equals: input.scheduleId
                },
                Date: {
                    equals: input.date
                },
                recurrence: {
                    equals: input.getRecurrence
                },
                dayOfWeek: {
                    equals: input.DayOfWeek
                },
                doctor: {
                    staff: {
                        lastName: {
                            search: input.doctorname
                        },
                        firstName: {
                            search: input.doctorname
                        }
                    }
                }
            },
            include: {
                doctor: {

                    select: {
                        id: true,
                        specialization: true,
                        staff: {
                            select: {
                                firstName: true,
                                lastName: true,
                                title: true,
                                image: true,

                            }
                        }
                    }

                },

                Slot: true,
                Appointment: true,
                _count: {
                    select: {
                        Appointment: true,
                        Slot: true,
                    }

                },
            },
        })

        return {
            data: schedules,
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


export default scheduleGetProcedure