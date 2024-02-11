import "server-only"

import { DayOfWeek, RecurrencePattern } from "@prisma/client"
import { z } from "zod"

const DEFAULTmaxAppointments = 20
const DEFAULTnoOfSlots = 4

export const scheduleCreateProcedureSchema = z.object({

    doctorId: z.string().nonempty(),
    recurrence: z.nativeEnum(RecurrencePattern),
    maxAppointments: z.number().int().min(1).optional().default(DEFAULTmaxAppointments),
    opdRoomid: z.string().optional(),
    noOfSlots: z.number().int().min(1).optional().default(DEFAULTnoOfSlots),
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

    // can not provide 2 recurrences at the same time

    if ((val.recurrence === RecurrencePattern.ONCE && val.weekly) || (val.recurrence === RecurrencePattern.ONCE && val.monthly) || (val.recurrence === RecurrencePattern.WEEKLY && val.once) || (val.recurrence === RecurrencePattern.WEEKLY && val.monthly) || (val.recurrence === RecurrencePattern.MONTHLY && val.once) || (val.recurrence === RecurrencePattern.MONTHLY && val.weekly)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Only one recurrence of once, weekly or monthly should be provided"
        })
    }

    if ((val.recurrence === RecurrencePattern.ONCE && !val.once)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date is required for once recurrence"
        })
    }

    if ((val.recurrence === RecurrencePattern.WEEKLY && !val.weekly)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Weekly is required for weekly recurrence"
        })
    }

    if ((val.recurrence === RecurrencePattern.MONTHLY && !val.monthly)) {
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
