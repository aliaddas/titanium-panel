import React from 'react';

type FormLabelProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'smtr';
  children: React.ReactNode;
  [key: string]: any;
};

const FormLabel: React.FC<FormLabelProps> = ({
  size = 'md',
  children,
  ...props
}) => {
  return size === 'xs' ? (
    <h1 className="block text-muted-foreground text-xs font-light" {...props}>
      {children}
    </h1>
  ) : size === 'sm' ? (
    <h1 className="block text-muted-foreground text-sm font-light" {...props}>
      {children}
    </h1>
  ) : size === 'md' ? (
    <h1 className="block text-muted-foreground text-base font-light" {...props}>
      {children}
    </h1>
  ) : size === 'lg' ? (
    <h1 className="block text-muted-foreground text-lg font-light" {...props}>
      {children}
    </h1>
  ) : size === 'smtr' ? (
    <h1
      className="block text-muted-foreground text-sm font-light line-clamp-2 truncate"
      {...props}
    >
      {children}
    </h1>
  ) : null;
};

export { FormLabel };
