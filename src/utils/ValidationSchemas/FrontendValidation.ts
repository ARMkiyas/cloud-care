import { isNull } from "util";
import { z } from "zod";
import { imageSchema } from "./commonSc";
import { adminDepartment, AdminJobTitle, DoctorSpecialization, MedicalDepartments, OtherJobTitles } from "../comonDatas";

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



export const createStaffSchema = z
    .object({
        title: z.enum(title),
        firstName: z.string().min(1, "First Name is Required"),
        lastName: z.string().min(1, "Last Name is Required"),
        idType: z.enum(["NIC", "Passport"]),
        GovtId: z.string().min(1, "GovtId is Required").min(10, "Invalid GovtId"),
        idNumber: z.string().min(1, "Worker Id Number is Required"),
        dob: z.date(),
        email: z
            .string()
            .email({
                message: "Invalid Email Address",
            })
            .min(1, "Email is Required"),
        phone: z
            .string()

            .regex(
                /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$|^\+\d{1,2}\s\(\d{3}\)\s\d{9}$/,
                "Invalid Phone Number, please provide it in international format +94 (123) 456-7890",
            )
            .min(1, "phone is Required"),
        gender: z.enum(gender),

        picture: imageSchema.nullable().optional(),
        department: z.union([z.enum(adminDepartment), z.enum(MedicalDepartments)], {
            required_error: "Department is required",
            invalid_type_error: "Invalid Department",
        }),
        jobtitle: z
            .union([z.enum(AdminJobTitle), z.enum(OtherJobTitles)])
            .nullish()
            .optional(),
        DoctorSpecialization: z.enum(DoctorSpecialization).nullish().optional(),

        staffType: z.enum(["doctor", "nurse", "admin", "others"], {
            required_error: "Staff Type is required",
            invalid_type_error: "staff Type is required",
        }),
    })
    .superRefine((data, ctx) => {
        if (data.staffType === "doctor" && !data.DoctorSpecialization) {
            ctx.addIssue({
                message: "Doctor Specialization is required",
                code: "custom",
                fatal: true,
                path: ["DoctorSpecialization"],
            });
        }
        if (
            (data.staffType === "admin" || data.staffType === "others") &&
            !data.jobtitle
        ) {
            ctx.addIssue({
                message: "Job Title is required",
                code: "custom",
                path: ["jobtitle"],
            });
        }

        if (data.idType === "NIC" && data.GovtId.length > 12) {
            ctx.addIssue({
                message: "NIC Number is Invalid",
                code: "custom",
                path: ["GovtId"],
            });
        }
    });

