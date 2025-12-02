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
    "inceptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ID")
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
CREATE TABLE "Image" (
    "ID" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "productID" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "productID" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productID","categoryID")
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
ALTER TABLE "Category" ADD CONSTRAINT "Category_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "Store"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Image" ADD CONSTRAINT "Image_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantListToVariant" ADD CONSTRAINT "VariantListToVariant_variantListID_fkey" FOREIGN KEY ("variantListID") REFERENCES "VariantList"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantListToVariant" ADD CONSTRAINT "VariantListToVariant_variantID_fkey" FOREIGN KEY ("variantID") REFERENCES "Variant"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantComboToVariant" ADD CONSTRAINT "VariantComboToVariant_variantComboID_fkey" FOREIGN KEY ("variantComboID") REFERENCES "VariantCombo"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantComboToVariant" ADD CONSTRAINT "VariantComboToVariant_variantID_fkey" FOREIGN KEY ("variantID") REFERENCES "Variant"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
