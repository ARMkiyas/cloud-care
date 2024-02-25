
import "server-only";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { z } from "zod";

import { EncryptJWT, SignJWT, base64url, jwtVerify, jwtDecrypt } from "jose";
import { phoneRegex } from "@/utils/ValidationSchemas/commonSc";
import Email from "next-auth/providers/email";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { hashPwd } from "@/utils/hashPwdHelper";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { generatePasswordResetToken, verifyPasswordResetToken } from "@/utils/lib/auth/pwdResetHelpers";

const crypto = require('crypto');


const SECRET = new TextEncoder().encode(
    process.env.RESET_PASSWORD_TOKEN_SECRET
)
const ALGORITHM = "HS256";



const requestPWDResetSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().regex(phoneRegex).optional(),
    requsetmode: z.enum(["email", "phone"])

}).superRefine((val, ctx) => {
    if (val.email && val.phone) {
        ctx.addIssue({
            code: "custom",
            message: "Please provide either email or phone number"

        })
    }

    if (!val.email && !val.phone) {
        ctx.addIssue({
            code: "custom",
            message: "Please provide either email or phone number",
        })
    }

})


const resetPWDSchema = z.object({
    ResetToken: z.string().min(1, "Reset token is required"),
    newpassword: z.string().nonempty("Please provide your new password").min(6, "Password must be at least 6 characters long"),

})



const PasswordResetRouter = createTRPCRouter({

    requestPWDReset: publicProcedure.input(requestPWDResetSchema).mutation(async ({ input, ctx }) => {
        try {

            const user = await ctx.db.user.findFirst({
                where: {
                    OR: [
                        {
                            email: input.email ? input.email.trim() : undefined,
                        },
                        {
                            phone: input.phone ? input.phone.trim() : undefined
                        }
                    ]
                },
                include: {
                    PasswordResetToken: {
                        select: {
                            id: true,
                        }

                    }
                }
            })


            if (!user)
                return {
                    status: 200,
                    error: null,
                    ok: true,
                    data: null
                }

            if (user.PasswordResetToken.length > 0) {
                await ctx.db.passwordResetToken.deleteMany({
                    where: {
                        userId: user.id
                    }
                })
            }

            const jwt = await generatePasswordResetToken(user.id)

            const reseturl = `${process.env.APP_URL}/auth/reset/${jwt}`




            return {
                status: 200,
                error: null,
                ok: true,
                data: []
            }


        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
                cause: error.message
            })
        } finally {
            ctx.db.$disconnect();
        }



    }),


    resetPWD: publicProcedure.input(resetPWDSchema).mutation(async ({ ctx, input }) => {
        try {
            const payload = await verifyPasswordResetToken(input.ResetToken)


            const verify = await ctx.db.passwordResetToken.findFirst({
                where: {
                    token: payload.jti
                }
            })

            if (!verify) {
                throw new TRPCError({
                    code: "UNPROCESSABLE_CONTENT",
                    message: "Your token is invalid or has expired, please request a new one.",
                })
            }

            const data = await ctx.db.$transaction(async (prisma) => {

                await prisma.passwordResetToken.delete({
                    where: {
                        id: verify.id
                    }
                })

                await prisma.user.update({
                    where: {
                        id: verify.userId

                    },
                    data: {
                        password: await hashPwd(input.newpassword)
                    }
                })

            })

            return {
                status: 200,
                error: null,
                ok: true,
                data: []
            }

        } catch (error) {

            return ErrorHandler(error, "Password Reset", "Error occurred while trying to reset password")


        } finally {
            ctx.db.$disconnect();
        }


    })



});

export default PasswordResetRouter;


