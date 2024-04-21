import "server-only";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { UserRoles } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { TRPCError } from "@trpc/server";
import { updateUserSchema } from "./validation/schema";
import { generate2FASecret } from "@/utils/OtpHelper";
import { sendPasswordReset } from "@/utils/lib/auth/pwdResetHelpers";



const updateUser = protectedProcedure.input(updateUserSchema).mutation(async ({ ctx, input }) => {

    try {

        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        if (ctx.session.user.id === input.userid.trim()) {
            throw new TRPCError({
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
                ...(input.twoFactorEnabled ? {
                    twoFactorEnabled: input.twoFactorEnabled,
                    twoFactorSecret: generate2FASecret()
                } : {
                    twoFactorEnabled: false,
                    twoFactorSecret: null
                }),
                ...(input.image && { image: input.image }),
            }
        }
        );

        if (input.pwdreet) {
            await sendPasswordReset(user.id, "email")
        }



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

        throw ErrorHandler(error, "User", "update")


    } finally {
        ctx.db.$disconnect();
    }


})



export default updateUser;