import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  //!
  //! ERROR HANDLING
  //!
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  //* Extract data from the request body
  const { variantListIDs } = request.body;

  try {
    //! Ensure variant list IDs are provided and valid
    if (
      !variantListIDs ||
      !Array.isArray(variantListIDs) ||
      variantListIDs.length === 0
    ) {
      return response
        .status(400)
        .json({ message: 'Variant list IDs are missing or invalid' });
    }

    //* Create the combination list
    const combinationList =
      await prismadb.productVariantsListCombination.create({
        data: {
          name: `Combination List - ${new Date().toISOString()}`,
          storeID: 'e4dc86ca-9aab-465b-8159-18b0463568c5',
        },
      });

    // Associate the combination list with variant lists
    await Promise.all(
      variantListIDs.map(async (variantListIDs) => {
        await prismadb.productVariantsListCombinationToProductVariantsList.create(
          {
            data: {
              productVariantsListID: variantListIDs,
              productVariantsCombinationID: combinationList.ID,
            },
          },
        );
      }),
    );

    // Return the newly created combination list
    return response.status(201).json({ combinationList });
  } catch (error) {
    console.error('Error creating combination list:', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
}
