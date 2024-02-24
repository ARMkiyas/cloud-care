
import "server-only"
import { db } from "@/server/db";
import { SignJWT, jwtVerify } from "jose";
import crypto from 'crypto';


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


    await db.user.update({
        where: {
            id: userId
        },
        data: {
            PasswordResetToken: {
                create: {
                    token: jti,
                }
            }
        }
    })

    return jwt;


}

export async function verifyPasswordResetToken(token) {

    const { payload } = await jwtVerify(token, SECRET, {
        issuer: 'CloudCare.Auth',
        audience: 'http://localhost:3000',
        algorithms: [ALGORITHM]
    });

    return payload;


}
