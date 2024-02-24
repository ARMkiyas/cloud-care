import "server-only"
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { DayOfWeek, RecurrencePattern, UserRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { scheduleCreateProcedureSchema } from "./validation/schema";
import { ValidateDB } from "./validation/ValidateDB";



const scheduleCreateProcedure = protectedProcedure.input(scheduleCreateProcedureSchema).mutation(async ({ input, ctx }) => {
    try {
        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }

        //check is the doctor id is valid 

        const doctor = await ctx.db.doctor.findUnique({
            where: {
                id: input.doctorId
            }

        })

        if (!doctor) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "Invalid doctor id"
            })
        }


        //check is the opd room id is valid

        if (input.opdRoomid) {
            const opdRoom = await ctx.db.optRooms.findUnique({
                where: {
                    id: input.opdRoomid
                }
            })

            if (!opdRoom) {
                throw new TRPCError({
                    code: "UNPROCESSABLE_CONTENT",
                    message: "Invalid opd room id"
                })
            }

        }




        // const date = new Date(RecurrencePattern.ONCE ? input.once.date : input.recurrence === RecurrencePattern.WEEKLY ? input.weekly.startDate : input.monthly.date).getDay()
        // if (date === 0 || date === 6 || input.weekly.day === DayOfWeek.SATURDAY || input.weekly.day === DayOfWeek.SUNDAY || input.monthly.date.getDay() === 0 || input.monthly.date.getDay() === 6){
        //     throw new TRPCError({
        //         code: "UNPROCESSABLE_CONTENT",
        //         message: "Doctor can't have a schedule on Sunday or Saturday"
        //     })
        // }


        // check is the doctor already have a schedule for the given date and time if the recurrence is once and it's a new schedule


        const starttime = input.recurrence === RecurrencePattern.ONCE ? input.once.startTime : input.recurrence === RecurrencePattern.WEEKLY ? input.weekly.startTime : input.monthly.startTime;
        const endtime = input.recurrence === RecurrencePattern.ONCE ? input.once.endTime : input.recurrence === RecurrencePattern.WEEKLY ? input.weekly.endTime : input.monthly.endTime
        const date = input.recurrence === RecurrencePattern.ONCE ? input.once.date : input.recurrence === RecurrencePattern.WEEKLY ? input.weekly.startDate : input.monthly.date
        const dayofweek = input.recurrence === RecurrencePattern.ONCE ? Object.values(DayOfWeek)[new Date(input.once.date).getDay()] : input.recurrence === RecurrencePattern.WEEKLY ? input.weekly.day : Object.values(DayOfWeek)[new Date(input.monthly.date).getDay()]

        const validate = await ValidateDB(
            input.doctorId,
            date,
            starttime,
            endtime,
            dayofweek
        )



        if (!validate) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "Doctor already have a schedule for the given date and time"
            })
        }

        const timeduration = new Date(endtime).getTime() - new Date(starttime).getTime()


        const newSchedule = await ctx.db.schedule.create({
            data: {
                recurrence: input.recurrence,
                dayOfWeek: input?.weekly?.day,
                Date: input.recurrence === RecurrencePattern.ONCE ? input.once?.date : input.recurrence === RecurrencePattern.WEEKLY ? input.weekly?.startDate : input.monthly?.date,
                startTime: input.weekly?.startTime || input.monthly?.startTime || input.once?.startTime,
                endTime: input.weekly?.endTime || input.monthly?.endTime || input.once?.endTime,
                recurringEvery: input?.weekly?.every || input?.monthly?.every,
                endDate: input?.weekly?.endDate || input?.monthly?.endDate,
                doctor: {
                    connect: {
                        id: input.doctorId
                    },
                },
                Slot: {
                    createMany: {
                        data: Array.from({ length: input.noOfSlots }, (_, i) => ({
                            maxAppointmentsPerSlot: Math.floor(input.maxAppointments / input.noOfSlots),
                            startTime: new Date(new Date(input.weekly?.startTime || input.monthly?.startTime || input.once?.startTime).getTime() + (i * timeduration / input.noOfSlots)).toISOString(),
                            endTime: new Date(new Date(input.weekly?.startTime || input.monthly?.startTime || input.once?.startTime).getTime() + ((i + 1) * timeduration / input.noOfSlots)).toISOString(),

                        }))
                    }
                },
                totalAppointment: input.maxAppointments,

                // OptRooms: {
                //     connect: {
                //         id: input.opdRoomid
                //     }
                // }

            }
        })

        return {
            data: newSchedule,
            status: 200,
            error: null,
            ok: true,
        }






    } catch (error) {

        console.log(error);
        return ErrorHandler(error, "Schedule")


    } finally {
        ctx.db.$disconnect()
    }


})


export default scheduleCreateProcedure