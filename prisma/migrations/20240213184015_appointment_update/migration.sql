/*
  Warnings:

  - A unique constraint covering the columns `[referenceid]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentEnd` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentNumber` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentstart` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceid` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Made the column `slotId` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_slotId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointmentEnd" TIME NOT NULL,
ADD COLUMN     "appointmentNumber" INTEGER NOT NULL,
ADD COLUMN     "appointmentstart" TIME NOT NULL,
ADD COLUMN     "referenceid" TEXT NOT NULL,
ALTER COLUMN "slotId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_referenceid_key" ON "Appointment"("referenceid");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
