/*
  Warnings:

  - Added the required column `appointmentDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointmentDate" DATE NOT NULL,
ADD COLUMN     "patientNote" TEXT;
