import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { UserRoles, } from "@prisma/client"
import { z } from "zod";


const getStaffschema = z.object({
    email: z.string().email().optional(),
    id: z.string().optional(),
    NIC: z.string().optional(),
    Passport: z.string().optional(),
    name: z.string().optional(),
})


const manageStaffRouter = createTRPCRouter({

    getStaff: protectedProcedure
        .input(getStaffschema.optional())
        .query(async ({ ctx, input }) => {

            try {
                if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
                    return new TRPCError({
                        code: "UNAUTHORIZED",
                        message: "You are not authorized to perform this action",
                    })
                }



                const staff = await ctx.db.staff.findMany()

                return {
                    status: 200,
                    ok: true,
                    data: staff
                }


            } catch (e) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Error in fetching staff",
                    cause: e.message
                })
            }



        }),

});





export default manageStaffRouter;