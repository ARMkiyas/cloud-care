

import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];


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
    limit: z.number().default(50),
    page: z.number().default(1),
    cursor: z.string().optional(),
    skip: z.number().optional(),
})    