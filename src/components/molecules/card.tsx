import React from 'react';
import CardImage from '../atom/cardImage';
import Typography from '../atom/typografi';
import Chip from '../atom/chip';

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  chipLabel?: string;
  chipVariant?: 'primary' | 'secondary' | 'success' | 'danger';
  className?: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  chipLabel,
  chipVariant = 'primary',
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      <CardImage src={imageSrc} alt={imageAlt} />
      <div className="p-4">
        <Typography variant="h3" className="mb-2">
          {title}
        </Typography>
        <Typography variant="p" className="text-gray-600 mb-2">
          {description}
        </Typography>
        {chipLabel && <Chip label={chipLabel} variant={chipVariant} />}
      </div>
    </div>
  );
};

export default Card;