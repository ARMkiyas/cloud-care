
export const Appointmentstatus = [
    "Pending",
    "Active",
    "Confirmed",
    "Cancelled",
    "Completed",
] as const;




export const DoctorSpecialization = [
    "GENERAL_PRACTITIONER",
    "Surgeon",
    "CARDIOLOGIST",
    "ORTHOPEDIC_SURGEON",
    "PEDIATRICIAN",
    "OBSTETRICIAN_GYNECOLOGIST",
    "NEUROLOGIST",
    "DERMATOLOGIST",
    "OPHTHALMOLOGIST",
    "OTOLARYNGOLOGIST",
    "GASTROENTEROLOGIST",
    "UROLOGIST",
    "PSYCHIATRIST",
    "ENDOCRINOLOGIST",
    "PULMONOLOGIST",
    "RHEUMATOLOGIST",
    "INFECTIOUS_DISEASE_SPECIALIST",
    "NEPHROLOGIST",
    "HEMATOLOGIST",
    "ONCOLOGIST",
    "ALLERGIST_IMMUNOLOGIST",
    "GERIATRICIAN",
    "EMERGENCY_MEDICINE_PHYSICIAN",
    "ANESTHESIOLOGIST",
    "RADIOLOGIST",
    "INTENSIVIST"
] as const;


export const AdminJobTitle = [
    "OPD_Manager",
    "OPD_Nurse_Manager",
    "Director_Admissions",
    "Patient_Services_Representative",
    'Medical_Records_Technician',
    "Unit_Secretary",
    "Switchboard_Operator",
    "HR_Representative",
    "Human_Resources_Manager",
    "Recruiter",
    'Benefits_Coordinator',
    "Training_And_Development_Specialist",
    'Employee_Relations_Specialist',
    "Health_Information_Management_Director",
    "IT_Support_Specialist",
    'Network_Administrator',
    'Cybersecurity_Analyst',
    "Applications_Analyst",
    "Facilities_Manager",
    'Biomedical_Equipment_Technician',
    'HVAC_Technician',
    'Carpenter',
    "Electrician",
    "Security_Director",
    'Security_Officer',
] as const;


export const MedicalDepartments = [
    "Emergency",
    "Internal_Medicine",
    "Pediatrics",
    "Obstetrics_Gynecology",
    "Surgery",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Ophthalmology",
    "Otolaryngology",
    "Gastroenterology",
    "Urology",
    "Psychiatry",
    "Radiology",
    "Anesthesiology",
    "Laboratory_Services",
    "Pharmacy",
    "Physical_Therapy",
    "Nursing",
    "Public_Relations_Marketing",
    "Outpatient_department"
] as const;

export const OtherJobTitles = [
    "Imaging_Technician",
    "Medical_Assistant",
    "Medical_Laboratory_Technician",
    "Medical_Laboratory_Scientist",
    "Medical_Transcriptionist",
    "Medical_Records_Clerk",
    'Medical_Records_Technician',
    "Medical_Secretary",
    "Medical_Services_Manager",
    'Medical_Social_Worker',
    'Medical_Technologist',
    "Patient_Safety_Specialist",
    'Emergency_Preparedness_Coordinator',
] as const;


export const adminDepartment = [
    "Administration",
    "HR",
    "IT",
    "Maintenance",
    "Security"] as const;



export const stafftypes = ["all-staffs", "doctors", "nurses", "admins", "others"] as const;


export type TstaffTypes = (typeof stafftypes)[number]

export type TDoctorSpecialization = (typeof DoctorSpecialization)[number]

export type TadminDepartment = (typeof adminDepartment)[number]

export type TMedicalDepartments = (typeof MedicalDepartments)[number]

export type TOtherJobTitles = (typeof OtherJobTitles)[number]

export type TAdminJobTitle = (typeof AdminJobTitle)[number]

export type TAppointmentstatus = (typeof Appointmentstatus)[number]

