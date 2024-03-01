export type FormValues = {
    patientTitle: "Mr" | "Mrs" | "Ms" | "Miss" | "Dr" | "Prof" | null;
    patientFirstName: string;
    patientLastName: string;
    idType: "NIC" | "Passport" | null;
    idNumber: string;
    patientGender: "Male" | "Female" | null;
    patientDob: Date | null;
    patientAddress: string;
    patientMobile: string;
    patientEmail: string;
    patientNote: string;
    AppointmentDate: Date | null;
    slotId: string;
    docid: string;
};


