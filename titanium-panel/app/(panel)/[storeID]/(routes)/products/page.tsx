import React from 'react';

import { ProductModule } from './components/product-module';

//> Form UI Imports
import { v4 as uuidv4 } from 'uuid';

//> PrismaDB Imports
import prismadb from '@/lib/prismadb';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductManagerComponent } from '@/components/product-manager';
import { assetsBucketprefix } from '@/types/url-prefix';

const ProductsPage = async ({
  params,
}: {
  params: {
    storeID: string;
  };
}) => {
  const { storeID } = await params;

  //! Generate a singular template object (populate array)
  const templateProduct = [
    {
      ID: uuidv4(),
      name: 'Backup Product',
      description: 'Fix Fix Fix',
      storeID: storeID,
      isArchived: false,
      isFeatured: false,
      variantLists: [],
    },
  ];

  // Fetch the product from the database
  const productsFromDB = await prismadb.product.findMany({
    where: {
      storeID: storeID,
    },
  });

  console.log('productsFromDB', productsFromDB);

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
        return imageURL.startsWith('http')
          ? imageURL
          : assetsBucketprefix + imageURL;
      });

      // Convert Decimal price to number and include imageURLs
      return {
        ...product,
        price: product.price.toNumber(),
        imageURLs: imageURLs,
      };
    }),
  );

  console.log('products', products);

  if (products) {
    return <ProductModule products={products} />;
  } else {
    return <div>Failed to fetch products</div>;
  }
};

export default ProductsPage;
