import "server-only";

import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { scheduleDeleteProcedureSchema } from "./validation/schema";


const scheduleDeleteProcedure = protectedProcedure.input(scheduleDeleteProcedureSchema).mutation(async ({ input, ctx }) => {


    try {
        if ((ctx.session.user.role !== UserRoles.ROOTUSER) && !(ctx.session.user?.Permissions.includes("SCHEDULES_DELETE"))) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }



        const schedule = await ctx.db.schedule.deleteMany({
            where: {
                id: {
                    in: input.scheduleId ? [input.scheduleId] : input.deleteMany.map((item) => item.id)
                }
            }
        })

        if (!schedule.count || schedule.count === 0) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "Schedule not found"
            })
        }


        return {
            data: schedule,
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {


        throw ErrorHandler(error, "Schedule")
    } finally {
        ctx.db.$disconnect()
    }




})


export default scheduleDeleteProcedure