
import "server-only";
import { protectedProcedure } from "../../trpc"
import { TRPCError } from "@trpc/server"
import { UserRoles } from "@prisma/client"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error"
import { getStaffschema } from "./validation/schema"



const getStaffProceture = protectedProcedure
    .input(getStaffschema.optional())
    .query(async ({ ctx, input }) => {

        try {
            if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
                throw new TRPCError({
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
                error: null,
                ok: true,
                data: staff
            }


        } catch (e) {
            return ErrorHandler(e, "Staff")

        } finally {
            ctx.db.$disconnect();
        }

    })






export default getStaffProceture