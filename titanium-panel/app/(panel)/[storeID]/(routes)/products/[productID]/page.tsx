//>
//> Imports
//>

//> Component Imports
import { ProductForm } from './components/product-form';

//> PrismaDB Imports
import prismadb from '@/lib/prismadb';
import { Variant } from '@prisma/client';

//> Form UI Imports
import { v4 as uuidv4 } from 'uuid';

//? Types
import { ProductType, VariantListType } from '@/types/data-types';
import { Decimal } from '@prisma/client/runtime/library';
import { assetsBucketprefix } from '@/types/url-prefix';

interface ProductPageProps {
  params: { storeID: string; productID: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { storeID, productID } = await params;

  //@
  //@ Switch between creating a new product and editing an existing product
  //@ Url decides

  //@ Creating
  if (productID === 'new') {
    //? Provide form with template data
    //=> Create a new product object
    const templateProduct: ProductType = {
      ID: uuidv4(),
      name: 'Product Name',
      description: 'Product Description',
      price: new Decimal(0.0),
      storeID: storeID,
      isArchived: false,
      isFeatured: false,
      lastUpdate: new Date(),
      inceptionDate: new Date(),
      variantLists: [],
      imageURLs: [],
    };

    //=> Return the ProductForm component with template data
    return <ProductForm initialData={templateProduct} params={params} />;
  } else {
    //@ Editing

    //? Provide form with existing data
    //<< Fetch the product from the database
    const product = await prismadb.product.findUnique({
      where: {
        storeID: storeID,
        ID: productID,
      },
    });
    if (product) {
      //<< productsVariantsLists in Database Format
      const _dbVariantsLists = await prismadb.variantList.findMany({
        where: {
          productID: product.ID,
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
        //@ Map through the database variantLists (simple products contain just 1)
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
              }),
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
        }),
      );

      //<< Get imageURLs from the database
      const dbImageURLs = await prismadb.productImage.findMany({
        where: {
          productID: product.ID,
        },
        select: {
          imageURL: true,
        },
      });
      const imageURLs = dbImageURLs.map((productImage) => {
        const imageURL = productImage.imageURL;
        return imageURL.startsWith('http')
          ? imageURL
          : assetsBucketprefix + imageURL;
      });

      const finalProduct = {
        ID: product.ID,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        storeID: product.storeID,
        isArchived: product.isArchived,
        isFeatured: product.isFeatured,
        variantLists: variantLists,
        imageURLs: imageURLs,
      };
      return <ProductForm initialData={finalProduct} params={params} />;
    } else {
      return (
        <div>Product not found! Either missing, deleted or simply a bug :c</div>
      );
    }
  }
};

export default ProductPage;
