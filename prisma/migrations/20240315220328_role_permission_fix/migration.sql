/*
  Warnings:

  - The values [ALL,DASH,MANAGEUSERS_READ,MANAGEUSERS_WRITE,MANAGEUSERS_DELETE] on the enum `Permissions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Permissions_new" AS ENUM ('DASHBOARD_READ', 'APPOINTMENTS_READ', 'APPOINTMENTS_WRITE', 'APPOINTMENTS_EDIT', 'APPOINTMENTS_DELETE', 'SCHEDULES_READ', 'SCHEDULES_WRITE', 'SCHEDULES_EDIT', 'SCHEDULES_DELETE', 'PATIENTS_READ', 'PATIENTS_WRITE', 'PATIENTS_EDIT', 'PATIENTS_DELETE', 'USERS_READ', 'USERS_WRITE', 'USERS_EDIT', 'USERS_DELETE', 'STAFF_READ', 'STAFF_WRITE', 'STAFF_EDIT', 'STAFF_DELETE', 'LOGS_READ');
ALTER TABLE "Permission" ALTER COLUMN "name" TYPE "Permissions_new" USING ("name"::text::"Permissions_new");
ALTER TYPE "Permissions" RENAME TO "Permissions_old";
ALTER TYPE "Permissions_new" RENAME TO "Permissions";
DROP TYPE "Permissions_old";
COMMIT;

-- CreateTable
CREATE TABLE "_PermissionToUserRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToUserRole_AB_unique" ON "_PermissionToUserRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToUserRole_B_index" ON "_PermissionToUserRole"("B");

-- AddForeignKey
ALTER TABLE "_PermissionToUserRole" ADD CONSTRAINT "_PermissionToUserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUserRole" ADD CONSTRAINT "_PermissionToUserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
