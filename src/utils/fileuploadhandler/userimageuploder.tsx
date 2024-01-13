import { imageSchema } from "@utils/ValidationSchemas/commonSc";
import { z } from "zod";

type userImageUploadertype = (
  file: z.infer<typeof imageSchema>,
  existingImageUrl?: string,
) => Promise<string>;

export const userImageUploader: userImageUploadertype = async (
  file,
  existingImageUrl?,
) => {
  return "imgeurl";
};
