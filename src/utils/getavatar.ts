
import { gender } from "@prisma/client"


export const avatarList = {

    doctor_male: "/img/avatar/doc-male.png",
    doctor_female: "/img/avatar/doc-female.png",
    nurse_male: "/img/avatar/nurse-male.png",
    nurse_female: "/img/avatar/nurse-female.png",
    person_male: "/img/avatar/person-male.png",
    person_female: "/img/avatar/person-female.png",

}

type avatarType = "doctor" | "nurse" | "person"


export const getAvatar = (type: avatarType, gender: gender) => {



    return avatarList[`${type}_${gender}`]


}