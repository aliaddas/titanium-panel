import React from 'react';
import { cn } from '@/lib/utils';

type FormLabelProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

const FormTitle: React.FC<FormLabelProps> = ({
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <h1
      className={cn(
        'block mb-2 text-md font-semibold text-foreground truncate',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export { FormTitle };
