/*
  Warnings:

  - You are about to drop the column `author_name` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `book_description` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `book_genre` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `book_stock` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `book_title` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `published_date` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "author_name",
DROP COLUMN "book_description",
DROP COLUMN "book_genre",
DROP COLUMN "book_stock",
DROP COLUMN "book_title",
DROP COLUMN "published_date",
ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No description',
ADD COLUMN     "genre" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled';
