import "server-only"

import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import permissions from "./utils/lib/Permissons"



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

        if (req.nextUrl.pathname === "/dashboard" && !req.nextauth.token.Permissions.includes(permissions.DASHBOARD_READ)) {

            return NextResponse.rewrite(new URL("/dashboard/ErrorPages/401", req.url))
        }
        if (req.nextUrl.pathname === "/dashboard/appointments" && !req.nextauth.token.Permissions.includes(permissions.APPOINTMENTS_READ)) {
            return NextResponse.rewrite(new URL("/dashboard/ErrorPages/401", req.url))
        }
        if (req.nextUrl.pathname === "/dashboard/shedule" && !req.nextauth.token.Permissions.includes(permissions.SCHEDULES_READ)) {
            return NextResponse.rewrite(new URL("/dashboard/ErrorPages/401", req.url))
        }
        if (req.nextUrl.pathname === "/dashboard/patients" && !req.nextauth.token.Permissions.includes(permissions.PATIENTS_READ)) {
            return NextResponse.rewrite(new URL("/dashboard/ErrorPages/401", req.url))
        }
        if (req.nextUrl.pathname === "/dashboard/user-management" && !req.nextauth.token.Permissions.includes(permissions.USERS_READ)) {
            return NextResponse.rewrite(new URL("/dashboard/ErrorPages/401", req.url))
        }
        if (req.nextUrl.pathname === "/dashboard/staffs/" && !req.nextauth.token.Permissions.includes(permissions.STAFF_READ)) {
            return NextResponse.rewrite(new URL("/dashboard/ErrorPages/401", req.url))
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