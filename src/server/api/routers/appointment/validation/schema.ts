
import "server-only";
import { gender, title } from "@prisma/client"
import { z } from "zod"

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




export const deleteAppointmentProcedureSchema = z.object({

    appointmentId: z.string().optional(),
    deleteMany: z.array(z.object({
        id: z.string()
    })).optional()


})



export const scheduleGetProcedureSchema = z.object({

    doctorid: z.string().optional(),
    referenceId: z.string().optional(),
    patientName: z.string().optional(),
    patientNIC: z.string().optional(),
    patientPassport: z.string().optional(),
    patientMobile: z.string().optional(),
    patientEmail: z.string().optional()


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

