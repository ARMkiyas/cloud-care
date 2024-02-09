import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";

const scheduleGetProcedureSchema = z.object({




})


const scheduleGetProcedure = protectedProcedure.input(scheduleGetProcedureSchema).mutation(async ({ input, ctx }) => {



    if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
        return new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to perform this action",
        })
    }


    const schedules = await ctx.db.schedule.findMany({
        include: {
            doctor: true,
            _count: {
                select: {
                    Appointment: true

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