/*
  Warnings:

  - You are about to drop the column `appAccountId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."User_appAccountId_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "appAccountId",
ADD COLUMN     "appleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_appleId_key" ON "public"."User"("appleId");
