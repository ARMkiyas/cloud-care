import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { User, UserRoles } from "@prisma/client"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";

const getUserschema = z.object({
    userid: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    role: z.enum([UserRoles.ADMIN, UserRoles.ROOTUSER, UserRoles.STAFF, UserRoles.DOCTOR, UserRoles.NURSE, UserRoles.GUEST]).optional(),
    staffid: z.string().optional(),
    name: z.string().optional(),
})



const getUsers = protectedProcedure.input(getUserschema).query(async ({ ctx, input }) => {

    try {



        const users = await ctx.db.user.findMany({
            where: {
                id: {
                    equals: input.userid ? input.userid.trim() : undefined
                },
                username: {
                    contains: input.username ? input.username.trim() : undefined
                },
                name: {
                    contains: input.name ? input.name.trim() : undefined
                },
                email: {
                    contains: input.email ? input.email.trim() : undefined
                },
                phone: {
                    contains: input.phone ? input.phone.trim() : undefined
                },
                role: {
                    role: {
                        equals: input.role
                    }
                },
                staffid: {
                    equals: input.staffid ? input.staffid.trim() : undefined
                }
            },
            select: {
                username: true,
                role: true,
                twoFactorEnabled: true,
                name: true,
                id: true,
                email: true,
                phone: true,
                staffid: true,
                _count: {
                    select: {
                        Log: true

                    }
                }
            }

        })

        return {
            status: 200,
            error: null,
            ok: true,
            data: users
        }


    } catch (error) {

        return ErrorHandler(error, "User")
    }

})



export default getUsers;