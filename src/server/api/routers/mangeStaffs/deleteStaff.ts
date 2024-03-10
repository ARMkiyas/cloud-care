import "server-only";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error"
import { UserRoles } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { protectedProcedure } from "../../trpc"
import { deleteStaffSchema } from "./validation/schema"



const deleteStaffProceture = protectedProcedure.input(deleteStaffSchema).mutation(async ({ ctx, input }) => {


    try {
        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        const staff = await ctx.db.staff.findUnique({
            where: {
                id: input.staffID
            },
            include: {
                user: true
            }
        })

        if (!staff) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `"Staff to delete does not exist"`,
            })
        }

        if (staff.user && staff.user.id === ctx.session.user.id) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `You cannot delete your own staff profile`,
            })
        }



        const deleteStaff = await ctx.db.staff.delete({
            where: {
                id: input.staffID

            }
        })


        await ctx.db.log.create({
            data: {
                action: `DELETED STAFF ${deleteStaff.title} ${deleteStaff.firstName} ${deleteStaff.lastName} BY ${ctx.session.user.username} ID ${ctx.session.user.id}`,
                timestamp: new Date(),
                user: {
                    connect: {
                        id: ctx.session.user.id
                    }
                }
            }
        })

        return {
            data: deleteStaff,
            error: null,
            status: 200,
            ok: true,
        }

    }
    catch (e) {


        throw ErrorHandler(e, "Staff")


    } finally {
        ctx.db.$disconnect();
    }
})




export default deleteStaffProceture