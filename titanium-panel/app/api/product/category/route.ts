import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, storeID } = body;

    //
    // ERROR HANDLING
    //

    if (!userId) {
      return new NextResponse('Unauthorized: Missing UserID', {
        status: 401,
      });
    }

    if (!name) {
      return new NextResponse('Category Name is required', { status: 400 });
    }

    //
    // CREATE CATEGORY
    //
    const store = await prismadb.category.create({
      data: {
        name,
        storeID, // replace `storeValue` with the actual value for `store`
      },
    });

    return NextResponse.json(store);

    // CATCH ALL
  } catch (error) {
    console.log('📢 [CATEGORY_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
