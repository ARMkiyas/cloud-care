/*
  Warnings:

  - You are about to drop the `_PermissionToUserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PermissionToUserRole" DROP CONSTRAINT "_PermissionToUserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUserRole" DROP CONSTRAINT "_PermissionToUserRole_B_fkey";

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "permissions" "Permissions"[];

-- DropTable
DROP TABLE "_PermissionToUserRole";
