/* eslint-disable @typescript-eslint/restrict-template-expressions */

'use client';

import * as React from 'react';
import Link from 'next/link';

import { CodeSandboxLogoIcon } from '@radix-ui/react-icons';
import { DashboardIcon } from '@radix-ui/react-icons';
import { GearIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/shadcn/icons';
import { useParams, usePathname } from 'next/navigation';

import './css/nav-menu.css';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  navigationSheetMenuTriggerStyle,
} from '@/components/ui/shadcn/navigation-menu';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/shadcn/sheet';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/shadcn/tabs';
import { Badge } from '@/components/ui/shadcn/badge';
import { useEffect, useState } from 'react';

import { PersonIcon } from '@radix-ui/react-icons';
import { Button } from './ui/shadcn/button';
import StoreSwitcher from './ui/shadcn/store-switcher';
import { Store } from '@prisma/client';
import {
  Folders,
  Headset,
  LayoutDashboard,
  Menu,
  Shirt,
  User,
} from 'lucide-react';
import { UserActions } from './ui/shadcn/user-actions';
import { Card } from './ui/shadcn/card';
import { Label } from './ui/shadcn/label';

import { useDeviceType } from '@/hooks/use-device-type';

interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
  stores: Store[];
}

export const NavMenu: React.FC<NavMenuProps> = ({ stores, ...props }) => {
  const pathname = usePathname();
  const params = useParams();

  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  // ROUTES FOR NAVIGATION BAR
  const panelRoutes = [
    {
      // DASHBOARD
      href: `/${params.storeID}/dashboard`,
      label: 'Dashboard',
      active: pathname === `/${params.storeID}/dashboard`,
    },
    {
      // PRODUCTS
      href: `/${params.storeID}/products`,
      label: 'Products',
      active: pathname.includes(`/${params.storeID}/products`),
    },
    {
      // CLIENT HUB
      href: `/${params.storeID}/client-hub`,
      label: 'Client Hub',
      active: pathname.includes(`/${params.storeID}/client-hub`),
    },
    {
      // QUICK LIBRARY
      href: `/${params.storeID}/asset-library`,
      label: 'My Assets',
      active: pathname.includes(`/${params.storeID}/asset-library`),
    },
  ];

  if (isMobile) {
    return (
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <div
              className={`flex p-2 bg-nav drop-shadow-lg rounded-lg transition-smoothen ${isLargeDevice ? 'sm' : 'xl'}`}
              onClick={() => {
                // Handle click event
              }}
            >
              <Menu className="text-secondary w-6 h-6 ml-1 mr-1" />
              {isMobile && (
                <Label
                  className={`text-md text-secondary mr-1 ${isSmallDevice ? 'slide-in-from-right-0' : ''}`}
                >
                  Menu
                </Label>
              )}
            </div>
          </SheetTrigger>
          <SheetContent className="w-screen flex flex-col h-full">
            {/* Header - Menu */}
            <SheetHeader className="text-center">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigation</SheetDescription>
            </SheetHeader>

            {/* Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList className="grid grid-cols-2 space-x-0 gap-2">
                {panelRoutes.map((route, index) => (
                  <NavigationMenuItem key={index}>
                    <SheetClose>
                      <NavigationMenuLink
                        href={route.href}
                        className={cn(navigationSheetMenuTriggerStyle())}
                        active={route.active}
                        onClick={() => {
                          (
                            document.querySelector(
                              '[data-radix-sheet-close]',
                            ) as HTMLElement
                          )?.click();
                        }}
                      >
                        {index === 0 && (
                          <LayoutDashboard size={18} className="mr-2" />
                        )}
                        {index === 1 && <Shirt size={18} className="mr-2" />}
                        {index === 2 && <Headset size={18} className="mr-2" />}
                        {index === 3 && <Folders size={18} className="mr-2" />}
                        {route.label}
                      </NavigationMenuLink>
                    </SheetClose>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Middle Section (white card grows to take all remaining space) */}
            <div className="flex-grow bg-white rounded-md shadow-md p-4"></div>

            {/* Footer Section */}
            <span className="flex justify-between pt-2 border-t">
              <UserActions />
              <StoreSwitcher stores={stores} />
            </span>
          </SheetContent>
        </Sheet>
      </div>
    );
  } else {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          {panelRoutes.map((route, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                href={route.href}
                active={route.active}
                className={navigationMenuTriggerStyle()}
              >
                {index === 0 && <LayoutDashboard size={18} className="mr-2" />}
                {index === 1 && <Shirt size={18} className="mr-2" />}
                {index === 2 && <Headset size={18} className="mr-2" />}
                {index === 3 && <Folders size={18} className="mr-2" />}
                {route.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-0 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
