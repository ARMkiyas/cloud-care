import "server-only"

import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  DefaultUser,


} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import type { Adapter } from "next-auth/adapters";
import { hashPwd, verifyPwd } from "@utils/hashPwdHelper";

import { generateOTP, sendotp, verifyOtp } from "@utils/OtpHelper"
import { date, z } from "zod";
import { PrismaClient, Permissions, UserRoles } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { EncryptJWT, SignJWT, base64url, jwtVerify, jwtDecrypt } from "jose";




const profileUpdateSchema = z.object({
  name: z.string().min(1, "name Requred"),
  email: z.string().email(),
  phone: z.string().optional(),
  image: z.string(),
  username: z.string().min(1, "username Requred"),
  twoFactorEnabled: z.boolean(),


})
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
      role: UserRoles;
      phone?: string;
      Permissions: Permissions[],
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
    role: UserRoles;
    phone?: string;
    Permissions: Permissions[],
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
    role: UserRoles;
    phone?: string;
    Permissions: Permissions[],
    username: string;
    _2fa_valid: boolean;
    twoFactorEnabled: boolean;
    iat: number;
    access_token: string;

  }
}


interface accesstokenpayload {
  usserid: string;
  role: UserRoles;
  Permissions: Permissions[],
  username: string;
  email: string;
  phone?: string;

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
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 days
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
                  permissions: true
                }
              }
            }
          })




          console.log(user);


          if (!user) return null

          const isvalid = await verifyPwd(password, user.password)


          if (isvalid && isvalid !== undefined) {


            //Any object returned will be saved in `user` property of the JWT
            console.log(isvalid);
            if (user.twoFactorEnabled) {

              await sendotp(user.username, user.twoFactorSecret, user.email, user.phone)


            }




            return {
              ...user,
              role: user.role.role,
              Permissions: user.role?.permissions,
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

    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {


      if (trigger === "update") {
        console.log(session && profileUpdateSchema.safeParse(session).success);
        if (session && profileUpdateSchema.safeParse(session).success) {
          return {
            ...token,
            name: session.name || token.name,
            email: session.email || token.email,
            phone: session?.phone || token?.phone,
            image: session.image || token.image,
            username: session.username || token.username,
            picture: session.image || token.image,
            twoFactorEnabled: session.twoFactorEnabled || token.twoFactorEnabled,
          }
        }


        return token
      }

      if (user && account) {
        const access_token = account.provider === "2fa" && await getaccesstoken({
          email: user.email,
          phone: user?.phone,
          role: user.role,
          usserid: user.id,
          username: user.username,
          Permissions: user?.Permissions
        })



        return {
          ...token,
          id: user.id,
          phone: user?.phone,
          role: user.role,
          Permissions: user?.Permissions,
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
            phone: token?.phone,
            role: token.role,
            usserid: token.id,
            username: token.username,
            Permissions: token?.Permissions
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
          Permissions: token?.Permissions,
          phone: token?.phone,
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