import React from 'react';
import ScrollReveal from '../scroll-reveal/ScrollReveal';

interface SectionHeaderAndDescriptionProps {
  title: string;
  description?: string; // Description is optional
}

const SectionHeaderAndDescription: React.FC<
  SectionHeaderAndDescriptionProps
> = ({ title, description }) => {
  return (
    <ScrollReveal>
      <div className="flex flex-col gap-2 md:gap-3">
        <h2>{title}</h2>
        {description && (
          <p className="max-w-[768px] text-justify">{description}</p>
        )}
      </div>
    </ScrollReveal>
  );
};

export default SectionHeaderAndDescription;
