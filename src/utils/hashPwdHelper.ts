
import "server-only"

import { hash, verify, argon2id } from "argon2";


const config = {
    type: argon2id,
    memoryCost: 12288,
    timeCost: 3,
    parallelism: 1,
}

export async function hashPwd(pwd: string): Promise<string> {

    const salt = await Buffer.from(crypto.getRandomValues(new Uint8Array(16)));

    const hashvalue = await hash(pwd, {
        ...config,
        salt: salt,
    });

    console.log(hashvalue);

    return hashvalue;
}



export async function verifyPwd(pwd: string, hash: string): Promise<boolean> {

    const isMatch = await verify(hash, pwd)
    return isMatch;
}

