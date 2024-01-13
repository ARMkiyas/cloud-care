import "server-only"

import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { decode } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { apiedge } from "@/utils/trpc/TrpcEdgeApi"


export default withAuth(


    // `withAuth` augments your `Request` with the user's token.
    async function middleware(req: NextRequestWithAuth) {



        // const res = await apiedge.example.hello.fetch({
        //     text: "hello",

        // })



        if (!req.nextauth.token._2fa_valid && req.nextUrl.pathname !== "/auth/confirmation-otp") {
            // If the token is not valid, redirect to the 2FA page.
            console.log("2FA is not valid, redirecting to 2FA page")

            return NextResponse.redirect(new URL("auth/confirmation-otp", req.nextUrl.origin))
        }
        if (req.nextauth.token._2fa_valid && req.nextUrl.pathname === "/auth/confirmation-otp") {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin))
        }

    },
    {



        callbacks: {
            authorized({ token, req }) {
                return !!token
            }

        },
        pages: {
            signIn: "/auth/login",
            signOut: '/auth/signout',
        }
    },


)




export const config = { matcher: ["/(dashboard(?:\/.*)?$)/", "/auth/confirmation-otp", "/api/trpc-playground"] }