import "server-only"

import { DoctorSpecialization, UserRoles, adminDepartment, gender, title, AdminJobTitle, MedicalDepartments, OtherJobTitles } from "@prisma/client"
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
    phone:
        z.string()
            .regex(
                /^\+94 \(\d{3}\) \d{3}-\d{4}$/,
                "Invalid Phone Number, please provide it in international format +94 (123) 456-7890",
            )
            .min(1, "phone is Required"),
    NIC: z.string().min(10).max(12).optional(),
    Passport: z.string().min(7).optional(),
    idNumber: z.string(),
    image: imageSchema.optional(),
    staffType: z.enum(["doctor", "nurse", "admin", "others"]),
    department: z.union([z.nativeEnum(adminDepartment), z.nativeEnum(MedicalDepartments)], {
        required_error: "Department is required",
        invalid_type_error: "Invalid Department",
    }),
    specialization: z.nativeEnum(DoctorSpecialization).optional(),

    jobtitle: z
        .union([z.nativeEnum(AdminJobTitle), z.nativeEnum(OtherJobTitles)])
        .nullable()
        .optional(),
    // schema for create user account with staff
    withUserAccount: userAccSchema.optional(),

}).superRefine((sch, ctx) => {

    if (sch.staffType === "admin" && sch.department === undefined && sch.jobtitle === undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "There is no department or job title for admin"
        })
    }

    if (sch.staffType === "doctor" && sch.specialization === undefined && sch.department === undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "There is no specialization or department for doctor"
        })
    }

    // nic or passport is required 
    if (sch.NIC === undefined && sch.Passport === undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "NIC or Passport is required for nurse or other staff"
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

export const GetPubProcedureSchema = z.object({

    name: z.string().optional(),
    specialization: z.nativeEnum(DoctorSpecialization).optional(),
    department: z.nativeEnum(MedicalDepartments).optional(),


}).merge(pagenationSchema)