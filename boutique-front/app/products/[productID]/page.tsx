import Link from "next/link";

import { Button } from "@/components/ui/button";

import prismadb from "@/lib/prismadb";
import { assetsBucketprefix, storeID } from "@/types/url-prefix";
import { VariantListType } from "@/types/data-types";
import { Variant } from "@prisma/client";
import { ProductDetailsComponent } from "./components/product-details";

export default async function ProductDetailPage({
  params,
}: {
  params: { productID: string };
}) {
  const productID = params.productID;

  let product = {};

  //<< Fetch the product from the database
  const dbProduct = await prismadb.product.findUnique({
    where: {
      storeID: storeID,
      ID: productID,
    },
  });
  if (dbProduct) {
    //<< productsVariantsLists in Database Format
    const _dbVariantsLists = await prismadb.variantList.findMany({
      where: {
        productID: dbProduct.ID,
      },
      include: {
        variants: {
          include: {
            variant: true, //? Include the variant details
          },
        },
      },
    });

    //=> Construct new variantsLists Object
    const variantLists: VariantListType[] = await Promise.all(
      //@ Map through the database variantLists (contains just 1 for simple products)
      _dbVariantsLists.map(async (variantEntry) => {
        //=> Construct new variants Object as Variant[] type
        const variants: Variant[] = (
          await Promise.all(
            variantEntry.variants.map(async ({ variantID }) => {
              //<< Get the variant from the database
              const variant = await prismadb.variant.findUnique({
                where: { ID: variantID },
              });
              //=> Return the variant Object if it exists
              if (variant) {
                return {
                  ID: variant.ID,
                  type: variant.type,
                  value: variant.value,
                  code: variant.code,
                  storeID: variant.storeID,
                  inceptionDate: new Date(variant.inceptionDate),
                  lastUpdate: new Date(variant.lastUpdate),
                };
              }
              return null;
            })
          )
        )
          //? Filter out null values and cast to Variant[]
          .filter((variant) => variant !== null) as Variant[];

        //=> Construct the final variantList Object
        const finalVariantList: VariantListType = {
          ID: variantEntry.ID,
          name: variantEntry.name,
          storeID: variantEntry.storeID,
          productID: variantEntry.productID,
          isComplex: variantEntry.isComplex,
          variants: variants,
        };

        //=> Return the variantList Object including the variants array
        return finalVariantList;
      })
    );

    //<< Get imageURLs from the database
    const dbImageURLs = await prismadb.productImage.findMany({
      where: {
        productID: dbProduct.ID,
      },
      select: {
        imageURL: true,
      },
    });
    const imageURLs = dbImageURLs.map((productImage) => {
      const imageURL = productImage.imageURL;
      return imageURL.startsWith("http")
        ? imageURL
        : assetsBucketprefix + imageURL;
    });

    const finalProduct = {
      ID: dbProduct.ID,
      name: dbProduct.name,
      description: dbProduct.description,
      price: dbProduct.price.toString(),
      storeID: dbProduct.storeID,
      isArchived: dbProduct.isArchived,
      isFeatured: dbProduct.isFeatured,
      variantLists: variantLists,
      imageURLs: imageURLs,
    };
    product = finalProduct;
  }

  console.log("product", product);

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] dark:bg-[#1c2620] mt-2 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2c3e2e] dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-[#2c3e2e]/70 dark:text-white/70 mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button
            className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]"
            asChild
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ProductDetailsComponent product={product} />;
}
