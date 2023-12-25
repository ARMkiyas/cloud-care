
import "server-only"
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { UserRoles, gender, Staff, title, adminDepartment, DoctorSpecialization, } from "@prisma/client"
import { ZodType, ZodTypeAny, z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPwd } from "@/utils/hashPwdHelper";
import { generate2FASecret } from "@/utils/OtpHelper"
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder";
import { getAvatar } from "@/utils/getavatar";





const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];


const imageSchema = z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
        message: "The profile picture must be a maximum of 10MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
        message: "Only images are allowed to be sent.",
    })

const getStaffschema = z.object({
    email: z.string().email().optional(),
    id: z.string().optional(),
    NIC: z.string().optional(),
    Passport: z.string().optional(),
    name: z.string().optional(),
    gender: z.nativeEnum(gender).optional(),
    getdoctors: z.boolean().optional(),
    getnurses: z.boolean().optional(),
    getadmins: z.boolean().optional(),
    staffType: z.enum(["doctor", "nurse", "admin"]).optional(),



})



const userAccSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(6),
    role: z.nativeEnum(UserRoles),
    twoFactorEnabled: z.boolean().optional(),

})


const createStaffSchema = z.object({
    title: z.nativeEnum(title),
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.string().email(),
    dateOfBirth: z.date(),
    gender: z.nativeEnum(gender),
    phone: z.string().min(10).max(15),
    nic: z.string().min(10).max(12).optional(),
    passport: z.string().min(10).max(12).optional(),
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



const deleteStaffSchema = z.object({
    staffID: z.string(),
    email: z.string().email().optional(),
})

const manageStaffRouter = createTRPCRouter({

    getStaff: protectedProcedure
        .input(getStaffschema.optional())
        .query(async ({ ctx, input }) => {

            try {
                if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
                    return new TRPCError({
                        code: "UNAUTHORIZED",
                        message: "You are not authorized to perform this action",
                    })
                }



                const staff = await ctx.db.staff.findMany({
                    where: {
                        email: {
                            equals: input?.email
                        },
                        id: {
                            equals: input?.id
                        },
                        NIC: {
                            equals: input?.NIC
                        },
                        Passport: {
                            equals: input?.Passport
                        },
                        firstName: {
                            search: input?.name
                        },
                        lastName: {
                            search: input?.name
                        },
                        gender: {
                            equals: input.gender
                        },
                        AND: [
                            {

                                doctor: {
                                    isNot: input?.staffType === "doctor" ? null : undefined
                                },
                                nurse: {
                                    isNot: input?.staffType === "nurse" ? null : undefined
                                },
                                admin: {
                                    isNot: input?.staffType === "admin" ? null : undefined
                                }

                            }
                        ]
                    },
                    include: {
                        admin: input.getadmins,
                        nurse: input.getnurses,
                        doctor: input?.getdoctors,

                    }

                })

                return {
                    status: 200,
                    ok: true,
                    data: staff
                }


            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {

                    if (e.code === "P2016") {
                        return new TRPCError({
                            code: "BAD_REQUEST",
                            message: `Invalid ${e.meta.target}`,
                            cause: e.message
                        })
                    }

                    if (e.code === "P2025") {
                        return new TRPCError({
                            code: "BAD_REQUEST",
                            message: `Invalid ${e.meta.target}`,
                            cause: e.message
                        })
                    }


                }


                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Error in fetching staff",
                    cause: e.message
                })
            }

        }),


    createStaff: protectedProcedure.input(createStaffSchema).mutation(async ({ ctx, input }) => {

        try {
            if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
                return new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You are not authorized to perform this action",
                })
            }





            const data = await ctx.db.staff.create({
                data: {
                    title: input.title,
                    firstName: input.firstname,
                    lastName: input.lastname,
                    email: input.email,
                    dateOfBirth: input.dateOfBirth,
                    gender: input.gender,
                    phone: input.phone,
                    NIC: input.nic,
                    Passport: input.passport,
                    idNumber: input.idNumber,
                    image: input.image ? await userImageUploader(input.image) : getAvatar("person", input.gender),
                    ...input.staffType === "admin" ? {
                        admin: {
                            create: {
                                department: input.department
                            }
                        }

                    } : input.staffType === "doctor" ? {
                        doctor: {
                            create: {
                                specialization: input.specialization
                            }
                        }
                    } : input.staffType === "nurse" ? {
                        nurse: {
                            create: {

                            }
                        }
                    } : {},

                    ...input.withUserAccount ? {
                        user: {
                            create: {
                                name: `${input.title}${input.firstname} ${input.lastname}`,
                                email: input.email,
                                phone: input.phone,
                                Log: {
                                    create: {
                                        action: `CREATED USER ACCOUNT BY ${ctx.session.user.username}`,
                                        timestamp: new Date()
                                    }
                                },
                                username: input.withUserAccount.username,
                                password: await hashPwd(input.withUserAccount.password),
                                twoFactorEnabled: input.withUserAccount.twoFactorEnabled === false ? false : true,
                                twoFactorSecret: input.withUserAccount.twoFactorEnabled === false ? undefined : generate2FASecret(),
                                image: input.image ? await userImageUploader(input.image) : getAvatar("person", input.gender),
                                role: {
                                    connect: {
                                        role: input.withUserAccount.role ? input.withUserAccount.role : UserRoles.GUEST
                                    }
                                }
                            }
                        }
                    } : {}

                },
                include: {
                    admin: true,
                    nurse: true,
                    doctor: true,
                    user: true
                }
            })


            await ctx.db.log.create({
                data: {
                    action: `CREATED STAFF ${data.title} ${data.firstName} ${data.lastName} BY ${ctx.session.user.username}  ${input.withUserAccount ?
                        `WITH USER ACCOUNT ${data.user.username}` : ""}`,
                    timestamp: new Date(),
                    user: {
                        connect: {
                            id: ctx.session.user.id
                        }
                    }
                }
            })


            return {
                data: data,
                error: null,
                status: 200,
                ok: true,
            }

        } catch (e) {

            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    return new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Staff with ${e.meta.target} already exists`,
                        cause: e.message
                    })
                }


                if (e.code === "P2016") {
                    return new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Invalid ${e.meta.target}`,
                        cause: e.message
                    })
                }


                if (e.code === "P2025") {
                    return new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Invalid ${e.meta.target}`,
                        cause: e.message
                    })
                }

                if (e.code === "P2020") {
                    return new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Invalid ${e.meta.target}`,
                        cause: e.message
                    })
                }

            }



            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Error in creating staff",
                cause: e.message
            })
        }
    }),

    deleteStaff: protectedProcedure.input(deleteStaffSchema).mutation(async ({ ctx, input }) => {


        try {
            if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
                return new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You are not authorized to perform this action",
                })
            }



            const staff = await ctx.db.staff.findUnique({
                where: {
                    id: input.staffID
                },
                include: {
                    user: true
                }
            })

            if (!staff) {
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Staff with ID ${input.staffID} does not exist`,
                })
            }

            if (staff.user && staff.user.id === ctx.session.user.id) {
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: `You cannot delete your own staff profile`,
                })
            }



            const deleteStaff = await ctx.db.staff.delete({
                where: {
                    id: input.staffID

                }
            })


            await ctx.db.log.create({
                data: {
                    action: `DELETED STAFF ${deleteStaff.title} ${deleteStaff.firstName} ${deleteStaff.lastName} BY ${ctx.session.user.username}`,
                    timestamp: new Date(),
                    user: {
                        connect: {
                            id: ctx.session.user.id
                        }
                    }
                }
            })

            return {
                data: deleteStaff,
                error: null,
                status: 200,
                ok: true,
            }

        }
        catch (e) {


            if (e instanceof PrismaClientKnownRequestError) {

                console.log(e);
                console.log(e.code);

                if (e.code === "P2025") {
                    return new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Invalid ${e.meta.target}`,
                        cause: e.message
                    })
                }


            }
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Error in deleting staff",
                cause: e.message
            })


        }
    }),



});





export default manageStaffRouter;