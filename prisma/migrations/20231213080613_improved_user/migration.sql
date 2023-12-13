/*
  Warnings:

  - You are about to drop the column `userId` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_userId_fkey";

-- DropIndex
DROP INDEX "Staff_userId_key";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "staffid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_staffid_key" ON "User"("staffid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_staffid_fkey" FOREIGN KEY ("staffid") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
