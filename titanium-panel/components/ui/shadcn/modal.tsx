'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { cn } from '@/lib/utils';

// Size mappings for more intuitive modal sizes
const SIZE_PRESETS: any = {
  sm: {
    maxWidth: 'max-w-lg', // Smallest modal size (default)
    smMaxWidth: 'max-w-sm', // Medium screens (sm) will use max-w-sm
    mdMaxWidth: 'max-w-md', // Large screens (md) use max-w-md
  },
  md: {
    maxWidth: 'max-w-2xl', // Medium modal size
    smMaxWidth: 'max-w-md', // Small screens use max-w-md
    mdMaxWidth: 'max-w-lg', // Medium screens use max-w-lg
    lgMaxWidth: 'max-w-3xl', // Large screens use max-w-3xl
  },
  lg: {
    maxWidth: 'max-w-3xl', // Large modal size
    smMaxWidth: 'max-w-3xl', // Small screens use max-w-3xl
    mdMaxWidth: 'max-w-4xl', // Medium screens use max-w-4xl
    lgMaxWidth: 'max-w-6xl', // Large screens use max-w-6xl
    xlMaxWidth: 'max-w-7xl', // Extra-large screens use max-w-7xl
  },
  xl: {
    maxWidth: 'max-w-7xl', // Extra-large modal size
    smMaxWidth: 'max-w-4xl', // Small screens use max-w-4xl
    mdMaxWidth: 'max-w-5xl', // Medium screens use max-w-5xl
    lgMaxWidth: 'max-w-7xl', // Large screens use max-w-7xl
    xlMaxWidth: 'max-w-8xl', // Extra-large screens use max-w-8xl
  },
};

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  height?: string;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  size = 'sm',
  height = '30%',
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Get the responsive size values based on the size prop
  const { maxWidth, smMaxWidth, mdMaxWidth, lgMaxWidth, xlMaxWidth } =
    SIZE_PRESETS[size];

  // Construct dynamic class names for responsive modal sizes
  const modalClasses = cn(
    'fixed z-50 grid w-full gap-4 border bg-white p-0.5 shadow-lg duration-200',
    `left-[50%]`, // Keep centered horizontally
    `top-[50%]`, // Keep centered vertically
    'max-h-[90%]',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'rounded-2xl md:rounded-3xl',
    maxWidth, // Default max width based on size
    smMaxWidth && 'sm:' + smMaxWidth, // Small screen
    mdMaxWidth && 'md:' + mdMaxWidth, // Medium screen
    lgMaxWidth && 'lg:' + lgMaxWidth, // Large screen
    xlMaxWidth && 'xl:' + xlMaxWidth, // Extra large screen
  );

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={modalClasses} style={{ height }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
