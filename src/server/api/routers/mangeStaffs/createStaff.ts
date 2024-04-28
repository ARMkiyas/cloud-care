import "server-only";
import { protectedProcedure, publicProcedure } from "../../trpc"
import { adminDepartment, AdminJobTitle, MedicalDepartments, OtherJobTitles, UserRoles } from "@prisma/client"
import {
    experimental_createMemoryUploadHandler,
    experimental_isMultipartFormDataRequest,
    experimental_parseMultipartFormData,
} from '@trpc/server/adapters/node-http/content-type/form-data';
import { TRPCError } from "@trpc/server"
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder"
import { getAvatar } from "@/utils/getavatar"
import { hashPwd } from "@/utils/hashPwdHelper"
import { generate2FASecret } from "@/utils/OtpHelper"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error"
import { createStaffSchema } from "./validation/schema"
import dayjs from "dayjs";
import { get_imageSigedURL } from "@/utils/lib/get_imageSigedURL";



// const formDataProcedure = protectedProcedure.use(async (opts) => {
//     if (!experimental_isMultipartFormDataRequest(opts.ctx.req)) {
//         return opts.next();
//     }
//     const formData = await experimental_parseMultipartFormData(
//         opts.ctx.req,
//         experimental_createMemoryUploadHandler(),
//     );

//     return opts.next({
//         getRawInput: async () => formData,
//     });
// });



const createStaffProceture = protectedProcedure.input(createStaffSchema).mutation(async ({ ctx, input }) => {

    try {
        if ((ctx.session.user.role !== UserRoles.ROOTUSER) && !(ctx.session.user?.Permissions.includes("STAFF_WRITE"))) {
            throw new TRPCError({
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
                dateOfBirth: new Date(dayjs(input.dateOfBirth).format("YYYY-MM-DD")).toISOString(),
                gender: input.gender,
                phone: input.phone,
                NIC: input.NIC,
                Passport: input.Passport,
                idNumber: input.idNumber,
                image: input.image ? await get_imageSigedURL(input.image) : getAvatar(input.staffType === "doctor" ? "doctor" : input.staffType === "nurse" ? "nurse" : "person", input.gender),
                ...input.staffType === "admin" ? {
                    admin: {
                        create: {
                            department: input.department as adminDepartment,
                            jobTitle: input.jobtitle as AdminJobTitle
                        }
                    }

                } : input.staffType === "doctor" ? {
                    doctor: {
                        create: {
                            specialization: input.specialization,
                            departments: input.department as MedicalDepartments

                        }
                    }
                } : input.staffType === "nurse" ? {
                    nurse: {
                        create: {
                            departments: input.department as MedicalDepartments
                        }
                    }
                } : input.staffType === "others" && {
                    OtherStaffs: {
                        create: {
                            departments: input.department as MedicalDepartments,
                            jobTitle: input.jobtitle as OtherJobTitles
                        }
                    }
                },

                ...input.withUserAccount ? {
                    user: {
                        create: {
                            name: `${input.title}.${input.firstName} ${input.lastName}`,
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
                            image: input.image ? await get_imageSigedURL(input.image) : getAvatar("person", input.gender),
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
        throw ErrorHandler(e, "Staff")

    } finally {
        ctx.db.$disconnect();
    }
})




export default createStaffProceture;