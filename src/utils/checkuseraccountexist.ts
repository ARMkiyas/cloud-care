import { db } from "@/server/db"
import "server-only"


export const checkuseraccountexist = (userid: string) => {


    const user = db.user.findUnique({
        where: {
            id: userid
        },
        select: {
            "id": true,
            "username": true
        }
    })

    console.log(user);

    return !!user

}