

import { z } from "zod";




const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const phoneValidationSc = z.string()
    .regex(
        /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$|^\+\d{1,2}\s\(\d{3}\)\s\d{9}$/,
        "Invalid Phone Number, please provide it in international format +94 (123) 456-7890",
    )
    .min(1, "phone is Required")

export const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


export const imageSchema = z
    .instanceof(File)
    .refine((val) => {
        if (val && val?.size > 5000000) {
            return false;
        }
        if (val && !ACCEPTED_IMAGE_TYPES.includes(val.type)) {
            return false;
        }
        return true;
    }, "invalid image file")



export const pagenationSchema = z.object({
    limit: z.number().default(100),
    page: z.number().default(1),
    cursor: z.string().optional(),
    skip: z.number().optional(),
})    