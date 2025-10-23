import React from 'react';

interface ChipProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  onClick?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'primary',
  onClick,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
  };

  const combinedClass = `${baseClasses} ${variantClasses[variant]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`;

  return (
    <span className={combinedClass} onClick={onClick}>
      {label}
    </span>
  );
};

export default Chip;