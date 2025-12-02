'use client';

import { type Stores } from '@prisma/client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/shadcn/badge';
import { Toggle } from '@/components/ui/shadcn/toggle';

import { Button } from '@/components/ui/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/shadcn/command';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import {
  Popover,
  PopoverContent,
  type PopoverTrigger,
} from '@/components/ui/shadcn/popover';
import {
  Check,
  ChevronsUpDown,
  Languages,
  Store as StoreIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import * as React from 'react';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

const langList = [
  {
    value: 'eng',
    label: 'English',
  },
  {
    value: 'fra',
    label: 'Français',
  },
  {
    value: 'nld',
    label: 'Nederlands',
  },
  {
    value: 'esp',
    label: 'Española',
  },
  {
    value: 'por',
    label: 'Português',
  },
];

export default function LangSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="🇬🇧 English" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem className="hover:cursor-pointer" value="eng">
            <Badge variant="outline">🇬🇧</Badge> English{' '}
          </SelectItem>
          <SelectItem className="hover:cursor-pointer" value="fra">
            <Badge variant="outline">🇫🇷</Badge> Français
          </SelectItem>
          <SelectItem className="hover:cursor-pointer" value="ned">
            <Badge variant="outline">🇳🇱</Badge> Nederlands
          </SelectItem>
          <SelectItem className="hover:cursor-pointer" value="esp">
            <Badge variant="outline">🇪🇸</Badge> Española
          </SelectItem>
          <SelectItem className="hover:cursor-pointer" value="por">
            <Badge variant="outline">🇵🇹</Badge> Português
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
