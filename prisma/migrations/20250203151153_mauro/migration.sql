/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stockQuantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaleDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `providerId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityInStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseDetail" DROP CONSTRAINT "PurchaseDetail_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseDetail" DROP CONSTRAINT "PurchaseDetail_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetail" DROP CONSTRAINT "SaleDetail_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetail" DROP CONSTRAINT "SaleDetail_saleId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
DROP COLUMN "price",
DROP COLUMN "stockQuantity",
ADD COLUMN     "providerId" INTEGER NOT NULL,
ADD COLUMN     "quantityInStock" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "customerId",
DROP COLUMN "date",
DROP COLUMN "paymentType",
DROP COLUMN "status",
DROP COLUMN "total",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "PurchaseDetail";

-- DropTable
DROP TABLE "SaleDetail";

-- DropTable
DROP TABLE "Supplier";

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleProducts" (
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaleProducts_pkey" PRIMARY KEY ("saleId","productId")
);

-- CreateTable
CREATE TABLE "_SaleProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SaleProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE INDEX "_SaleProducts_B_index" ON "_SaleProducts"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SaleProducts" ADD CONSTRAINT "_SaleProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SaleProducts" ADD CONSTRAINT "_SaleProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
