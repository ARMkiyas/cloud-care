import "server-only";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { generateOTP, sendotp } from "@utils/OtpHelper"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "@/utils/ValidationSchemas/commonSc";
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder";




const imageuploadLinkschema = z.object({
    imagetype: z.enum(["image/jpg", ...ACCEPTED_IMAGE_TYPES]),
    name: z.string(),
    existingImage: z.string().optional(),
})



export const requestimgUploadLink = createTRPCRouter({

    // Greet the user with a hello message.
    request: protectedProcedure.input(imageuploadLinkschema)
        .mutation(async ({ ctx, input }) => {

            try {

                console.log("input", input);
                console.log(input.imagetype.split("/")[1]);
                const url = await userImageUploader(input.name, input.imagetype, input.existingImage)

                const result = {
                    data: url,
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