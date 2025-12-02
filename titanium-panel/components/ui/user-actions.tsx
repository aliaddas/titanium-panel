'use client';

import React, { use, useEffect, useState } from 'react';
import AuthUserButton from './shadcn/userbutton';
import { SignOutButton } from '@clerk/nextjs';
import { ExitIcon } from '@radix-ui/react-icons';
import { Button } from './shadcn/button';
import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { SheetClose } from './shadcn/sheet';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Sheet } from 'lucide-react';
import { useDeviceType } from '@/hooks/use-device-type';

export const UserActions: React.FC = () => {
  const pathname = usePathname();
  const params = useParams();
  const { storeID } = params;

  const settingsRoutes = [
    'general',
    'user-roles',
    'alerts',
    'security',
    'advanced',
  ];

  const [isInSettings, setIsInSettings] = useState(false);
  useEffect(() => {
    setIsInSettings(settingsRoutes.includes(pathname.split('/')[2]));
  }, [pathname]);

  return (
    <div className="flex space-x-2 items-center">
      <Link href={`/${storeID}/settings`}>
        <Button
          className={`
                  group inline-flex h-10 w-max items-center justify-center
                  rounded-xl border-2 bg-background px-4 py-2 text-sm font-medium text-primary
                  transition-colors duration-150 transform
                  active:scale-90 active:bg-nav active:text-nav-active
                  data-[active]:scale-105
                  data-[active]:drop-shadow-lg
                  data-[active]:text-nav-active
                  data-[active]:bg-nav
                  data-[active]:focus:bg-nav
                  data-[active]:active:scale-y-100
                  data-[state=open]:bg-accent/50
                  disabled:pointer-events-none
                  disabled:opacity-50 focus:outline-none
                  hover:bg-nav-hover hover:active:text-nav-hover-foreground
                  ${isInSettings ? 'scale-105 border-1 drop-shadow-lg text-nav-active bg-nav focus:bg-nav' : ''}`}
          onClick={() => {
            // Trigger parent sheet close
            (
              document.querySelector('[data-radix-sheet-close]') as HTMLElement
            )?.click();
          }}
        >
          Settings
        </Button>
      </Link>
      <AuthUserButton />
      <Separator className="bg-muted w-[2px] h-6" orientation="vertical" />
      <SignOutButton>
        <Button className="px-1" variant={'secondaryoutlined'}>
          <ExitIcon />
        </Button>
      </SignOutButton>
    </div>
  );
};
