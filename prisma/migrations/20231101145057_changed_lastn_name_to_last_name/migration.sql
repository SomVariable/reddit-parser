/*
  Warnings:

  - You are about to drop the column `lastnName` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "lastnName",
ADD COLUMN     "lastName" TEXT NOT NULL;
