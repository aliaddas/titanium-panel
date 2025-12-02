import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { Variant } from '@prisma/client';

//? Types
import { VariantListType } from '@/types/data-types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _upVariantsArray } = body;

    // Parse to Object format
    const variantListArrayObject: VariantListType =
      JSON.parse(_upVariantsArray);

    if (
      !variantListArrayObject ||
      !Array.isArray(variantListArrayObject.variants) ||
      variantListArrayObject.variants.length < 2
    ) {
      return new NextResponse('Variant List is missing or invalid', {
        status: 400,
      });
    }

    const {
      ID: variantListID,
      name,
      storeID,
      productID,
    } = variantListArrayObject;

    // Check if the variant list exists
    let variantList = await prismadb.variantList.findUnique({
      where: { ID: variantListID },
    });

    // If the variant list does not exist, create it
    if (!variantList) {
      variantList = await prismadb.variantList.create({
        data: {
          ID: variantListID,
          name: name, // Add the name property
          storeID: storeID,
          productID: productID,
        },
      });
    }

    // Array to hold all variants (existing and new)
    const newVariants: any[] = [];
    let needsVariantList = false;

    for (const variant of variantListArrayObject.variants) {
      // Check if the variant already exists in the variantListToVariant
      const existingVariantListToVariant =
        await prismadb.variantListToVariant.findFirst({
          where: {
            variantListID: variantListID,
            variantID: variant.ID,
          },
        });

      if (!existingVariantListToVariant) {
        newVariants.push(variant);
        needsVariantList = true;
      }
    }

    // Create new variants and link them to the variant list
    for (const variant of newVariants) {
      const newVariant = await prismadb.variant.create({
        data: {
          type: variant.type,
          value: variant.value,
          code: variant.code,
          storeID: variant.storeID,
          inceptionDate: new Date(),
          lastUpdate: new Date(),
        },
      });

      // Create association between the new variant and the variant list
      await prismadb.variantListToVariant.create({
        data: {
          variantListID: variantListID,
          variantID: newVariant.ID,
        },
      });
    }

    return NextResponse.json('OK', { status: 200 });
  } catch (error) {
    console.log('📢 [VARIANT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { _upVariantsArray } = body;

    //Parse to Object format
    const variantsArrayObject: VariantListType = JSON.parse(_upVariantsArray);

    //console.log("Variant List");
    //console.log(variantsList)

    // Update Variants
    const updatedVariants = [];

    for (const variant of variantsArrayObject.variants) {
      const updatedVariant = await prismadb.variant.update({
        where: {
          ID: variant.ID,
          storeID: variant.storeID,
        },
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
        await prismadb.variantListToVariant.findFirst({
          where: {
            variantID: variantID,
          },
        });

      //<< Delete the variant association
      if (productVariantsListToVariant) {
        await prismadb.variantListToVariant.delete({
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
