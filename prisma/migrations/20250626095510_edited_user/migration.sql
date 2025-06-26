/*
  Warnings:

  - You are about to drop the column `createdAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceRequest` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_name_key";

-- DropIndex
DROP INDEX "profiles_username_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "createdAt",
DROP COLUMN "genre",
DROP COLUMN "price",
DROP COLUMN "updatedAt",
ADD COLUMN     "priceRequest" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "username",
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userName_key" ON "profiles"("userName");
