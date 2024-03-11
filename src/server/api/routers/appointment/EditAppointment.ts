
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { EditAppointmentProcedureSchema } from "./validation/schema";
import { assert, count } from "console";



const EditAppointmentProcedure = protectedProcedure.input(EditAppointmentProcedureSchema).mutation(async ({ input, ctx }) => {


    try {
        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER) && (ctx.session.user.role !== UserRoles.DOCTOR)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        // if (ctx.session.user.role === UserRoles.DOCTOR) {
        //     const checkitDoctorsAppointment = await ctx.db.appointment.findFirst({
        //         where: {
        //             id: {
        //                 equals: input.appointmentId.trim()
        //             },
        //             doctorId: {
        //                 equals: ctx.session.user.id.trim()
        //             }
        //         }
        //     })

        //     if (!checkitDoctorsAppointment) {
        //         throw new TRPCError({
        //             code: "UNPROCESSABLE_CONTENT",
        //             message: "appointment not found"
        //         })
        //     }
        // }



        const appointment = await ctx.db.$transaction(
            input.data.map((item) => {
                return ctx.db.appointment.update({
                    where: {
                        id: item.id

                    },
                    data: {
                        status: item.status,
                    }
                })

            })

        )



        if (appointment.length <= 0) {
            throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "appointment is not found or already updated"
            })

        }





        return {
            data: {
                count: appointment.length,
                message: "appointment updated successfully"
            },
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {
        console.log(error);

        throw ErrorHandler(error, "Update Appointment", "An error occurred while trying to delete appointment")
    } finally {
        ctx.db.$disconnect()
    }




})


export default EditAppointmentProcedure