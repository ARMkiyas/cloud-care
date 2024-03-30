import { publicProcedure } from "@/server/api/trpc"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error"
import { z } from "zod"
import { GetPubProcedureSchema } from "../validation/schema"
import { Prisma } from "@prisma/client"




const GetPubProcedure = publicProcedure.input(GetPubProcedureSchema).query(async ({ input, ctx }) => {



    try {


        const docQurey = {
            skip: input.page > 1 ? (input.page - 1) * input.limit : 0,
            take: input.limit + 1,
            cursor: input.cursor ? {
                id: input.cursor
            } : undefined,
            where: {
                OR: [
                    {
                        departments: {
                            equals: input.department
                        }

                    },
                    {
                        specialization: {
                            equals: input.specialization
                        }
                    },
                    {
                        staff: {
                            firstName: {
                                search: input.name ? input.name.trim()?.split(" ").join(" & ") : undefined
                            }
                        }
                    },
                    {
                        staff: {
                            lastName: {
                                search: input.name ? input.name.trim()?.split(" ").join(" & ") : undefined
                            }
                        }
                    }
                ]
            },
            select: {
                staff: {
                    select: {
                        title: true,
                        firstName: true,
                        lastName: true,
                        image: true,

                    }
                },
                id: true,
                specialization: true,
                departments: true,
                _count: {
                    select: {
                        schedules: true
                    }

                }
            }
        } satisfies Prisma.DoctorFindManyArgs



        const [doc, count] = await ctx.db.$transaction([
            ctx.db.doctor.findMany(docQurey),
            ctx.db.doctor.count({
                where: docQurey.where
            })
        ])

        const res = doc.map((item) => {
            return {
                name: item.staff.title + "." + item.staff.firstName + " " + item.staff.lastName,
                image: item.staff.image,
                specialization: item.specialization.split("_").join(" "),
                departments: item.departments.split("_").join(" "),
                totalSchedules: item._count.schedules
            }
        })

        let nextCursor: typeof input.cursor | undefined = undefined

        if (doc.length > input.limit) {
            nextCursor = doc[doc.length - 1].id
            doc.pop()
        }

        return {
            data: res,
            status: 200,
            pagenation: {
                nextCursor: nextCursor,
                pages: input.page,
                total: count
            },
            error: null,
            ok: true,
        }


    } catch (error) {
        throw ErrorHandler(error, "GetAppointments", "An error occurred while trying to get appointments")
    } finally {
        ctx.db.$disconnect()
    }


})


export default GetPubProcedure