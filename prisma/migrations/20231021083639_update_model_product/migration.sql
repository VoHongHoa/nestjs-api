/*
  Warnings:

  - You are about to drop the column `customer_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_customer_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "customer_id";
