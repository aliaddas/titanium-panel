import React from 'react';
import { useUploadModal } from '@/hooks/use-upload-modal';

import { SettingsNav } from './components/settings-navbar';
import SettingsPage from './page';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { Badge } from '@/components/ui/shadcn/badge';
import { Separator } from '@/components/ui/shadcn/separator';
import { FormLabel } from '@/components/ui/formlayout/form-label';
import prismadb from '@/lib/prismadb';
import GeneralSettings from './general/page';

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  return (
    <div className="h-full pb-4">
      <Card className="h-full">
        <CardHeader className="p-2 pb-0 md:p-6 md:pb-0">
          <Badge variant={'secondary'} className="mr-auto p-1">
            <h1 className="text-lg">Settings</h1>
          </Badge>
          <FormLabel>
            Manage your store settings, branding, domain setup, and everything
            else.
          </FormLabel>
          <Separator className="hidden md:block" />
        </CardHeader>
        <CardContent className="p-2 md:p-6 md:flex space-y-4 md:space-y-0 md:gap-4">
          <SettingsNav />
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
