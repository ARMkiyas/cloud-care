-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('ALL', 'DASH', 'MANAGEUSERS_READ', 'MANAGEUSERS_WRITE', 'MANAGEUSERS_DELETE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissionId" INTEGER,
ALTER COLUMN "roles" SET DEFAULT ARRAY['GUEST']::"UserRole"[];

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" "Permissions" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
