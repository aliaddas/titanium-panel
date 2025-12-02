'use client';

//>
//> Imports
//>

//> React
import * as React from 'react';

//> Utils
import { cn } from '@/lib/utils';

//>
//> UI Imports
//>

//> Components
import { Button } from '@/components/ui/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/shadcn/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn/popover';

//> Icons
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

//? Types
type ComboBoxProps = {
  options: { type: string; label: string }[];
  type: string;
  onSelect: (type: string) => void;
};

export function VariantTypeComboBox({
  options,
  type,
  onSelect,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentType: string) => {
    onSelect(currentType);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-fit justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-[1.5px] focus:ring-offset-2 focus:ring-primary"
        >
          {type
            ? options.find((option) => option.type === type)?.label
            : 'Select type...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
        <Command>
          <CommandInput
            placeholder="Search type..."
            className="h-9 px-3 py-2 border-b border-gray-200 focus:outline-none"
          />
          <CommandEmpty className="px-3 py-2 text-sm text-gray-500">
            No type found.
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.type}
                value={option.type}
                onSelect={() => handleSelect(option.type)}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4 text-primary',
                    type === option.type ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
