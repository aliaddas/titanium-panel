import React from 'react';
import { DashboardIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/shadcn/button';
import Link from 'next/link';
import { type Url } from 'next/dist/shared/lib/router/router';
import { Badge } from '@/components/ui/shadcn/badge';

type Props = {
  href: Url;
  text: string;
  children?: React.ReactNode;
};
export function IconButton({ href, text }: Props) {
  return (
    <Button
      asChild
      className="
		flex
		items-center
		justify-center
		h-full
		bg-gradient-to-br from-slate-900 via-neutral-200 to-white

		transition-all ease-in-out delay-10
		hover:py-9 "
    >
      <Link href={href}>
        <Badge variant={'secondary'} className="p-3 text-md border-gray-300">
          <DashboardIcon className="mr-2 h-4 w-4" />
          {text}
        </Badge>
      </Link>
    </Button>
  );
}
