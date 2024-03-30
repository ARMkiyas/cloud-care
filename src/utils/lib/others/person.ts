export const title = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof"] as const;
export const gender = ["Male", "Female"] as const;



export type Ttitle = (typeof title)[number];