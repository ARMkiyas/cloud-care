/*
  Warnings:

  - Changed the type of `gender` on the `Admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `gender` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `Patient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "gender",
ADD COLUMN     "gender" "gender" NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "gender" "gender" NOT NULL;

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "gender" "gender" NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "gender",
ADD COLUMN     "gender" "gender" NOT NULL;
