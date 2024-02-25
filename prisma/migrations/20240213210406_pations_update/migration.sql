/*
  Warnings:

  - You are about to drop the column `createdDate` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `updatedat` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Patient_email_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "createdDate",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dateOfBirth" SET DATA TYPE DATE;
