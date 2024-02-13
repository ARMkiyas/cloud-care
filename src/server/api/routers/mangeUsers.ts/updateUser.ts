import "server-only";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { UserRoles } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { TRPCError } from "@trpc/server";
import { updateUserSchema } from "./validation/schema";



const updateUser = protectedProcedure.input(updateUserSchema).mutation(async ({ ctx, input }) => {

    try {

        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            return new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        if (ctx.session.user.id === input.userid.trim()) {
            return new TRPCError({
                code: "BAD_REQUEST",
                message: "You cannot update your own account here, if you want to update your account go to profile settings and update your account",
            })
        }

        const user = await ctx.db.user.update({
            where: {
                id: input.userid.trim(),
            },
            data: {
                ...(input.username && { username: input.username.trim() }),
                ...(input.email && { email: input.email.trim() }),
                ...(input.phone && { phone: input.phone.trim() }),
                ...(input.role && {
                    role: {
                        connect: {
                            role: input.role
                        }
                    }
                }),
                ...(input.twoFactorEnabled && { twoFactorEnabled: input.twoFactorEnabled }),
                ...(input.image && { image: input.image }),
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
                phone: user.phone,
                roleId: user.userRoleId,
            }
        }


    } catch (error) {

        return ErrorHandler(error, "User", "update")


    } finally {
        ctx.db.$disconnect();
    }


})



export default updateUser;