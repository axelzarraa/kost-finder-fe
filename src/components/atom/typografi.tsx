import React, { JSX } from 'react';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className = '',
}) => {
  const baseClasses = 'text-gray-800'; // Base styles, can be customized
  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    p: 'text-base',
    span: 'text-sm',
  };

  const combinedClass = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const Element = variant as keyof JSX.IntrinsicElements;

  return React.createElement(Element, { className: combinedClass }, children);
};

export default Typography;