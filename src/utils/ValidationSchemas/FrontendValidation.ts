import { isNull } from "util";
import { z } from "zod";

const title = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof"] as const;
const gender = ["Male", "Female"] as const;

export const BookAppointmentSchema = z.object({
    slotId: z.string().min(2, "Slot is required"),
    patientTitle: z.enum(title),
    patientFirstName: z.string().min(2, "First Name is required"),
    patientLastName: z.string().min(2, "Last Name is required"),
    idNumber: z.string().min(2, "ID Number is required"),
    patientGender: z.enum(gender),
    patientProblem: z.string().min(20).optional(),
    patientDob: z.date().max(new Date(), "Date of birth cannot be in the future"),
    patientAddress: z.string().optional(),
    patientMobile: z.union([z.string().min(9, "plase provide valid phone number"), z.string().length(0)]).optional().transform(e => e === "" ? undefined : e),
    patientEmail: z.string().email().min(2, "patient's Email is required"),
    AppointmentDate: z.date().min(new Date(), "Appointment Date cannot be in the past"),
    docid: z.string().min(2, "Doctor is required")

})