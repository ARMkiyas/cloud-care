
import "server-only"
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { UserRoles, gender, Staff, title, adminDepartment, DoctorSpecialization, Prisma, } from "@prisma/client"
import { ZodType, ZodTypeAny, date, z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPwd } from "@/utils/hashPwdHelper";
import { generate2FASecret } from "@/utils/OtpHelper"
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder";
import { getAvatar } from "@/utils/getavatar";
import { imageSchema } from "@/utils/ValidationSchemas/commonSc"
import { createStaffSchema, deleteStaffSchema, getStaffschema, updatestaffSchema } from "@/utils/ValidationSchemas/manageStaffSc";




const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];


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
                        admin: true,
                        nurse: true,
                        doctor: true,

                    },
                    orderBy: {
                        firstName: "asc"
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


                console.log(e);

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Error in fetching staff",
                    cause: e.message
                })
            } finally {
                ctx.db.$disconnect();
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
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    dateOfBirth: input.dateOfBirth,
                    gender: input.gender,
                    phone: input.phone,
                    NIC: input.NIC,
                    Passport: input.Passport,
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
                                name: `${input.title}${input.firstName} ${input.firstName}`,
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
                    action: `CREATED STAFF ${data.title} ${data.firstName} ${data.lastName} BY ${ctx.session.user.username} ID ${ctx.session.user.id} ${input.withUserAccount ?
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
        } finally {
            ctx.db.$disconnect();
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
                    action: `DELETED STAFF ${deleteStaff.title} ${deleteStaff.firstName} ${deleteStaff.lastName} BY ${ctx.session.user.username} ID ${ctx.session.user.id}`,
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


        } finally {
            ctx.db.$disconnect();
        }
    }),

    updatestaff: protectedProcedure.input(updatestaffSchema).mutation(async ({ ctx, input }) => {


        try {

            if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
                return new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You are not authorized to perform this action",
                })
            }
            // if (ctx.session.user.id === input.staffID) {
            //     return new TRPCError({
            //         code: "BAD_REQUEST",
            //         message: "You cannot update your own staff profile",
            //     })

            // }


            const trs = await ctx.db.$transaction(
                async (tx) => {

                    const staff = await tx.staff.findUnique({
                        where: {
                            id: input.staffID
                        },
                        include: {
                            user: true
                        }
                    })

                    const update = await ctx.db.staff.update({
                        where: {
                            id: input.staffID,
                        },
                        data: {
                            title: input.data.title,
                            firstName: input.data.firstName,
                            lastName: input.data.lastName,
                            email: input.data.email,
                            dateOfBirth: input.data.dateOfBirth,
                            idNumber: input.data.idNumber,
                            NIC: input.data.NIC,
                            Passport: input.data.Passport,
                            phone: input.data.phone,
                            image: input.data.image ? await userImageUploader(input.data.image, staff.image) : staff.image
                        },
                        include: {
                            admin: true,
                            nurse: true,
                            doctor: true,
                        }

                    })



                    if (staff.user) {
                        await tx.user.update({
                            where: {
                                id: staff.user.id
                            },
                            data: {
                                name: `${update.title} ${update.firstName} ${update.lastName}`,
                                email: update.email,
                                phone: update.phone,
                                image: update.image,
                            }
                        })
                    }

                    return update;
                },
                {
                    maxWait: 5000, // default: 2000
                    timeout: 10000, // default: 5000
                    isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
                }
            )





            return {
                data: trs,
                error: null,
                status: 200,
                ok: true,
            }


        } catch (e) {
            console.log(e);

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
                message: "Error in updating staff",
                cause: e.message
            })

        } finally {
            ctx.db.$disconnect();
        }

    }),



});





export default manageStaffRouter;