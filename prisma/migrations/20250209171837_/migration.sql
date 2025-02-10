/*
  Warnings:

  - You are about to drop the column `saleDate` on the `Sale` table. All the data in the column will be lost.
  - The primary key for the `SaleProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "saleDate";

-- AlterTable
ALTER TABLE "SaleProducts" DROP CONSTRAINT "SaleProducts_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SaleProducts_pkey" PRIMARY KEY ("id");
