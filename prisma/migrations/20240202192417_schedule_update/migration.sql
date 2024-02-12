/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `Date` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_doctorId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "dateTime",
ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "OptRoomsid" TEXT;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "OptRoomsid" TEXT,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "OptRooms" (
    "id" TEXT NOT NULL,
    "roomNo" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "OptRooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OptRooms_roomNo_key" ON "OptRooms"("roomNo");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_OptRoomsid_fkey" FOREIGN KEY ("OptRoomsid") REFERENCES "OptRooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nurse" ADD CONSTRAINT "Nurse_OptRoomsid_fkey" FOREIGN KEY ("OptRoomsid") REFERENCES "OptRooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
