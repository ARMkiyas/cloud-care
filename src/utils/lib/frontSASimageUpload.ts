"use client";

import { AnonymousCredential, BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";



export async function frontSASimageUpload(sasurl: string, blobname, file: File) {

    try {



        const blockBlobClient = new BlockBlobClient(sasurl, new AnonymousCredential());

        const data = await blockBlobClient.uploadBrowserData(file)


        return blobname;



    } catch (error) {
        throw new Error("Error while uploading image");
    }





}