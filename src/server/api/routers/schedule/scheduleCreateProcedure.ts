import "server-only"
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { DayOfWeek, RecurrencePattern, UserRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";


const scheduleCreateProcedureSchema = z.object({

    doctorId: z.string().nonempty(),
    recurrence: z.nativeEnum(RecurrencePattern),
    maxAppointments: z.number().int().min(1).optional().default(20),
    opdRoomid: z.string().optional(),
    once: z.object({
        date: z.date().min(new Date(), { message: "Date should be greater than today" }).optional(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
    }).superRefine((val, ctx) => {
        if (new Date(val.endTime).getTime() <=
            new Date(val.startTime).getTime() + 2700000) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End time should be greater than start time for at least 45 minutes"
            })
        }
    }).optional(),

    weekly: z.object({
        startDate: z.date().min(new Date(), { message: "Start date should be greater than today" }).optional(),
        endDate: z.date().refine((val) => val > new Date(), { message: "End date should be greater than start date" }).optional(),
        day: z.nativeEnum(DayOfWeek),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
        every: z.number().optional().default(1),
    }).superRefine((val, ctx) => {
        if (val.startDate && val.endDate) {
            if (val.startDate > val.endDate) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "End date should be greater than start date"
                })
            }
        }

        if (val.startTime > val.endTime) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End time should be greater than start time"
            })
        }

    }).optional(),

    monthly: z.object({
        date: z.date().min(new Date(), { message: "Date should be greater than today" }).optional(),
        endDate: z.date().refine((val) => val > new Date(), { message: "End date should be greater than start date" }).optional(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
        every: z.number().optional().default(1),
    }).superRefine((val, ctx) => {
        if (val.startTime > val.endTime) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End time should be greater than start time"
            })
        }

    }).optional(),

}).superRefine((val, ctx) => {
    if (val.once && val.weekly && val.monthly) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Only one recurrence of once, weekly or monthly should be provided"
        })
    }

    if (val.recurrence === RecurrencePattern.ONCE && !val.once) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date is required for once recurrence"
        })
    }

    if (val.recurrence === RecurrencePattern.WEEKLY && !val.weekly) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Weekly is required for weekly recurrence"
        })
    }

    if (val.recurrence === RecurrencePattern.MONTHLY && !val.monthly) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Monthly is required for monthly recurrence"
        })
    }

    if (!val.once && !val.weekly && !val.monthly) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "One of recurrence once or weekly or monthly should be provided"
        })
    }




})



const scheduleCreateProcedure = protectedProcedure.input(scheduleCreateProcedureSchema).mutation(async ({ input, ctx }) => {
    try {
        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            return new TRPCError({
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
            return new TRPCError({
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
                return new TRPCError({
                    code: "UNPROCESSABLE_CONTENT",
                    message: "Invalid opd room id"
                })
            }

        }
        // check is the doctor already have a schedule for the given date and time if the recurrence is once and it's a new schedule
        if (input.recurrence === RecurrencePattern.ONCE) {

            const schedule = await ctx.db.schedule.findFirst({
                where: {
                    doctorId: input.doctorId,
                    OR: [
                        // check if the start time and end time is between the given time
                        {
                            Date: input.once.date,
                            startTime: {
                                lte: input.once.startTime,
                            },
                            endTime: {
                                gte: input.once.endTime
                            }
                        },
                        // check if the end time is between the given time

                        {
                            Date: input.once.date,
                            startTime: {
                                lte: input.once.endTime,

                            },
                            endTime: {
                                gte: input.once.endTime
                            }

                        },
                        // check if the start time is between the given time
                        {
                            Date: input.once.date,
                            startTime: {
                                lte: input.once.startTime,

                            },
                            endTime: {
                                gte: input.once.startTime
                            }
                        },
                        // check if the start time and end time is included in the given time
                        {
                            Date: input.once.date,
                            startTime: {
                                gte: input.once.startTime,
                            },
                            endTime: {
                                lte: input.once.endTime
                            }
                        }

                    ]
                }
            })



            console.log(schedule);
            if (schedule) {
                return new TRPCError({
                    code: "UNPROCESSABLE_CONTENT",
                    message: "Doctor already have a schedule for the given date and time"
                })
            }
            const newSchedule = await ctx.db.schedule.create({
                data: {
                    recurrence: input.recurrence,
                    Date: input.once.date,
                    startTime: input.once.startTime,
                    endTime: input.once.endTime,
                    doctor: {
                        connect: {
                            id: input.doctorId
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


        }



    } catch (error) {

        return ErrorHandler(error, "Schedule")


    }


})


export default scheduleCreateProcedure