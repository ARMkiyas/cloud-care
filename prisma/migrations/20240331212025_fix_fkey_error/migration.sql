/*
  Warnings:

  - The values [Patient_Safety_Specialist,Emergency_Preparedness_Coordinator] on the enum `AdminJobTitle` will be removed. If these variants are still used in the database, this will fail.
  - The values [Other] on the enum `adminDepartment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdminJobTitle_new" AS ENUM ('OPD_Manager', 'OPD_Nurse_Manager', 'Director_Admissions', 'Patient_Services_Representative', 'Medical_Records_Technician', 'Unit_Secretary', 'Switchboard_Operator', 'HR_Representative', 'Human_Resources_Manager', 'Recruiter', 'Benefits_Coordinator', 'Training_And_Development_Specialist', 'Employee_Relations_Specialist', 'Health_Information_Management_Director', 'IT_Support_Specialist', 'Network_Administrator', 'Cybersecurity_Analyst', 'Applications_Analyst', 'Facilities_Manager', 'Biomedical_Equipment_Technician', 'HVAC_Technician', 'Carpenter', 'Electrician', 'Security_Director', 'Security_Officer');
ALTER TABLE "Admin" ALTER COLUMN "jobTitle" TYPE "AdminJobTitle_new" USING ("jobTitle"::text::"AdminJobTitle_new");
ALTER TYPE "AdminJobTitle" RENAME TO "AdminJobTitle_old";
ALTER TYPE "AdminJobTitle_new" RENAME TO "AdminJobTitle";
DROP TYPE "AdminJobTitle_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OtherJobTitles" ADD VALUE 'Patient_Safety_Specialist';
ALTER TYPE "OtherJobTitles" ADD VALUE 'Emergency_Preparedness_Coordinator';

-- AlterEnum
BEGIN;
CREATE TYPE "adminDepartment_new" AS ENUM ('Administration', 'HR', 'IT', 'Maintenance', 'Security');
ALTER TABLE "Admin" ALTER COLUMN "department" TYPE "adminDepartment_new" USING ("department"::text::"adminDepartment_new");
ALTER TYPE "adminDepartment" RENAME TO "adminDepartment_old";
ALTER TYPE "adminDepartment_new" RENAME TO "adminDepartment";
DROP TYPE "adminDepartment_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_slotId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "doctorId" DROP NOT NULL,
ALTER COLUMN "scheduleId" DROP NOT NULL,
ALTER COLUMN "slotId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "userinvite" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "staffid" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userinvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userinvite_token_key" ON "userinvite"("token");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
