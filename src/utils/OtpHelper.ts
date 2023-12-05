import "server-only"

import { authenticator, totp } from "otplib"
import { db } from "@/server/db";



export async function enableTwoFactorAuth(username) {
    // Generate a TOTP secret key
    const otpSecret = authenticator.generateSecret();

    // Store the TOTP secret key in the database for the user based on contactType

    console.log(otpSecret);
    console.log(username);

    await db.user.update({
        where: { username: username },
        data: {
            twoFactorSecret: otpSecret,
        },
    });


}


// Helper function to send SMS OTP using Twilio
export async function sendOtp(username) {

    // Get the user from the database
    const user = await db.user.findFirst({
        where: {
            username: username,
        },
    });


    const otpCode = authenticator.generate(user.twoFactorSecret);

    return otpCode
}
