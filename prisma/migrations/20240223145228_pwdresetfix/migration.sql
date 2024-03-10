/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `PasswordResetToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "expiresAt";
