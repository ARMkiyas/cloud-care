/*
  Warnings:

  - You are about to drop the column `department` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Staff` table. All the data in the column will be lost.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailVerified]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `Department` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `title` to the `Nurse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "title" AS ENUM ('Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof');

-- CreateEnum
CREATE TYPE "adminDepartment" AS ENUM ('Administration', 'HR', 'IT', 'Maintenance', 'Security', 'Other');

-- CreateEnum
CREATE TYPE "Departments" AS ENUM ('General_Practitioner', 'CARDIOLOGY', 'DERMATOLOGY', 'ENDOCRINOLOGY', 'GASTROENTEROLOGY', 'GYNECOLOGY', 'NEUROLOGY', 'OPHTHALMOLOGY', 'OTOLARYNGOLOGY', 'PEDIATRICS', 'PSYCHIATRY', 'UROLOGY', 'Nursing');

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_nurseId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "name",
ADD COLUMN     "name" "Departments" NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "NIC" TEXT,
ADD COLUMN     "Passport" TEXT,
ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "title" "title" NOT NULL DEFAULT 'Dr';

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "NIC" TEXT,
ADD COLUMN     "Passport" TEXT,
ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "title" "title" NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "title" "title" NOT NULL DEFAULT 'Mr';

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "department",
DROP COLUMN "title",
ADD COLUMN     "adminId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "title" "title" NOT NULL DEFAULT 'Mr',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "NIC" TEXT,
    "Passport" TEXT,
    "idNumber" TEXT,
    "department" "adminDepartment" NOT NULL,
    "staffId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DepartmentToNurse" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phoneNumber_key" ON "Admin"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_staffId_key" ON "Admin"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToNurse_AB_unique" ON "_DepartmentToNurse"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToNurse_B_index" ON "_DepartmentToNurse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerified_key" ON "User"("emailVerified");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Nurse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToNurse" ADD CONSTRAINT "_DepartmentToNurse_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToNurse" ADD CONSTRAINT "_DepartmentToNurse_B_fkey" FOREIGN KEY ("B") REFERENCES "Nurse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
