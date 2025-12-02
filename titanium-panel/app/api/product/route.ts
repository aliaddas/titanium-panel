import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId: userID }: { userId: string | null } = await auth();
    const body = await req.json();

    const { storeID, name, description, price, isFeatured, isArchived, variantLists } = body;

    //#
    //# ERROR HANDLING
    //#

    if (!userID) {
      return new NextResponse('Unauthorized: Missing UserID', {
        status: 401,
      });
    }

    if (!name || !storeID || !price || variantLists === undefined) {
      return new NextResponse('Required fields are missing', { status: 400 });
    }

    //
    // CREATE PRODUCT
    //

    console.log(body);

    if (variantLists.length > 0) {
      console.log(body.variantLists[0].variants);
    }

    const product = await prismadb.product.create({
      data: {
        storeID,
        name,
        description,
        price,
        isFeatured: isFeatured || false,
        isArchived: isArchived || false,
        ...(variantLists && variantLists.length > 0 && {
          variantLists: {
            create: variantLists.map((variantList: any) => ({
              name: variantList.name,
              variants: {
                create: variantList.variants.map((variant: any) => ({
                  name: variant.name,
                  price: variant.price,
                })),
              },
            })),
          },
        }),
      },
    });

    return NextResponse.json(product, { status: 201 });

    // CATCH ALL
  } catch (error) {
    console.log('📢 [PRODUCTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId: userID }: { userId: string | null } = await auth();
    const body = await req.json();
    const { productID, storeID, name, price, isFeatured, isArchived, variantLists } = body;

    // ERROR HANDLING
    if (!userID) {
      return new NextResponse('Unauthorized: Missing UserID', { status: 401 });
    }

    if (!productID || !storeID || !name || !price || variantLists === undefined) {
      return new NextResponse('Required fields are missing', { status: 400 });
    }

    // CHECK IF PRODUCT EXISTS
    const existingProduct = await prismadb.product.findUnique({
      where: { ID: productID, storeID },
      include: { variantLists: { include: { variants: true } } },
    });

    if (!existingProduct) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // UPDATE PRODUCT
    const updatedProduct = await prismadb.product.update({
      where: { ID: productID },
      data: {
        name,
        price,
        isFeatured: isFeatured ?? existingProduct.isFeatured,
        isArchived: isArchived ?? existingProduct.isArchived,

        // Handle Variant Lists
        variantLists: {
          deleteMany: {}, // Remove all existing variant lists
          create: variantLists.map((variantList: any) => ({
            name: variantList.name,
            variants: {
              create: variantList.variants.map((variant: any) => ({
                name: variant.name,
                price: variant.price,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log('📢 [PRODUCTS_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
