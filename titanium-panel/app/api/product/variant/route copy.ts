import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { Variant } from '@prisma/client';

//? Types
import { ProductVariantsListType } from '@/types/data-types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { unparsedVariantsList } = body;

    //Parse to Object format
    const variantsList: ProductVariantsListType =
      JSON.parse(unparsedVariantsList);

    console.log('Variant List');
    console.log(variantsList);

    // ERROR HANDLING

    if (
      !variantsList ||
      !Array.isArray(variantsList) ||
      variantsList.length === 0
    ) {
      return new NextResponse('Variant List is missing or invalid', {
        status: 400,
      });
    }

    // Assuming all variants have the same storeID
    const storeID = variantsList[0].storeID;

    // Create ProductVariantsList
    const productVariantsList = await prismadb.productVariantsList.create({
      data: {
        name: `Color Variant`,
        storeID: storeID,
      },
    });

    // Create Variants and associate with the ProductVariantsList
    const createdVariants = [];
    for (const variant of variantsList) {
      const createdVariant = await prismadb.variant.create({
        data: variant,
      });

      await prismadb.productVariantsListToVariant.create({
        data: {
          productVariantsListID: productVariantsList.ID,
          variantID: createdVariant.ID,
        },
      });

      createdVariants.push(createdVariant);
    }
    return NextResponse.json(
      { productVariantsList, createdVariants },
      { status: 200 },
    );
  } catch (error) {
    console.log('📢 [VARIANT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { unparsedVariantsList } = body;

    //Parse to Object format
    const Variants: Variant[] = JSON.parse(unparsedVariantsList);

    //console.log("Variant List");
    //console.log(variantsList)

    // Update Variants
    const updatedVariants = [];

    for (const variant of Variants) {
      const updatedVariant = await prismadb.variant.update({
        where: { ID: variant.ID },
        data: variant,
      });

      //console.log("Updated Variant");
      //console.log(updatedVariant);
      updatedVariants.push(updatedVariant);
    }
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.log('📢 [VARIANT_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = JSON.parse(body.variantIDs);

    console.log(parsedBody);
    // Delete Variants

    for (const variantID of parsedBody) {
      const productVariantsListToVariant =
        await prismadb.productVariantsListToVariant.findFirst({
          where: {
            variantID: variantID,
          },
        });

      //<< Delete the variant association
      if (productVariantsListToVariant) {
        await prismadb.productVariantsListToVariant.delete({
          where: { ID: productVariantsListToVariant.ID },
        });
      }

      //<< Delete the variant
      await prismadb.variant.delete({
        where: { ID: variantID },
      });
    }
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.log('📢 [VARIANT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
