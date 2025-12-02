'use client';

import React, { useEffect, useState } from 'react';
import AuthUserButton from './userbutton';
import { SignOutButton } from '@clerk/nextjs';
import { ExitIcon } from '@radix-ui/react-icons';
import { Button } from './button';
import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { SheetClose } from './sheet';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Sheet, Wrench } from 'lucide-react';
import { useDeviceType } from '@/hooks/use-device-type';
import {
  NavigationMenu,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import { set } from 'zod';

export const UserActions: React.FC = () => {
  const pathname = usePathname();
  const params = useParams();
  const { storeID } = params;

  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  const settingsRoutes = [
    { href: `/${storeID}/settings/general` },
    { href: `/${storeID}/settings/user-roles` },
    { href: `/${storeID}/settings/alerts` },
    { href: `/${storeID}/settings/security` },
    { href: `/${storeID}/settings/advanced` },
  ];

  const [isOnSettingsPage, setIsOnSettingsPage] = useState(false);

  useEffect(() => {
    setIsOnSettingsPage(
      //@ Check if the current pathname is one of the settings routes
      settingsRoutes.some((route) => route.href === pathname),
    );
  }, [pathname]);

  const buttonClassName = `
    group inline-flex h-10 w-max items-center justify-center
    rounded-xl border-1 bg-background px-4 py-2 text-sm font-medium text-primary
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
    ${
      isOnSettingsPage
        ? 'scale-105 drop-shadow-lg text-nav-active bg-nav focus:bg-nav'
        : 'scale-100 border-2'
    }`;

  return (
    <div className="flex space-x-2 items-center">
      {!isMobile ? (
        <NavigationMenu>
          <NavigationMenuLink
            href={`/${storeID}/settings/general`}
            active={isOnSettingsPage}
            className={buttonClassName}
            onClick={() => {
              // Trigger parent sheet close
              (
                document.querySelector(
                  '[data-radix-sheet-close]',
                ) as HTMLElement
              )?.click();
            }}
          >
            <Wrench size={16} className="mr-2" />
            My Panel
          </NavigationMenuLink>
        </NavigationMenu>
      ) : (
        <SheetClose>
          <NavigationMenu className="flex items-center">
            <NavigationMenuLink
              href={`/${storeID}/settings/general`}
              active={isOnSettingsPage}
              className={buttonClassName}
              onClick={() => {
                // Trigger parent sheet close
                (
                  document.querySelector(
                    '[data-radix-sheet-close]',
                  ) as HTMLElement
                )?.click();
              }}
            >
              <Wrench size={16} className="mr-2" />
              My Panel
            </NavigationMenuLink>
          </NavigationMenu>
        </SheetClose>
      )}
      <AuthUserButton />
      <Separator className="bg-muted w-[2px] h-8" orientation="vertical" />
    </div>
  );
};

{
  /*
  <SignOutButton>
        <Button className="px-1" variant={'secondaryoutlined'}>
          <ExitIcon />
        </Button>
      </SignOutButton>

  */
}
