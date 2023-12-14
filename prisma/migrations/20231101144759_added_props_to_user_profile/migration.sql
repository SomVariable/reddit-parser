/*
  Warnings:

  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[photoId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langCode` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastnName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoId` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LangCode" AS ENUM ('RU', 'EN', 'UK');

-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "langCode" "LangCode" NOT NULL,
ADD COLUMN     "lastnName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL,
ADD COLUMN     "photoId" INTEGER NOT NULL,
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("langCode", "userId");

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_photoId_key" ON "UserProfile"("photoId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
