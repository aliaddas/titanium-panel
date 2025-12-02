-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('image', 'video', 'audio', 'document', 'other');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'MANUAL_PAYMENT', 'KLARNA', 'CREDIT_CARD', 'OTHER');

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

-- CreateTable
CREATE TABLE "Discussion" (
    "ID" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "orderID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Message" (
    "ID" TEXT NOT NULL,
    "discussionID" TEXT NOT NULL,
    "fromCustomer" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Order" (
    "ID" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "shippingAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "ID" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "variantID" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "imagePreview" TEXT,
    "variantSummary" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Category" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "inceptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Product" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "storeID" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "imagePreview" TEXT,
    "inceptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "ID" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "productID" TEXT,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "productID" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productID","categoryID")
);

-- CreateTable
CREATE TABLE "Store" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "inceptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "VariantList" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "productID" TEXT,
    "isComplex" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VariantList_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Variant" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "code" TEXT,
    "storeID" TEXT NOT NULL,
    "inceptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "VariantCombo" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "VariantCombo_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "VariantListToVariant" (
    "ID" TEXT NOT NULL,
    "variantListID" TEXT NOT NULL,
    "variantID" TEXT NOT NULL,

    CONSTRAINT "VariantListToVariant_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "VariantComboToVariant" (
    "ID" TEXT NOT NULL,
    "variantComboID" TEXT NOT NULL,
    "variantID" TEXT NOT NULL,

    CONSTRAINT "VariantComboToVariant_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_discussionID_fkey" FOREIGN KEY ("discussionID") REFERENCES "Discussion"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantID_fkey" FOREIGN KEY ("variantID") REFERENCES "Variant"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantList" ADD CONSTRAINT "VariantList_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantList" ADD CONSTRAINT "VariantList_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombo" ADD CONSTRAINT "VariantCombo_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombo" ADD CONSTRAINT "VariantCombo_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantListToVariant" ADD CONSTRAINT "VariantListToVariant_variantListID_fkey" FOREIGN KEY ("variantListID") REFERENCES "VariantList"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantListToVariant" ADD CONSTRAINT "VariantListToVariant_variantID_fkey" FOREIGN KEY ("variantID") REFERENCES "Variant"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantComboToVariant" ADD CONSTRAINT "VariantComboToVariant_variantComboID_fkey" FOREIGN KEY ("variantComboID") REFERENCES "VariantCombo"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantComboToVariant" ADD CONSTRAINT "VariantComboToVariant_variantID_fkey" FOREIGN KEY ("variantID") REFERENCES "Variant"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
