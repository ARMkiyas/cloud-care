/*
  Warnings:

  - The values [General_Practitioner,CARDIOLOGY,DERMATOLOGY,ENDOCRINOLOGY,GASTROENTEROLOGY,GYNECOLOGY,NEUROLOGY,OPHTHALMOLOGY,OTOLARYNGOLOGY,PEDIATRICS,PSYCHIATRY,UROLOGY] on the enum `Departments` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `NIC` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `Passport` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `idNumber` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Admin` table. All the data in the column will be lost.
  - The `status` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `NIC` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `Passport` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `idNumber` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `NIC` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `Passport` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `idNumber` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `specialization` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `dateOfBirth` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ROOTUSER', 'ADMIN', 'GUEST', 'DOCTOR', 'NURSE', 'STAFF');

-- CreateEnum
CREATE TYPE "Appointmentstatus" AS ENUM ('Pending', 'Confirmed', 'Cancelled', 'Completed');

-- CreateEnum
CREATE TYPE "DoctorSpecialization" AS ENUM ('GENERAL_PRACTITIONER', 'CARDIOLOGIST', 'ORTHOPEDIC_SURGEON', 'PEDIATRICIAN', 'OBSTETRICIAN_GYNECOLOGIST', 'NEUROLOGIST', 'DERMATOLOGIST', 'OPHTHALMOLOGIST', 'OTOLARYNGOLOGIST', 'GASTROENTEROLOGIST', 'UROLOGIST', 'PSYCHIATRIST', 'ENDOCRINOLOGIST', 'PULMONOLOGIST', 'RHEUMATOLOGIST', 'INFECTIOUS_DISEASE_SPECIALIST', 'NEPHROLOGIST', 'HEMATOLOGIST', 'ONCOLOGIST', 'ALLERGIST_IMMUNOLOGIST', 'GERIATRICIAN', 'EMERGENCY_MEDICINE_PHYSICIAN', 'ANESTHESIOLOGIST', 'RADIOLOGIST', 'INTENSIVIST');

-- AlterEnum
BEGIN;
CREATE TYPE "Departments_new" AS ENUM ('Emergency', 'Internal_Medicine', 'Pediatrics', 'Obstetrics_Gynecology', 'Surgery', 'Orthopedics', 'Cardiology', 'Neurology', 'Dermatology', 'Ophthalmology', 'Otolaryngology', 'Gastroenterology', 'Urology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Laboratory_Services', 'Pharmacy', 'Physical_Therapy', 'Nursing', 'Public_Relations_Marketing');
ALTER TABLE "Department" ALTER COLUMN "name" TYPE "Departments_new" USING ("name"::text::"Departments_new");
ALTER TYPE "Departments" RENAME TO "Departments_old";
ALTER TYPE "Departments_new" RENAME TO "Departments";
DROP TYPE "Departments_old";
COMMIT;

-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "Admin_phoneNumber_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "NIC",
DROP COLUMN "Passport",
DROP COLUMN "dateOfBirth",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "idNumber",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "status",
ADD COLUMN     "status" "Appointmentstatus" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "NIC",
DROP COLUMN "Passport",
DROP COLUMN "contactNumber",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "idNumber",
DROP COLUMN "lastName",
DROP COLUMN "title",
DROP COLUMN "specialization",
ADD COLUMN     "specialization" "DoctorSpecialization" NOT NULL;

-- AlterTable
ALTER TABLE "Nurse" DROP COLUMN "NIC",
DROP COLUMN "Passport",
DROP COLUMN "contactNumber",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "idNumber",
DROP COLUMN "lastName",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "NIC" TEXT,
ADD COLUMN     "Passport" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "gender" NOT NULL,
ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "title" "title" NOT NULL DEFAULT 'Mr';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roles",
ADD COLUMN     "userRoleId" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "role" "UserRoles" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_phoneNumber_key" ON "Staff"("phoneNumber");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
