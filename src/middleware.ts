import { withAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log(req)
    },
    {
        pages: {
            signIn: "/auth/login",
        }
    }

)




export const config = { matcher: ["/dashboard"] }