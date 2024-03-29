import "server-only";

import { UserRoles } from "@prisma/client";
import { z } from "zod";
import { imageSchema, pagenationSchema } from "@/utils/ValidationSchemas/commonSc";


export const adduserschema = z.object({
    staffID: z.string(),
    password: z.string(),
    username: z.string(),
    role: z.enum([UserRoles.ADMIN, UserRoles.ROOTUSER, UserRoles.STAFF, UserRoles.DOCTOR, UserRoles.NURSE, UserRoles.GUEST]),
    twoFactorEnabled: z.boolean(),
    image: imageSchema.optional(),
});


export const deleteUserSchema = z.object({
    userid: z.string(),
    username: z.string().optional(),
    email: z.string().email().optional(),

});



export const getUserschema = z.object({
    userid: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum([UserRoles.ADMIN, UserRoles.ROOTUSER, UserRoles.STAFF, UserRoles.DOCTOR, UserRoles.NURSE, UserRoles.GUEST]).optional(),
    staffid: z.string().optional(),
    name: z.string().optional(),
}).merge(pagenationSchema)


export const updateUserSchema = z.object({
    userid: z.string(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    role: z.enum([UserRoles.ADMIN, UserRoles.ROOTUSER, UserRoles.STAFF, UserRoles.DOCTOR, UserRoles.NURSE, UserRoles.GUEST]).optional(),
    twoFactorEnabled: z.boolean().optional(),
    image: z.string().optional(),
    pwdreet: z.boolean().optional(),
})