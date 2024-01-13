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

import { generateOTP, verifyOtp } from "@utils/OtpHelper"
import { date, z } from "zod";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { EncryptJWT, SignJWT, base64url, jwtVerify, jwtDecrypt } from "jose";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 * debug page http://localhost:3000/api/auth/signin
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
const SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET,
)

declare module "next-auth" {



  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      username: string;
      _2fa_valid: boolean;
      twoFactorEnabled: boolean;
      iat: number;
      access_token: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    username: string;
    _2fa_valid: boolean;
    twoFactorEnabled: boolean;
    access_token: string;
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
    _2fa_valid: boolean;
    twoFactorEnabled: boolean;
    iat: number;
    access_token: string;

  }
}


interface accesstokenpayload {
  usserid: string;
  role: string;
  username: string;
  email: string;

}

const primsa = new PrismaClient()

const getaccesstoken = async (payload: accesstokenpayload) => {


  // const secretjwe = base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')

  const token = await new SignJWT({
    ...payload
  }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setIssuer("CloudCare.Auth").setExpirationTime("2m").sign(SECRET)



  // const jwt = await new EncryptJWT({ ...payload })
  //   .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
  //   .setIssuedAt()
  //   .setIssuer('cloudCare')
  //   .setExpirationTime('15m')
  //   .encrypt(secretjwe)

  return token



}


/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(primsa) as Adapter,
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXT_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: '/auth/signout',
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },

      },
      async authorize({ username, password }) {
        try {
          const usertemp = username.trim()

          const data = z.string().email().safeParse(usertemp).success ? {
            email: usertemp
          } : {
            username: usertemp
          }



          const user = await db.user.findUnique({
            where: {
              ...data
            },
            include: {
              Permission: {
                select: {
                  name: true,
                },

              },
              role: {
                select: {
                  role: true,
                }
              }
            }
          })





          if (!user) return null

          const isvalid = await verifyPwd(password, user.password)

          if (isvalid && isvalid !== undefined) {

            //Any object returned will be saved in `user` property of the JWT

            if (user.twoFactorEnabled) {

              const otp = await generateOTP(user.twoFactorSecret)

              console.log("2fa otp:", otp);

            }


            return {
              ...user,
              role: user.role.role,
              _2fa_valid: user.twoFactorEnabled ? false : true,
            } as any


          } else {

            //If you return null then an error will be displayed advising the user to check their details.
            return null

          }
        } catch (e) {
          throw new Error("Error in credentials provider")
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

        try {
          const session = await getServerAuthSession()
          console.log(session.user);
          if (session.user) {

            const verify = await verifyOtp(session.user.id, token)


            if (verify) {
              return {
                ...session.user,
                _2fa_valid: true,
              } as any
            }
            return null
          }
          return null
        } catch (e) {
          throw new Error("Error in 2fa provider")
        }




      },
    })
  ],
  callbacks: {

    async signIn() {
      console.log("sign in callback");
      return true
    },

    async jwt({ token, user, account, profile, isNewUser }) {




      if (user && account) {
        const access_token = account.provider === "2fa" && await getaccesstoken({
          email: user.email,
          role: user.role,
          usserid: user.id,
          username: user.username
        })



        return {
          ...token,
          id: user.id,
          role: user.role,
          username: user.username,
          _2fa_valid: user._2fa_valid,
          twoFactorEnabled: user.twoFactorEnabled,
          ...account.provider === "2fa" && { access_token: access_token },

        }

      }




      if (token.access_token) {
        console.log("token", token);

        const verify = await jwtVerify(token.access_token, SECRET).catch((e) => {
          return e.name
        })
        console.log("verify", verify);

        if (verify === "JWTExpired") {

          const newaccess_token = await getaccesstoken({
            email: token.email,
            role: token.role,
            usserid: token.id,
            username: token.username
          })

          const newtoken = {
            ...token,
            access_token: newaccess_token,
          }
          console.log(newtoken);

          return newtoken

        }


      }
      return token
    },

    async session({ session, token, user }) {


      return {
        ...session,
        user: {
          ...session.user,
          role: token?.role,
          id: token?.id,
          username: token?.username,
          _2fa_valid: token?._2fa_valid,
          twoFactorEnabled: token?.twoFactorEnabled,
          access_token: token?.access_token,
          iat: token.iat
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
export const getServerAuthSession = () => getServerSession(authOptions);