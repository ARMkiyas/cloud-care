/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NIC]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Passport]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NIC]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Passport]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idNumber]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_emailVerified_key";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_NIC_key" ON "Patient"("NIC");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_Passport_key" ON "Patient"("Passport");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_NIC_key" ON "Staff"("NIC");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_Passport_key" ON "Staff"("Passport");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_idNumber_key" ON "Staff"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_role_key" ON "UserRole"("role");
