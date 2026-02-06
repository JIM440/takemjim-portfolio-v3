import React from 'react';
import { Testimonial } from '../../../../types';
import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';

const TestimonialCard: React.FC<Testimonial> = ({
  clientName,
  clientCompany,
  content,
  rating,
  image,
}) => {
  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return Array.from({ length: totalStars }, (_, index) => {
      if (index < filledStars) {
        return (
          <span key={index} className="text-black">
            ★
          </span>
        );
      } else if (index === filledStars && halfStar) {
        return (
          <span key={index} className="text-black">
            ☆
          </span>
        );
      } else {
        return (
          <span key={index} className="text-black">
            ★
          </span>
        );
      }
    });
  };

  return (
    <ScrollReveal>
      <div className="border border-neutral p-4 flex flex-col space-y-4 basis-full min-[500px]:basis-1/2 min-[700px]:basis-1/3 h-auto">
        {/* Rating */}
        <div className="flex space-x-1">{renderStars(rating)}</div>

        {/* Content */}
        <p className="text-justify">"{content}"</p>

        {/* Author details */}
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={clientName}
            className="w-12 h-12 rounded-full object-cover"
            aria-label={clientName}
            width={48}
            height={48}
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="font-bold">{clientName}</span>
            <span className="text-sm text-black-700">{clientCompany}</span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default TestimonialCard;
