/*
  Warnings:

  - You are about to drop the column `customer_code` on the `customers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "customers_customer_code_key";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "customer_code";

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_number_key" ON "customers"("phone_number");
