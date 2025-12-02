import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //! Primary Auth Check
  const { userId: userID }: { userId: string | null } = await auth();
  if (!userID) {
    redirect('/sign-in'); //=> Sign-in
  }

  //<< Fetch Store
  const store = await prismadb.store.findFirst({
    where: {
      userID: userID,
    },
  });

  //=> Send user to dashboard
  if (store) {
    redirect(`/${store.ID}/dashboard`);
  }

  //=> Else - User drops to onboarding page to trigger modal
  return <>{children}</>;
}
