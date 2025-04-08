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
          width={253}
          height={150}
          className="bg-neutral min-h-[150px] w-[100%] h-auto"
          aria-label={ServiceCard.name}
          loading="lazy"
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
