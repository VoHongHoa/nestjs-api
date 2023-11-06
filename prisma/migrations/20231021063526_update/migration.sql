/*
  Warnings:

  - A unique constraint covering the columns `[category_code]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_category_code_key" ON "categories"("category_code");
