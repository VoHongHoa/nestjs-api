/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customer_code]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "system_users" (
    "id" SERIAL NOT NULL,
    "system_user_code" TEXT NOT NULL,
    "system_user_email" TEXT NOT NULL,
    "system_user_password" TEXT NOT NULL,
    "system_user_display_name" TEXT,
    "role_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_users_system_user_code_key" ON "system_users"("system_user_code");

-- CreateIndex
CREATE UNIQUE INDEX "system_users_system_user_email_key" ON "system_users"("system_user_email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_code_key" ON "customers"("customer_code");

-- AddForeignKey
ALTER TABLE "system_users" ADD CONSTRAINT "system_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
