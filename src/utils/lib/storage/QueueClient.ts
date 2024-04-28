import { QueueClient } from "@azure/storage-queue";


// Singleton pattern for creating QueueClient

export class QueueEmailClientSingleton {
    private static instance: QueueClient | undefined;

    private constructor() { }

    public static getInstance(): QueueClient {
        if (!QueueEmailClientSingleton.instance) {
            QueueEmailClientSingleton.instance = new QueueClient(process.env.AZ_QUEUE_SAS_URL, process.env.AZURE_STORAGE_EMAIL_QUEUE_NAME);
        }

        return QueueEmailClientSingleton.instance;
    }
}

export class QueueMessageClientSingleton {
    private static instance: QueueClient | undefined;

    private constructor() { }

    public static getInstance(): QueueClient {
        if (!QueueMessageClientSingleton.instance) {
            QueueMessageClientSingleton.instance = new QueueClient(process.env.AZ_QUEUE_SAS_URL, process.env.AZURE_STORAGE_MESSAGE_QUEUE_NAME);
        }

        return QueueMessageClientSingleton.instance;
    }
}


