import "server-only"

import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  DefaultUser,

} from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { Adapter } from "next-auth/adapters";
import { hashPwd, verifyPwd } from "@utils/hashPwdHelper";
import { JWT } from "next-auth/jwt";
import { sendOtp } from "@utils/OtpHelper"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 * debug page http://localhost:3000/api/auth/signin
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {



  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      username: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    username: string;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    username: string;
  }
}




/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXT_SECRET,
  pages: {
    signIn: "/auth/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },

      },
      async authorize({ username, password }) {
        // const user = { username: "testuser", password: "password", name: "testuser", email: "test@example.com" }


        const user = await db.user.findUnique({
          where: {
            username: username,
          }
        })



        if (!user) return null


        const isvalid = await verifyPwd(password, user.password)

        console.log(isvalid);


        if (isvalid && isvalid !== undefined) {
          //Any object returned will be saved in `user` property of the JWT
          return user as any
        } else {

          //If you return null then an error will be displayed advising the user to check their details.
          return null

        }


      }

    }),
    CredentialsProvider({
      name: "2fa",
      id: "2fa",
      credentials: {

        token: { label: "2FA Key" },
      },
      async authorize({ token }) {
        ;
        const session = getServerSession(authOptions)

        if (session) {

          const otp = await sendOtp((await session).user.username)
          console.log(otp);

        }


        console.log((await session).user);
        // const user = await db.user.findFirst({
        //   where: {
        //     username: username,
        //   },
        // })



        return null

      },
    })
  ],
  callbacks: {




    async jwt({ token, user, account, profile, isNewUser }) {

      // passing some user property into the token

      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          username: user.username
        }
      }

      return token
    },

    async session({ session, token, user }) {

      // passing some user property into the session from the token

      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.id,
          username: token.username
        }
      }

    }

  },





};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
