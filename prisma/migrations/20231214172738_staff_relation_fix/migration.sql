/*
  Warnings:

  - You are about to drop the column `adminId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `nurseId` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffId]` on the table `Nurse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `Nurse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_nurseId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "staffId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "staffId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "adminId",
DROP COLUMN "doctorId",
DROP COLUMN "nurseId";

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_staffId_key" ON "Doctor"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_staffId_key" ON "Nurse"("staffId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nurse" ADD CONSTRAINT "Nurse_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
