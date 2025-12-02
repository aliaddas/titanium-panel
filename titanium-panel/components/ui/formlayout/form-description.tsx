import React from 'react';

type FormDescriptionProps = {
  size?: 'sm' | 'lg';
  children: React.ReactNode;
  [key: string]: any;
};

const FormDescription: React.FC<FormDescriptionProps> = ({
  size = 'md',
  children,
  ...props
}) => {
  return size === 'sm' ? (
    <h1
      className="block text-[0.8em] font-light italic text-muted-foreground"
      {...props}
    >
      {children}
    </h1>
  ) : size === 'lg' ? (
    <h1
      className="block text-lg font-semibold text-muted-foreground"
      {...props}
    >
      {children}
    </h1>
  ) : null;
};

export { FormDescription };
