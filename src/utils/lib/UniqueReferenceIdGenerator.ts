function generateUniqueReferenceId(prefix: string = 'cloudcare'): string {
    const timestamp = Date.now().toString(36); // Base 36 for compactness
    const randomSuffix = Math.random().toString(36).substring(2, 6); // First 2 chars are redundant
    return `${prefix}-${timestamp}-${randomSuffix}`;
}

export default generateUniqueReferenceId;
