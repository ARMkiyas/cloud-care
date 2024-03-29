import "server-only"

import { DoctorSpecialization, UserRoles, adminDepartment, gender, title } from "@prisma/client"
import { z } from "zod"
import { imageSchema, pagenationSchema } from "@/utils/ValidationSchemas/commonSc"



export const getStaffschema = z.object({
    email: z.string().email().optional(),
    id: z.string().optional(),
    NIC: z.string().optional(),
    Passport: z.string().optional(),
    name: z.string().optional(),
    gender: z.nativeEnum(gender).optional(),
    getdoctors: z.boolean().optional(),
    getnurses: z.boolean().optional(),
    getadmins: z.boolean().optional(),
    staffType: z.enum(["doctors", "nurses", "admins"]).optional(),

}).merge(pagenationSchema)


export const userAccSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(6),
    role: z.nativeEnum(UserRoles),
    twoFactorEnabled: z.boolean().optional(),

})


export const createStaffSchema = z.object({

    title: z.nativeEnum(title),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    dateOfBirth: z.date(),
    gender: z.nativeEnum(gender),
    phone: z.string().min(10).max(15),
    NIC: z.string().min(10).max(12).optional(),
    Passport: z.string().min(10).max(12).optional(),
    idNumber: z.string().optional(),
    image: imageSchema.optional(),
    staffType: z.enum(["doctor", "nurse", "admin"]),
    department: z.nativeEnum(adminDepartment).optional(),
    specialization: z.nativeEnum(DoctorSpecialization).optional(),
    // schema for create user account with staff
    withUserAccount: userAccSchema.optional(),

}).superRefine((sch, ctx) => {

    if (sch.staffType === "admin" && sch.department === undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Department is required for admin"
        })
    }

    if (sch.staffType === "doctor" && sch.specialization === undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "specialization is required for doctor"
        })
    }

})


export const deleteStaffSchema = z.object({
    staffID: z.string(),
    email: z.string().email().optional(),
})


export const updatestaffSchema = z.object({
    staffID: z.string(),
    data: z.object({
        title: z.nativeEnum(title),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        email: z.string().email(),
        dateOfBirth: z.date(),
        gender: z.nativeEnum(gender),
        phone: z.string().min(10).max(15),
        NIC: z.string().min(10).max(12).optional(),
        Passport: z.string().min(10).max(12).optional(),
        idNumber: z.string().optional(),
        image: imageSchema.optional(),

    })
})

