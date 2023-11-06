/*
  Warnings:

  - Added the required column `category_code` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "category_code" TEXT NOT NULL;
