import "server-only"

import { authenticator, totp } from "otplib"
import { db } from "@/server/db";


// Configure the authenticator with custom options for 30 minute window,
authenticator.options = {
    step: 2000, //


}

export async function enableTwoFactorAuth(username) {
    // Generate a TOTP secret key
    const otpSecret = authenticator.generateSecret();

    // Store the TOTP secret key in the database for the user based on contactType

    await db.user.update({
        where: { username: username },
        data: {
            twoFactorSecret: otpSecret,
        },
    });


}


export function generate2FASecret() {
    // Generate a TOTP secret key
    const otpSecret = authenticator.generateSecret();

    return otpSecret
}


// Helper function to send SMS OTP using Twilio
export async function generateOTP(secret) {


    const otpCode = authenticator.generate(secret);

    return otpCode
}



export async function verifyOtp(userID, otp) {
    // Get the user from the database
    const user = await db.user.findFirst({
        where: {
            id: userID,
        },
    });

    // Verify the OTP code provided by the user
    const isValid = authenticator.verify({
        token: otp,
        secret: user?.twoFactorSecret || "",
    });

    return isValid
}
