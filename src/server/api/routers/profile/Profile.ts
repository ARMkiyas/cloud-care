import "server-only"
import { createTRPCRouter, protectedProcedure } from "../../trpc"
import { z } from "zod"
import { imageSchema } from "@/utils/ValidationSchemas/commonSc"
import { TRPCError } from "@trpc/server"
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder"
import { generate2FASecret } from "@/utils/OtpHelper"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error"



const profileUpdateSchema = z.object({
    name: z.string().min(1, "name Requred").optional(),
    email: z.string().email().optional(),
    picture: imageSchema.optional(),
    username: z.string().min(1, "username Requred").optional(),
    phone: z.string().optional(),
    twoFactorEnabled: z.boolean().optional(),


})

export const profileRouter = createTRPCRouter({
    profileUpdate: protectedProcedure.input(profileUpdateSchema).mutation(async ({ ctx, input }) => {
        console.log("input", input);
        try {

            if (ctx.session.user?.username?.trim() !== input.username?.trim()) {
                new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You cannot update profile other than your own profile",
                })
            }

            if (input.username?.trim() || input.email?.trim() || input.phone?.trim()) {
                const alreadyUserName = await ctx.db.user.findFirst({
                    where: {
                        ...input.username && { username: input.username.trim() },
                        ...input.email && { email: input.email.trim() },
                        ...input.phone && { phone: input.phone.trim() }

                    }
                })



                if (alreadyUserName) {
                    throw new TRPCError({
                        code: "UNPROCESSABLE_CONTENT",
                        message: `${input.email ? "Email" : input.username ? "username" : "Phone number"} already exists`,
                    })
                }

            }

            const updated_imageurl = input.picture ? "dhdf" : null

            const update = await ctx.db.user.update({
                where: {
                    id: ctx.session.user.id.trim()
                },
                data: {
                    username: input.username?.trim(),
                    email: input.email?.trim(),
                    ...updated_imageurl && { image: updated_imageurl },
                    ...input.phone && { phone: input.phone?.trim() },
                    ...input.twoFactorEnabled === ctx.session.user.twoFactorEnabled ? {} : input.twoFactorEnabled ? {
                        twoFactorSecret: generate2FASecret(),
                        twoFactorEnabled: input.twoFactorEnabled
                    } : {
                        twoFactorSecret: null,
                        twoFactorEnabled: input.twoFactorEnabled
                    },
                    name: input.name || ctx.session.user.name,
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    phone: true,
                    twoFactorEnabled: true,
                    image: true
                }
            })

            return {
                data: update,
                status: 200,
                error: null,
                ok: true,
            }


        } catch (err) {
            throw ErrorHandler(err, "User")
        } finally {
            ctx.db.$disconnect();
        }





    }),
})