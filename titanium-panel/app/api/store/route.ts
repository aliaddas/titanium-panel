import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    //<< Extract the userID from the Clerk auth object
    const { userId: userID }: { userId: string | null } = await auth();

    const body = await req.json();

    const { name } = body;

    //# Error Handling 🤓

    if (!userID) {
      return new NextResponse('Unauthorized: Missing UserID', {
        status: 401,
      });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    //=> CREATE STORE
    const store = await prismadb.store.create({
      data: {
        name,
        userID,
      },
    });

    //<< Return the store object
    return NextResponse.json(store);

  } catch (error) {
    console.log('📢 [STORES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
