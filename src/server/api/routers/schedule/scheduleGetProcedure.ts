import "server-only";

import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { Prisma, UserRoles } from "@prisma/client";
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


        const scheduleQuery = {
            skip: input.page > 1 ? (input.page - 1) * input.limit : 0,
            take: input.limit + 1,
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
                            search: input.doctorname?.trim().split(" ").join("&")
                        },
                        firstName: {
                            search: input.doctorname?.trim().split(" ").join("&")
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
        } satisfies Prisma.ScheduleFindManyArgs


        const [schedules, count] = await ctx.db.$transaction([
            ctx.db.schedule.findMany(scheduleQuery),
            ctx.db.schedule.count({
                where: scheduleQuery.where
            })
        ])

        let nextCursor: typeof input.cursor | undefined = undefined

        if (schedules.length > input.limit) {
            nextCursor = schedules[schedules.length - 1].id
            schedules.pop()
        }

        return {
            data: schedules,
            pagenation: {
                nextCursor: nextCursor,
                pages: input.page,
                total: count
            },
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