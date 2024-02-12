/*
  Warnings:

  - You are about to drop the column `Date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "Date";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "contactNumber";

-- AlterTable
ALTER TABLE "Slot" ALTER COLUMN "endTime" SET DATA TYPE TIME;
