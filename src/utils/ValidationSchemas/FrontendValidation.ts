import { z } from "zod";

const title = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof"] as const;
const gender = ["Male", "Female"] as const;

export const BookAppointmentSchema = z.object({
    slotId: z.string(),
    patientTitle: z.enum(title),
    patientFirstName: z.string().min(2),
    patientLastName: z.string().min(2),
    idNumber: z.string().min(7),
    patientGender: z.enum(gender),
    patientProblem: z.string().min(20).optional(),
    patientDob: z.date(),
    patientAddress: z.string().min(5).optional(),
    patientMobile: z.string().min(9).max(14).optional(),
    patientEmail: z.string().email(),
    AppointmentDate: z.date(),
    docid: z.string(),
});