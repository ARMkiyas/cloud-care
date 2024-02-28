import "server-only";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { generateOTP } from "@utils/OtpHelper"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";


export const request2faotp = createTRPCRouter({

    // Greet the user with a hello message.
    request: protectedProcedure
        .mutation(async ({ ctx }) => {

            try {
                if (ctx.session.user.twoFactorEnabled === false) return {
                    status: 204,
                    ok: false,
                    message: "The user has not enabled 2fa"
                }

                const user = await ctx.db.user.findFirst({
                    where: {
                        id: ctx.session.user.id,
                    },
                });

                if (!user) {

                    return {
                        status: 204,
                        ok: false,
                        message: "User not found"
                    }

                }

                const otp = await generateOTP(user.twoFactorSecret)

                console.log(otp);

                // await ctx.db.log.create({
                //     data: {
                //         action: "2fa_otp_requested",
                //         timestamp: new Date(),
                //         user: {
                //             connect: {
                //                 id: user.id,
                //             },
                //         }

                //     },

                // })

                const result = {
                    status: 200,
                    ok: true,
                    message: "OTP has been sent to your email and phone",
                }

                return result;

            } catch (error) {
                throw ErrorHandler(error, "Request 2fa OTP", "An error occurred while trying to request 2fa otp")
            }



        }),

});