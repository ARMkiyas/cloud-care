
import "server-only"
import { db } from "@/server/db";
import { SignJWT, jwtVerify } from "jose";
import crypto from 'crypto';
import { SendPwdResetMailPayloadT, SendPwdResetMessagePayloadT } from "@/utils/types";
import { addQueue_ToSend } from "../com_queue";


const SECRET = new TextEncoder().encode(
    process.env.RESET_PASSWORD_TOKEN_SECRET
)
const ALGORITHM = "HS256";

export async function generatePasswordResetToken(userId) {
    const jti = crypto.randomBytes(64).toString('hex');
    const payload = {
        userId,
        jti, // Set expiration time in seconds
    };
    const jwt = await new SignJWT(payload).setProtectedHeader({ alg: ALGORITHM })
        .setIssuedAt()
        .setIssuer('CloudCare.Auth')
        .setAudience('http://localhost:3000')
        .setExpirationTime('24h')
        .setSubject('password-reset')
        .sign(SECRET);


    const user = await db.user.update({
        where: {
            id: userId
        },
        data: {
            PasswordResetToken: {
                create: {
                    token: jti,
                }
            }
        },
        select: {
            email: true,
            phone: true,
            username: true
        }
    })


    return {
        jwt,
        user
    };


}



export async function sendPasswordReset(userId, mode: "email" | "phone") {

    const { jwt, user } = await generatePasswordResetToken(userId)


    const reseturl = `${process.env.APP_URL}/auth/reset/${jwt}`

    const comondata = {
        url: reseturl,
        username: user.username
    }


    if (mode === "email") {

        const Emailmessage: SendPwdResetMailPayloadT = {
            email: user.email,
            ...comondata
        }



        await addQueue_ToSend(Emailmessage, "pwd-reset", "email")

    }


    if (mode === "phone" && user.phone) {
        const WpMessage: SendPwdResetMessagePayloadT = {
            phoneNumber: user.phone,
            ...comondata
        }


        await addQueue_ToSend(WpMessage, "pwd-reset", "wp")
    }



}


export async function verifyPasswordResetToken(token) {

    const { payload } = await jwtVerify(token, SECRET, {
        issuer: 'CloudCare.Auth',
        audience: 'http://localhost:3000',
        algorithms: [ALGORITHM]
    });

    return payload;


}
