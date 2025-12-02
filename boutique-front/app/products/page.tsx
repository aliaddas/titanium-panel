import ProductModule from "./components/product-module";
import prismadb from "@/lib/prismadb";
import { assetsBucketprefix, storeID } from "@/types/url-prefix";

export default async function ProductsPage() {
  // Fetch the product from the database
  const productsFromDB = await prismadb.product.findMany({
    where: {
      storeID: storeID,
    },
  });

  console.log("productsFromDB", productsFromDB);

  // Process products and fetch image URLs for each product
  const products = await Promise.all(
    productsFromDB.map(async (product) => {
      // Get imageURLs from the database
      const dbProductImages = await prismadb.productImage.findMany({
        where: {
          productID: product.ID,
        },
        select: {
          imageURL: true,
        },
      });
      // Extract image URLs
      const imageURLs = dbProductImages.map((productImage) => {
        const imageURL = productImage.imageURL;
        return imageURL.startsWith("http")
          ? imageURL
          : assetsBucketprefix + imageURL;
      });

      // Convert Decimal price to number and include imageURLs
      return {
        ...product,
        price: product.price.toNumber(),
        imageURLs: imageURLs,
      };
    })
  );

  return <ProductModule products={products} />;
}
