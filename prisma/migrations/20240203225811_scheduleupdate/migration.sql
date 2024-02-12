-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_ScheduleId_fkey";

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_ScheduleId_fkey" FOREIGN KEY ("ScheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
