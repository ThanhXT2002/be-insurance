-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN', 'AGENT', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateTable
CREATE TABLE "public"."tesst" (
    "Column 1" INTEGER,
    "Column 2" INTEGER
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "otpSecret" TEXT,
    "otpExpires" TIMESTAMP(3),
    "facebookId" TEXT,
    "googleId" TEXT,
    "firebaseUid" TEXT,
    "appAccountId" TEXT,
    "refreshToken" TEXT,
    "lastLogin" TIMESTAMP(3),
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER',
    "avatar" TEXT,
    "fullName" TEXT,
    "phone" TEXT,
    "province" TEXT,
    "district" TEXT,
    "ward" TEXT,
    "address" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "lockReason" TEXT,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "public"."User"("facebookId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "public"."User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "public"."User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_appAccountId_key" ON "public"."User"("appAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");
