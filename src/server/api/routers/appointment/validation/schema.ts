
import "server-only";
import { Appointmentstatus, gender, title } from "@prisma/client"
import { date, z } from "zod"


export const createAppointmentSchema = z.object({

    slotId: z.string(),
    AppointmentDate: z.date(),
    patientTitle: z.nativeEnum(title).optional(),
    patientFirstName: z.string().min(2),
    patientLastName: z.string().min(2),
    patientNIC: z.string().min(7).optional(),
    patientPassport: z.string().min(7).optional(),
    patientGender: z.nativeEnum(gender),
    patientDob: z.date(),
    patientAddress: z.string().min(5).optional(),
    patientMobile: z.string().min(9).max(14).optional(),
    patientEmail: z.string().email(),
    patientNote: z.string().optional()

}).superRefine((val, ctx) => {


    if (!val.patientNIC && !val.patientPassport) {
        ctx.addIssue({
            code: "custom",
            message: "Please provide either the NIC or the Passport number"
        })
    }

    // phonenumber should be international format
    if (val.patientMobile && !val.patientMobile.startsWith("+")) {
        ctx.addIssue({
            code: "custom",
            message: "Please provide phone number in international format (Eg: +94771234567)"
        })
    }

    if (val.patientDob > new Date()) {
        ctx.addIssue({
            code: "custom",
            message: "Date of birth cannot be in the future"
        })
    }

    if (val.AppointmentDate < new Date()) {
        ctx.addIssue({
            code: "custom",
            message: "Appointment date cannot be in the past"
        })
    }





})



export const EditAppointmentProcedureSchema = z.object({


    data: z.array(z.object({
        id: z.string(),
        status: z.nativeEnum(Appointmentstatus),
        date: z.date()

    }))


}).superRefine((val, ctx) => {

    if (val.data && val.data.length > 0) {
        val.data.forEach((item) => {
            if (item.status === Appointmentstatus.Active && item.date < new Date()) {
                ctx.addIssue({
                    code: "custom",
                    message: "Appointment date cannot be in the past for status 'Active'"
                })

            }
            if (item.status === Appointmentstatus.Completed && item.date > new Date()) {
                ctx.addIssue({
                    code: "custom",
                    message: "Appointment date cannot be in the future for status 'Completed'"
                })
            }
        })

    }


})


export const deleteAppointmentProcedureSchema = z.object({

    appointmentId: z.string().optional(),
    deleteMany: z.array(z.object({
        id: z.string()
    })).optional()


})



export const scheduleGetProcedureSchema = z.object({

    limit: z.number().default(10),
    page: z.number().default(1).optional(),
    cursor: z.string().optional(),
    skip: z.number().optional(),

    doctorid: z.string().optional(),
    doctorSearchQuery: z.string().optional(),

    referenceId: z.string().optional(),
    patientSearchQuery: z.string().optional(),
    patientName: z.string().optional(),
    patientNIC: z.string().optional(),
    patientPassport: z.string().optional(),
    patientMobile: z.string().optional(),
    patientEmail: z.string().optional(),

    status: z.nativeEnum(Appointmentstatus).optional(),
    date: z.array(z.date().nullable()).default([undefined, undefined]).optional(),


}).superRefine((val, ctx) => {


    if (val.limit > 100) {
        ctx.addIssue({
            code: "custom",
            message: "Limit cannot exceed 100"
        })
    }

    if (val.page < 1) {
        ctx.addIssue({
            code: "custom",
            message: "Page number cannot be less than 1"
        })
    }

    if (val.status && !Object.values(Appointmentstatus).includes(val.status)) {
        ctx.addIssue({
            code: "custom",
            message: "Invalid status"
        })
    }

    if (val.date && val.date.length > 2) {
        ctx.addIssue({
            code: "custom",
            message: "Invalid date range"
        })
    }


})


export const CheckAppointmentProcedureSchema = z.object({

    referenceId: z.string(),
    patientNIC: z.string().optional(),
    patientPassport: z.string().optional()



}).superRefine((val, ctx) => {
    if (!val.patientNIC && !val.patientPassport) {
        ctx.addIssue({
            code: "custom",
            message: "Please provide either the NIC or the Passport number"
        })
    }


})

