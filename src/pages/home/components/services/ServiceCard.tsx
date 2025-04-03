import React from 'react';

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
    <div className="flex flex-col gap-5 md:gap-6 border border-neutral">
      <img
        src={imageUrl}
        alt={name}
        width={'100%'}
        height={200}
        className="bg-neutral min-h-[150px]"
      />
      <div className="flex flex-col gap-1 px-2 md:px-4 pb-3">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
