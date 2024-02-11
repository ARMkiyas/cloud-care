import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { UserRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const scheduleUpdateProcedureSchema = z.object({






})

const scheduleUpdateProcedure = protectedProcedure.input(scheduleUpdateProcedureSchema).mutation(({ input, ctx }) => {
    if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
        return new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to perform this action",
        })
    }





})


export default scheduleUpdateProcedure