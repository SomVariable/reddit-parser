/*
  Warnings:

  - Added the required column `accountStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'EMPLOYEE', 'REPORTER');

-- CreateEnum
CREATE TYPE "ACCOUNT_STATUS" AS ENUM ('PENDING', 'ACTIVE', 'BLOCKED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" "ACCOUNT_STATUS" NOT NULL,
ADD COLUMN     "role" "ROLE" NOT NULL;

-- DropEnum
DROP TYPE "Role";
