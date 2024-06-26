
import "server-only";
import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { DayOfWeek, DoctorSpecialization, RecurrencePattern, UserRoles } from "@prisma/client";

const scheduleGetProcedureSchema = z.object({

    doctorId: z.string().nonempty(),
    doctorname: z.string().nonempty().optional(),
    date: z.date().optional(),
    order: z.enum(["asc", "desc"]).default("asc").optional(),
    specialty: z.nativeEnum(DoctorSpecialization).optional(),

})


import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { publicProcedure } from "@/server/api/trpc";

const schedulePUBProcedure = publicProcedure.input(scheduleGetProcedureSchema).query(async ({ input, ctx }) => {

    try {

        const schedules = await ctx.db.schedule.findMany({
            where: {
                doctorId: {
                    equals: input.doctorId
                },
                Date: {
                    equals: input.date
                },
                doctor: {
                    specialization: {
                        equals: input.specialty
                    },
                    staff: {
                        lastName: {
                            search: input.doctorname
                        },
                        firstName: {
                            search: input.doctorname
                        }

                    }
                }

            },

            include: {
                doctor: {
                    select: {
                        id: true,
                        specialization: true,
                        staff: {
                            select: {
                                title: true,
                                firstName: true,
                                lastName: true,
                                image: true
                            }
                        }
                    }

                },
                Slot: {
                    select: {
                        _count: true,
                        maxAppointmentsPerSlot: true,
                        startTime: true,
                        endTime: true,
                        id: true,
                        ScheduleId: true,
                    }
                },

                _count: {
                    select: {
                        Appointment: true,
                        Slot: true,
                    }

                },
            },
            orderBy: {
                Date: input.order
            }
        })

        return {
            data: schedules,
            status: 200,
            error: null,
            ok: true,
        }

    } catch (error) {



        throw ErrorHandler(error, "schedule", "Error getting schedule")
    } finally {
        ctx.db.$disconnect()
    }




})


export default schedulePUBProcedure