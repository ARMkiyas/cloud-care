
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { Prisma, UserRoles } from "@prisma/client";

import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { scheduleGetProcedureSchema } from "./validation/schema";
import dayjs from "dayjs";




const GetAppointmentsProcedure = protectedProcedure.input(scheduleGetProcedureSchema).query(async ({ input, ctx }) => {



    try {

        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER) && (ctx.session.user.role !== UserRoles.DOCTOR)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        // allow only doctor to get his schedule
        ctx.session.user.role === UserRoles.DOCTOR ? input.doctorid = ctx.session.user.id : null

        console.log(input.date);
        const query = {
            skip: input.page > 1 ? (input.page - 1) * input.limit : 0,
            take: input.limit + 1,
            where: {
                doctorId: {
                    equals: input.doctorid
                },
                referenceid: {
                    contains: input.referenceId
                },
                status: {
                    equals: input.status
                },
                ...input.date && {
                    appointmentDate: {

                        ...input.date[0] && input.date[1] && {
                            gte: new Date(dayjs(input.date[0]).format("YYYY-MM-DD")).toISOString(),
                            lte: new Date(dayjs(input.date[1]).format("YYYY-MM-DD")).toISOString()
                        },
                        ...input.date[0] && !input.date[1] && {

                            equals: input.date[0] ? new Date(dayjs(input.date[0]).format("YYYY-MM-DD")).toISOString() : undefined,
                        }

                    }
                },
                doctor: {
                    ...input.doctorSearchQuery?.trim() && {
                        staff: {
                            OR: [
                                {
                                    firstName: {
                                        search: input.doctorSearchQuery?.trim()?.split(" ").join(" & ") || undefined

                                    }

                                }, {
                                    lastName: {
                                        search: input.doctorSearchQuery?.trim()?.split(" ").join(" & ") || undefined
                                    }
                                }

                            ]
                        }
                    }
                },
                patient:
                {
                    ...input.patientSearchQuery?.trim() && {
                        OR: [
                            {
                                firstName: {
                                    contains: input.patientSearchQuery?.trim()?.split(" ").join(" & ") || input.patientName || undefined
                                }
                            },
                            {
                                lastName: {
                                    contains: input.patientSearchQuery?.trim().split(" ").join(" & ") || input.patientName || undefined
                                }
                            },
                            {
                                NIC: {
                                    contains: input?.patientSearchQuery?.split(" ")?.join(" & ") || input.patientName || undefined
                                }
                            },
                            {
                                Passport: {
                                    contains: input?.patientSearchQuery?.split(" ")?.join(" & ") || input.patientName || undefined
                                }
                            },
                            {
                                phone: {
                                    contains: input?.patientSearchQuery?.split(" ")?.join(" & ") || input.patientName || undefined
                                }
                            },
                            {
                                email: {
                                    search: input?.patientSearchQuery?.split(" ")?.join(" & ") || input.patientName || undefined
                                }
                            }
                        ],
                    }


                },
            },
            include: {

                Slot: true,
                patient: true,
                doctor: {
                    select: {
                        staff: {
                            select: {
                                title: true,
                                firstName: true,
                                lastName: true,
                                image: true,

                            }
                        }
                    }
                }
            },
            orderBy: {
                createdat: "desc",
            }

        } satisfies Prisma.AppointmentFindManyArgs


        const [appointments, count] = await ctx.db.$transaction([
            ctx.db.appointment.findMany(query),
            ctx.db.appointment.count({
                where: query.where
            })
        ])




        let nextCursor: typeof input.cursor | undefined = undefined

        if (appointments.length > input.limit) {
            nextCursor = appointments[appointments.length - 1].id
            appointments.pop()
        }


        return {
            data: appointments,
            pagenation: {
                nextCursor: nextCursor,
                pages: input.page,
                total: count
            },

            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {
        console.log(error);
        throw ErrorHandler(error, "GetAppointments", "An error occurred while trying to get appointments")
    } finally {
        ctx.db.$disconnect()
    }


})


export default GetAppointmentsProcedure