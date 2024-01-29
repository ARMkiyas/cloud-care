import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";

const deleteUserSchema = z.object({
    userid: z.string(),
    username: z.string().optional(),
    email: z.string().email().optional(),

});

const deleteUser = protectedProcedure.input(deleteUserSchema).mutation(async ({ ctx, input }) => {


    try {

        if (ctx.session.user.id === input.userid.trim()) {
            return new TRPCError({
                code: "BAD_REQUEST",
                message: "You cannot delete your own account here, if you want to delete your account go to profile settings and delete your account",
            })
        }

        const user = await ctx.db.user.delete({
            where: {
                id: input.userid.trim(),
                ...(input.username && { username: input.username.trim() }),
                ...(input.email && { email: input.email.trim() }),

            }
        }
        );

        return {
            status: 200,
            error: null,
            ok: true,
            data: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,

            }
        }


    } catch (error) {

        return ErrorHandler(error, "User", "delete")
    }


});



export default deleteUser;