import React from 'react';

interface SectionHeaderAndDescriptionProps {
  title: string;
  description?: string; // Description is optional
}

const SectionHeaderAndDescription: React.FC<
  SectionHeaderAndDescriptionProps
> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <h2>{title}</h2>
      {description && <p className="max-w-[768px]">{description}</p>}
    </div>
  );
};

export default SectionHeaderAndDescription;
