-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "slotId" TEXT;

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "ScheduleId" TEXT NOT NULL,
    "maxAppointmentsPerSlot" INTEGER NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIMESTAMP NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_ScheduleId_fkey" FOREIGN KEY ("ScheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
