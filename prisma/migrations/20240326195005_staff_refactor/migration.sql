/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DepartmentToDoctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DepartmentToNurse` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AdminJobTitle" AS ENUM ('OPD_Manager', 'OPD_Nurse_Manager', 'Director_Admissions', 'Patient_Services_Representative', 'Medical_Records_Technician', 'Unit_Secretary', 'Switchboard_Operator', 'HR_Representative', 'Human_Resources_Manager', 'Recruiter', 'Benefits_Coordinator', 'Training_And_Development_Specialist', 'Employee_Relations_Specialist', 'Health_Information_Management_Director', 'IT_Support_Specialist', 'Network_Administrator', 'Cybersecurity_Analyst', 'Applications_Analyst', 'Facilities_Manager', 'Biomedical_Equipment_Technician', 'HVAC_Technician', 'Carpenter', 'Electrician', 'Security_Director', 'Security_Officer', 'Patient_Safety_Specialist', 'Emergency_Preparedness_Coordinator');

-- CreateEnum
CREATE TYPE "MedicalDepartments" AS ENUM ('Emergency', 'Internal_Medicine', 'Pediatrics', 'Obstetrics_Gynecology', 'Surgery', 'Orthopedics', 'Cardiology', 'Neurology', 'Dermatology', 'Ophthalmology', 'Otolaryngology', 'Gastroenterology', 'Urology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Laboratory_Services', 'Pharmacy', 'Physical_Therapy', 'Nursing', 'Public_Relations_Marketing', 'Outpatient_department');

-- CreateEnum
CREATE TYPE "MedicalJobTitles" AS ENUM ('Nurse', 'Doctor', 'Chief_of_Medicine', 'Chief_Nursing_Officer', 'Chief_Resident');

-- CreateEnum
CREATE TYPE "OtherJobTitles" AS ENUM ('Imaging_Technician', 'Medical_Assistant', 'Medical_Laboratory_Technician', 'Medical_Laboratory_Scientist', 'Medical_Transcriptionist', 'Medical_Records_Clerk', 'Medical_Records_Technician', 'Medical_Secretary', 'Medical_Services_Manager', 'Medical_Social_Worker', 'Medical_Technologist');

-- AlterEnum
ALTER TYPE "DoctorSpecialization" ADD VALUE 'Surgeon';

-- DropForeignKey
ALTER TABLE "OPD" DROP CONSTRAINT "OPD_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToDoctor" DROP CONSTRAINT "_DepartmentToDoctor_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToDoctor" DROP CONSTRAINT "_DepartmentToDoctor_B_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToNurse" DROP CONSTRAINT "_DepartmentToNurse_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToNurse" DROP CONSTRAINT "_DepartmentToNurse_B_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "jobTitle" "AdminJobTitle";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "departments" "MedicalDepartments";

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "departments" "MedicalDepartments";

-- AlterTable
ALTER TABLE "OPD" ADD COLUMN     "department" "MedicalDepartments";

-- AlterTable
ALTER TABLE "UserRole" ALTER COLUMN "permissions" SET DEFAULT ARRAY['DASHBOARD_READ']::"Permissions"[];

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "_DepartmentToDoctor";

-- DropTable
DROP TABLE "_DepartmentToNurse";

-- DropEnum
DROP TYPE "Departments";

-- CreateTable
CREATE TABLE "OtherStaffs" (
    "id" TEXT NOT NULL,
    "departments" "MedicalDepartments" NOT NULL,
    "jobTitle" "OtherJobTitles" NOT NULL,
    "staffId" TEXT NOT NULL,

    CONSTRAINT "OtherStaffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtherStaffs_staffId_key" ON "OtherStaffs"("staffId");

-- AddForeignKey
ALTER TABLE "OtherStaffs" ADD CONSTRAINT "OtherStaffs_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
