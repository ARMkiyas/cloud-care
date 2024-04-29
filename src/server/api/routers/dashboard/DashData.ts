import "server-only";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { generateOTP, sendotp } from "@utils/OtpHelper"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "@/utils/ValidationSchemas/commonSc";
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder";
import { UserRoles, Permissions } from "@prisma/client";
import { TRPCError } from "@trpc/server";






export const DashData = createTRPCRouter({

    // Greet the user with a hello message.
    StatsGridData: protectedProcedure
        .query(async ({ ctx, input }) => {

            try {


                const coutappointment = await ctx.db.appointment.count();

                const countpatient = await ctx.db.patient.count();
                const countdoctor = await ctx.db.doctor.count();

                const data = [
                    { title: 'Appointments', icon: 'appointment', value: coutappointment.toString() },
                    { title: 'New Patients', icon: 'patient', value: countpatient.toString() },
                    { title: 'Operations', icon: 'operation', value: '24' },
                    { title: 'Our Doctors', icon: 'doctor', value: countdoctor.toString() },
                ] as const;

                const result = {
                    data: data,
                    status: 200,
                    ok: true,

                }

                return result;

            } catch (error) {
                throw ErrorHandler(error, "Request 2fa OTP", "An error occurred while trying to request 2fa otp")
            }



        }),

});