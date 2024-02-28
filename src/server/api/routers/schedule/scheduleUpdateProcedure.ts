import "server-only";


import { protectedProcedure } from "../../trpc";
import { UserRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { ValidateDB } from "./validation/ValidateDB";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { scheduleUpdateProcedureSchema } from "./validation/schema";



const scheduleUpdateProcedure = protectedProcedure.input(scheduleUpdateProcedureSchema).mutation(async ({ input, ctx }) => {

    try {


        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        const schedule = await ctx.db.schedule.findUnique({
            where: {
                id: input.scheduleId
            },
            include: {
                Slot: true,
                Appointment: true,
                _count: {
                    select: {
                        Appointment: true,
                        Slot: true

                    }

                }
            }
        })

        // check is the doctor id is valid
        if (!schedule) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "schedule not found"
            })
        }


        if (schedule.totalAppointment / 5 < input.noOfSlots) {

            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "Number of slots should be less than or equal to max appointments divided by 5"
            })
        }

        if (schedule._count.Slot > input.maxAppointments / 5) {

            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "Number of slots should be less than or equal to max appointments divided by 5"
            })

        }

        if (schedule._count.Appointment > 0) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "cannot update schedule with appointments"
            })
        }

        // check is the doctor already have a schedule for the given date and time if the recurrence is once and it's a new schedule

        const docid = schedule.doctorId
        const date = input.date || schedule.Date
        const startTime = input.startTime || schedule.startTime
        const endTime = input.endTime || schedule.endTime
        const day = input.DayOfWeek || schedule.dayOfWeek

        const Timevalidate = await ValidateDB(docid, date, startTime, endTime, day, true, input.scheduleId)

        if (!Timevalidate) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "cannot update schedule"
            })
        }


        const data = await ctx.db.schedule.update({
            where: {
                id: input.scheduleId
            },
            data: {
                Date: input.date,
                startTime: input.startTime,
                endTime: input.endTime,
                dayOfWeek: input.DayOfWeek,
                ...input.maxAppointments && {
                    totalAppointment: input.maxAppointments,
                    Slot: {
                        deleteMany: {

                        },
                        createMany: {
                            data: Array.from({ length: input.noOfSlots || schedule._count.Slot }, (_, i) => {
                                return {
                                    maxAppointmentsPerSlot: Math.floor(input.maxAppointments / (input.noOfSlots || schedule._count.Slot)),
                                    startTime: new Date(new Date(input.startTime || schedule.startTime).getTime() + (i * 2700000)).toISOString(),
                                    endTime: new Date(new Date(input.endTime || schedule.endTime).getTime() + ((i + 1) * 2700000)).toISOString(),
                                }
                            })
                        }
                    }

                }
            }
        })

        return {
            data: data,
            status: 200,
            error: null,
            ok: true,
        }



    } catch (e) {

        throw ErrorHandler(e, "Schedule")

    } finally {
        ctx.db.$disconnect()
    }










})


export default scheduleUpdateProcedure