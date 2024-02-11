import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";

const scheduleDeleteProcedureSchema = z.object({

    scheduleId: z.string(),


})



const scheduleDeleteProcedure = protectedProcedure.input(scheduleDeleteProcedureSchema).mutation(async ({ input, ctx }) => {


    try {
        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            return new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }



        const schedule = await ctx.db.schedule.delete({
            where: {
                id: input.scheduleId
            }
        })


        return {
            data: schedule,
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {


        return ErrorHandler(error, "Schedule")
    }











})


export default scheduleDeleteProcedure