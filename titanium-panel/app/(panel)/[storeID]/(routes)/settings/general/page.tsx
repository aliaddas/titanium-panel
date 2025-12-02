//>> Import for UI components
import { CardContent, CardTitle } from '@/components/ui/shadcn/card';

//>> Import for Hooks
import React from 'react';

//>> Import for Schema validation
import { Separator } from '@radix-ui/react-separator';
import { Store } from '@prisma/client';
import prismadb from '@/lib/prismadb';
import GeneralSettingsForm from './branding-domain-form';

interface GeneralSettingsProps {
  initialData: Store | null;
  params: {
    storeID: string;
  };
}

const GeneralSettings = async ({
  params,
}: {
  initialData: Store;
  params: { storeID: string };
}) => {
  const { storeID } = await params;

  const store = await prismadb.store.findUnique({
    where: {
      ID: storeID,
    },
  });
  return (
    <div className="w-full border-2 rounded-lg bg-slate-50 p-4 flex flex-col">
      <CardTitle>General Settings</CardTitle>
      <Separator
        className="mt-2 h-0.5 md:max-w-[70%] rounded-full bg-slate-200"
        orientation="horizontal"
      />
      <CardContent className="mt-4 px-2">
        <GeneralSettingsForm initialData={store} />
      </CardContent>
    </div>
  );
};

export default GeneralSettings;
