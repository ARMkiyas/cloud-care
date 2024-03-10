import "server-only";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { User, UserRoles } from "@prisma/client"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { getUserschema } from "./validation/schema";






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

        throw ErrorHandler(error, "User")
    } finally {
        ctx.db.$disconnect();
    }

})



export default getUsers;