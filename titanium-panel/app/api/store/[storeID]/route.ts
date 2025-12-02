import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { storeID: string } }) {
  const { storeID } = await params;

  try {
    //<< Extract the userID from the Clerk auth object
    const { userId: userID }: { userId: string | null } = await auth();
    const body = await req.json();

    const { name } = body;

    if (!userID) {

      return new NextResponse('Unauthorized: Missing UserID', {
        status: 401,
      });
    }

    if(!name) {
      return new NextResponse('Name is missing/required', { status: 400 });
    }

    if(!storeID){
      return new NextResponse('Store ID is missing/required', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        ID: storeID,
        userID
      },
      data: {
        name
      }
    });

    return NextResponse.json(store);

  } catch (error) {
    console.log('📢 [STORES_PATCH]')
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { storeID: string } }) {
  const { storeID } = await params;

  try {
    const { userId: userID } = await auth();

    if (!userID) {

      return new NextResponse('Unauthorized: Missing UserID', {
        status: 401,
      });
    }

    if(!params?.storeID){
      return new NextResponse('Store ID is missing/required', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        ID: storeID,
        userID
      }
    });

    return NextResponse.json(store);

  } catch (error) {
    console.log('📢 [STORES_DELETE]')
    return new NextResponse('Internal Error', { status: 500 });
  }
}