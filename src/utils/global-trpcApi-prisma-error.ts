import "server-only";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { TRPCError } from "@trpc/server"

type globalTrpcApiPrismaErrorHandlerType = (
    error: any,
    ctx: string,
    message?: string,
    action?: string
) => void


const ErrorHandler: globalTrpcApiPrismaErrorHandlerType = (error, ctx, action, message) => {

    if (error instanceof PrismaClientKnownRequestError) {

        switch (error.code) {
            case "P2002":
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: message ? message : `${ctx} with ${error.meta.target} already exists`,
                    cause: error.message
                })

            case "P2025":
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: message ? message : `${ctx} to ${action} does not exist.`,
                    cause: error.message
                })

            case "P2014":
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: message ? message : `${ctx} already has an record`,
                    cause: error.message
                })

            case "P2025":
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: message ? message : `Invalid ${error.meta.target}, required record does not exist or is not connected`,
                    cause: error.message
                })


            case "P2016":
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: message ? message : `Invalid ${error.meta.target},Query interpretation error.`,
                    cause: error.message
                })

            case "P2020":
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: message ? message : `Invalid ${error.meta.target}`,
                    cause: error.message
                })
        }



    }

    return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
    })

}


export default ErrorHandler;