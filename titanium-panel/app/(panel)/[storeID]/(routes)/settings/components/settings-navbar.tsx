/* eslint-disable react/prop-types */
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/shadcn/button';

import { cn } from '@/lib/utils';
import {
  BellRing,
  HeartHandshake,
  ServerCog,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

type SettingsNavProps = React.HTMLAttributes<HTMLElement>;

export function SettingsNav({ className, ...props }: SettingsNavProps) {
  const params = useParams();
  const pathname = usePathname();

  const settingsNavItems = [
    {
      title: 'Branding & Domain',
      href: `/${params.storeID}/settings/general`,
    },
    {
      title: 'Users & Permissions',
      href: `/${params.storeID}/settings/user-roles`,
    },
    {
      title: 'Notifications',
      href: `/${params.storeID}/settings/alerts`,
    },
    {
      title: 'Security',
      href: `/${params.storeID}/settings/security`,
    },
    {
      title: 'Advanced Settings',
      href: `/${params.storeID}/settings/advanced`,
    },
  ];

  return (
    <nav
      className={cn(
        'h-max flex-wrap justify-evenly px-1 p-[1px] gap-1 sm:gap-0 sm:p-2 sm:gap-x-4 md:p-[1px] border-2 rounded-lg sm:flex-nowrap grid grid-cols-2 md:flex md:flex-col md:space-y-1 w-full sm:min-w-1/4 md:w-1/3',
        className,
      )}
      {...props}
    >
      {settingsNavItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({
              variant: pathname === item.href ? 'outline' : 'secondary',
            }),
            pathname === item.href
              ? 'bg-slate-200 md:hover:bg-slate-200 sm:scale-x-[103%] md:scale-[103%] pl-10 text-slate-900'
              : 'bg-slate-50 md:hover:bg-slate-100 hover:underline border',
            'justify-start',
            'text-xs sm:text-sm md:text-base transition-transform',
          )}
        >
          {index === 0 ? (
            <HeartHandshake className="mr-1 md:mr-2" size={18} />
          ) : (
            ''
          )}
          {index === 1 ? <UsersRound className="mr-1 md:mr-2" size={18} /> : ''}
          {index === 2 ? <BellRing className="mr-1 md:mr-2" size={18} /> : ''}
          {index === 3 ? (
            <ShieldCheck className="mr-1 md:mr-2" size={18} />
          ) : (
            ''
          )}
          {index === 4 ? <ServerCog className="mr-1 md:mr-2" size={18} /> : ''}

          {item.title}
        </Link>
      ))}
    </nav>
  );
}
