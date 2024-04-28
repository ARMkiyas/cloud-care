import { BlobServiceClient } from "@azure/storage-blob";


// Singleton pattern for creating QueueClient

export class BlobClientSingleton {
    private static instance: BlobServiceClient | undefined;

    private constructor() { }

    public static getInstance(): BlobServiceClient {
        if (!BlobClientSingleton.instance) {
            BlobClientSingleton.instance = BlobServiceClient.fromConnectionString(process.env.AZ_BLOB_SAS_URL);
        }

        return BlobClientSingleton.instance;
    }
}

