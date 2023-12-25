-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_staffid_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_staffid_fkey" FOREIGN KEY ("staffid") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
