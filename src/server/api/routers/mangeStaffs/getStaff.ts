
import "server-only";
import { protectedProcedure } from "../../trpc"
import { TRPCError } from "@trpc/server"
import { Prisma, UserRoles } from "@prisma/client"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error"
import { getStaffschema } from "./validation/schema"



const getStaffProceture = protectedProcedure
    .input(getStaffschema.optional())
    .query(async ({ ctx, input }) => {

        try {
            if ((ctx.session.user.role !== UserRoles.ROOTUSER) && !(ctx.session.user?.Permissions.includes("STAFF_READ")) && !(ctx.session.user.role === "DOCTOR" && input.staffType == "doctors") && !(ctx.session.user.role === "NURSE" && input.staffType == "doctors")) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You are not authorized to perform this action",
                })

            }


            const staffquery = {
                skip: input.page > 1 ? (input.page - 1) * input.limit : 0,
                take: input.limit + 1,
                cursor: input.cursor ? {
                    id: input.cursor
                } : undefined,
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
                                isNot: input?.staffType === "doctors" ? null : undefined
                            },
                            nurse: {
                                isNot: input?.staffType === "nurses" ? null : undefined
                            },
                            admin: {
                                isNot: input?.staffType === "admins" ? null : undefined
                            },
                            OtherStaffs: {
                                isNot: input?.staffType === "others" ? null : undefined
                            }

                        }
                    ]
                },
                include: {
                    admin: true,
                    nurse: true,
                    doctor: true,
                    OtherStaffs: true

                },
                orderBy: {
                    firstName: "asc"
                }

            } satisfies Prisma.StaffFindManyArgs

            const [staff, count] = await ctx.db.$transaction([
                ctx.db.staff.findMany(staffquery),
                ctx.db.staff.count({
                    where: staffquery.where
                })
            ])


            let nextCursor: typeof input.cursor | undefined = undefined

            if (staff.length > input.limit) {
                nextCursor = staff[staff.length - 1].id
                staff.pop()
            }


            return {
                status: 200,
                error: null,
                pagenation: {
                    nextCursor: nextCursor,
                    pages: input.page,
                    total: count
                },
                ok: true,
                data: staff
            }


        } catch (e) {
            throw ErrorHandler(e, "Staff")

        } finally {
            ctx.db.$disconnect();
        }

    })






export default getStaffProceture