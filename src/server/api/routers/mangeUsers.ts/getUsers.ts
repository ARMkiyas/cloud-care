import "server-only";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { Prisma, User, UserRoles } from "@prisma/client"
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { getUserschema } from "./validation/schema";
import { TRPCError } from "@trpc/server";






const getUsers = protectedProcedure.input(getUserschema).query(async ({ ctx, input }) => {

    try {

        if ((ctx.session.user.role !== UserRoles.ADMIN) && (ctx.session.user.role !== UserRoles.ROOTUSER)) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You are not authorized to perform this action",
            })
        }


        const userQuery = {
            skip: input.page > 1 ? (input.page - 1) * input.limit : 0,
            take: input.limit + 1,
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

        } satisfies Prisma.UserFindManyArgs

        const [users, count] = await ctx.db.$transaction([
            ctx.db.user.findMany(userQuery),
            ctx.db.user.count({
                where: userQuery.where
            })
        ])


        let nextCursor: typeof input.cursor | undefined = undefined

        if (users.length > input.limit) {
            nextCursor = users[users.length - 1].id
            users.pop()
        }



        return {
            status: 200,
            pagenation: {
                nextCursor: nextCursor,
                pages: input.page,
                total: count
            },
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