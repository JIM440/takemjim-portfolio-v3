import React from 'react';
import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';

interface ServiceCardProps {
  imageUrl: string;
  name: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageUrl,
  name,
  description,
}) => {
  return (
    <ScrollReveal>
      <div className="flex flex-col gap-5 md:gap-6 border border-neutral">
        <img
          src={imageUrl}
          alt={name}
          width={'100%'}
          height={200}
          className="bg-neutral min-h-[150px]"
          aria-label={ServiceCard.name}
        />
        <div className="flex flex-col gap-1 px-2 md:px-4 pb-3">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ServiceCard;
