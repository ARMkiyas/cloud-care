import "server-only";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@prisma/client";
import { hashPwd } from "@/utils/hashPwdHelper";
import { userImageUploader } from "@/utils/fileuploadhandler/userimageuploder";
import { imageSchema } from "@/utils/ValidationSchemas/commonSc";
import { getAvatar } from "@/utils/getavatar";
import { generate2FASecret } from "@/utils/OtpHelper";
import ErrorHandler from "@/utils/global-trpcApi-prisma-error";
import { adduserschema } from "./validation/schema";




const addUser = protectedProcedure.input(adduserschema).mutation(async ({ ctx, input }) => {

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
            }
        })

        if (!staff) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Staff not found",
            })
        }

        const user = await ctx.db.user.create({
            data: {
                name: `${staff.title}.${staff.firstName} ${staff.firstName}`,
                email: staff.email.trim(),
                phone: staff.phone.trim(),
                Log: {
                    create: {
                        action: `CREATED USER ACCOUNT BY ${ctx.session.user.username}`,
                        timestamp: new Date()
                    }
                },
                username: input.username.trim(),
                password: await hashPwd(input.password),
                twoFactorEnabled: input.twoFactorEnabled === false ? false : true,
                twoFactorSecret: input.twoFactorEnabled === false ? undefined : generate2FASecret(),
                image: input.image ? await userImageUploader(input.image) : staff.image ? staff.image : getAvatar("person", staff.gender),
                role: {
                    connect: {
                        role: input.role ? input.role : UserRoles.GUEST
                    }
                },
                staff: {
                    connect: {
                        id: input.staffID.trim()
                    }
                }

            }
        })

        return {
            status: 200,
            error: null,
            ok: true,
            data: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                staffid: user.staffid,

            }
        }





    } catch (err) {
        return ErrorHandler(err, "User")
    } finally {
        ctx.db.$disconnect();
    }




})



export default addUser;


