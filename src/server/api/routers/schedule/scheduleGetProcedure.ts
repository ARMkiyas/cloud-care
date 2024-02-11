import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { RecurrencePattern, UserRoles } from "@prisma/client";

const scheduleGetProcedureSchema = z.object({

    doctorId: z.string().nonempty().optional(),
    scheduleId: z.string().nonempty().optional(),
    date: z.date().optional(),
    getRecurrence: z.nativeEnum(RecurrencePattern).optional()


})


const scheduleGetProcedure = protectedProcedure.input(scheduleGetProcedureSchema).mutation(async ({ input, ctx }) => {

    if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER) && (ctx.session.user.role !== UserRoles.DOCTOR)) {
        return new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to perform this action",
        })
    }


    ctx.session.user.role === UserRoles.DOCTOR ? input.doctorId = ctx.session.user.id : null


    const schedules = await ctx.db.schedule.findMany({
        where: {
            doctorId: {
                equals: input.doctorId
            },
            id: {
                equals: input.scheduleId
            },
            Date: {
                equals: input.date
            },
            recurrence: {
                equals: input.getRecurrence
            }
        },
        include: {
            doctor: true,
            Slot: true,
            Appointment: true,
            _count: {
                select: {
                    Appointment: true,
                    Slot: true

                }
            },
        },
    })

    return {
        data: schedules,
        status: 200,
        error: null,
        ok: true,
    }





})


export default scheduleGetProcedure