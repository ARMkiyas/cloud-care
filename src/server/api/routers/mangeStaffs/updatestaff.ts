import "server-only";
import { TRPCError } from "@trpc/server"
import { protectedProcedure } from "../../trpc"

import { adminDepartment, AdminJobTitle, MedicalDepartments, OtherJobTitles, Prisma, UserRoles } from "@prisma/client"
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error"
import { updatestaffSchema } from "./validation/schema"

const updatestaffProceture = protectedProcedure.input(updatestaffSchema).mutation(async ({ ctx, input }) => {


    try {

        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }
        // if (ctx.session.user.id === input.staffID) {
        //     throw new TRPCError({
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
                        image: input.data.image ? await userImageUploader(input.data.image, staff.image) : staff.image,
                        ...input.data.staffType === "admin" ? {
                            admin: {
                                create: {
                                    department: input.data.department as adminDepartment,
                                    jobTitle: input.data.jobtitle as AdminJobTitle
                                }
                            }

                        } : input.data.staffType === "doctor" ? {
                            doctor: {
                                create: {
                                    specialization: input.data.specialization,
                                    departments: input.data.department as MedicalDepartments

                                }
                            }
                        } : input.data.staffType === "nurse" ? {
                            nurse: {
                                create: {
                                    departments: input.data.department as MedicalDepartments
                                }
                            }
                        } : input.data.staffType === "others" && {
                            OtherStaffs: {
                                create: {
                                    departments: input.data.department as MedicalDepartments,
                                    jobTitle: input.data.jobtitle as OtherJobTitles
                                }
                            }
                        },

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
        throw ErrorHandler(e, "Staff")

    } finally {
        ctx.db.$disconnect();
    }

})



export default updatestaffProceture;