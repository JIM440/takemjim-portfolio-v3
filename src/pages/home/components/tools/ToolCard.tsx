import React from 'react';

interface ToolCardProps {
  name: string;
  imageUrl: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ name, imageUrl }) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="h-[40px]">
        <img
          src={imageUrl}
          alt={name}
          width={40}
          height={40}
          style={{ maxHeight: '100%' }}
        />
      </div>
      <p className="font-semibold text-sm">{name}</p>
    </div>
  );
};

export default ToolCard;
