import React from 'react';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = '',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-48 object-cover rounded-lg shadow-md ${className}`}
    />
  );
};

export default CardImage;