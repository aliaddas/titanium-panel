/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('image', 'video', 'audio', 'document', 'other');

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productID_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "ProductImage" (
    "ID" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "productID" TEXT,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Asset" (
    "ID" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "usedIn" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
