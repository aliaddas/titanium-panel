import { Squircle as SquircleBase } from 'corner-smoothing';
import React from 'react';

type Props = {
  children: React.ReactNode;
  cornerRadius: number;
  cornerSmoothing: number;
  borderWidth?: number;
  variant?: 'filled' | 'bordered';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function Squircle({
  children,
  cornerRadius,
  cornerSmoothing,
  borderWidth = 0,
  variant = 'filled',
  className,
  onClick,
}: Props) {
  const baseClasses = 'relative';
  const filledClasses = 'bg-card text-white';
  const borderedClasses = 'bg-white text-gray-800 border border-gray-300';

  const variantClasses = variant === 'filled' ? filledClasses : borderedClasses;

  return (
    <SquircleBase
      cornerRadius={cornerRadius}
      cornerSmoothing={cornerSmoothing}
      borderWidth={borderWidth}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </SquircleBase>
  );
}
