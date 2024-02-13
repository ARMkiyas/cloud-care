
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { deleteAppointmentProcedureSchema } from "./validation/schema";



const deleteAppointmentProcedure = protectedProcedure.input(deleteAppointmentProcedureSchema).mutation(async ({ input, ctx }) => {


    try {
        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            return new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }



        const appointment = await ctx.db.appointment.deleteMany({
            where: {
                id: {
                    in: input.appointmentId.trim() ? [input.appointmentId.trim()] : input.deleteMany.map((item) => item.id.trim())
                }
            }
        })

        if (!appointment.count || appointment.count === 0) {
            return new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: "appointment not found"
            })
        }


        return {
            data: appointment,
            status: 200,
            error: null,
            ok: true,
        }


    } catch (error) {


        return ErrorHandler(error, "deleteAppointment", "An error occurred while trying to delete appointment")
    } finally {
        ctx.db.$disconnect()
    }




})


export default deleteAppointmentProcedure