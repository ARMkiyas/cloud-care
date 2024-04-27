export async function get_imageSigedURL(ref) {

    const url = `https://cloudcarefileupload.blob.core.windows.net/${process.env.AZ_BLOB_CONTAINER_NAME}/${ref}?${process.env.AZ_BLOB_READ_KEY}`;
    return url;
}