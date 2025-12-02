// app/(dashboard)/[storeID]/layout.tsx
import { auth } from '@clerk/nextjs/server';
import dynamic from 'next/dynamic';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import { ScrollProvider, useScrollContext } from '@/providers/scroll-provider';
import ApplicationHeader from './components/application-header-wrapper';

export default async function ApplicationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeID: string };
}) {
  const { storeID } = await params;

  //<< Extract the userID from the Clerk auth object
  const { userId: userID }: { userId: string | null } = await auth();

  if (!userID) {
    redirect('/sign-in'); //=> Sign-in if not authenticated
  }

  //<< Fetch all the stores for the user
  //% This is used to populate the store switcher dropdown
  const stores = await prismadb.store.findMany({
    where: {
      userID,
    },
  });

  //? Check if the user has at least one store
  const store = await prismadb.store.findFirst({
    where: {
      ID: storeID,
      userID: userID,
    },
  });

  console.log(userID, storeID, store);

  //=> User drops to onboarding page to trigger modal
  if (!store) {
    redirect('/');
  }

  //>> Render the layout
  return (
    <div className="flex flex-col min-h-screen w-screen min-w-[360px] md:p-2 md:pb-0 space-y-4 bg-background">
      {/*//@ Header Section */}
      <ApplicationHeader params={params} stores={stores} />

      {/*//@ Bottom Section */}
      <div className="flex-1 w-full min-w-[360px] transition-all duration-300 ease-in-out overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
