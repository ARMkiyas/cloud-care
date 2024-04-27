import { imageSchema } from "@utils/ValidationSchemas/commonSc";
import { z } from "zod";
import { BlobClientSingleton } from "../lib/storage/BlobClient";
import { BlobSASPermissions } from "@azure/storage-blob";

type userImageUploadertype = (
  name: string,
  filetype: string,
  existingImageUrl?: string,
) => Promise<{
  url: string;
  blobname: string;
}>;

export const userImageUploader: userImageUploadertype = async (
  name,
  filetype,
  existingImageUrl?,
) => {
  try {
    const clinet = BlobClientSingleton.getInstance();

    const containerClient = clinet.getContainerClient(
      process.env.AZ_BLOB_CONTAINER_NAME,
    );

    const imageextetion = filetype.split("/")[1];

    console.log("imageextetion", imageextetion);

    const blobname = `${name}-${new Date().toISOString()}-${crypto.randomUUID()}.${imageextetion}`;

    const blockBlobClient = containerClient.getAppendBlobClient(blobname);

    // await blockBlobClient.uploadData(file);

    const url = await blockBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("w"),
      expiresOn: new Date(new Date().valueOf() + 86400),
      contentType: filetype,
    });

    console.log("url", url);
    return {
      url: url,
      blobname: blobname,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Error while uploading image");
  }
};
