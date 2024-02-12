import "server-only"

import { DayOfWeek, RecurrencePattern } from "@prisma/client"
import { z } from "zod"

const DEFAULTmaxAppointments = 20
const DEFAULTnoOfSlots = 4

export const scheduleCreateProcedureSchema = z.object({

    doctorId: z.string().nonempty(),
    recurrence: z.nativeEnum(RecurrencePattern),
    maxAppointments: z.number().int().min(4).optional().default(DEFAULTmaxAppointments),
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

    if (val.noOfSlots > val.maxAppointments / 5) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Number of slots should be less than or equal to max appointments divided by 5"
        })
    }

    if (val.noOfSlots < DEFAULTnoOfSlots) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Number of slots should be less than or equal to 4"
        })

    }


})





export const scheduleGetProcedureSchema = z.object({

    doctorId: z.string().nonempty().optional(),
    scheduleId: z.string().nonempty().optional(),
    date: z.date().optional(),
    getRecurrence: z.nativeEnum(RecurrencePattern).optional(),
    DayOfWeek: z.nativeEnum(DayOfWeek).optional(),

})






export const scheduleUpdateProcedureSchema = z.object({


    scheduleId: z.string(),
    date: z.date().optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
    DayOfWeek: z.nativeEnum(DayOfWeek).optional(),
    maxAppointments: z.number().int().min(20).optional(),
    noOfSlots: z.number().int().min(4).optional(),
    opdRoomid: z.string().optional(),



}).superRefine((val, ctx) => {
    if (val.endTime && val.startTime) {
        if (new Date(val.endTime).getTime() <=
            new Date(val.startTime).getTime() + 2700000) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End time should be greater than start time for at least 45 minutes"
            })
        }
    }

    if (val.startTime && val.endTime) {
        if (val.startTime > val.endTime) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End time should be greater than start time"
            })
        }

    }

    if (val.date) {
        if (val.date < new Date()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date should be greater than today"
            })
        }
    }

    if (val.maxAppointments < 20) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Max Appointments should be greater than 20"
        })

    }

    if (val.date && val.DayOfWeek) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "cannot update both date and day of week"
        })
    }

    if (!val.date && !val.DayOfWeek && !val.startTime && !val.endTime && !val.maxAppointments && !val.noOfSlots && !val.opdRoomid) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "cannot update schedule with empty fields, at least one field is required to update schedule"
        })
    }

    if (val.noOfSlots > val.maxAppointments / 5) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Number of slots should be less than or equal to max appointments divided by 5"
        })
    }

    if (val.noOfSlots < 4) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Number of slots should be less than or equal to 4"
        })

    }




})






export const scheduleDeleteProcedureSchema = z.object({
    scheduleId: z.string(),

    deleteMany: z.array(z.object({
        id: z.string()
    })).optional()
}).superRefine((val, ctx) => {
    if (!val.scheduleId && !val.deleteMany) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Either scheduleId or deleteMany is required"
        })
    }
})