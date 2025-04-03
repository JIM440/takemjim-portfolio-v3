import React, { useRef, useState } from 'react';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../../../../types';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

interface TestimonialListProps {
  testimonials: Testimonial[];
}

const TestimonialList: React.FC<TestimonialListProps> = ({ testimonials }) => {
  const testimonialContainerRef = useRef<HTMLDivElement | null>(null); // Reference to the container
  const [canScrollLeft, setCanScrollLeft] = useState(false); // State to track if left scroll is possible
  const [canScrollRight, setCanScrollRight] = useState(true); // State to track if right scroll is possible

  const handleScroll = () => {
    if (testimonialContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        testimonialContainerRef.current;
      // Enable/disable buttons based on scroll position
      setCanScrollLeft(scrollLeft > 0); // Left scroll possible if scrollLeft is greater than 0
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth); // Right scroll possible if scrollLeft is less than the scrollable width
    }
  };

  const scrollLeft = () => {
    if (testimonialContainerRef.current) {
      testimonialContainerRef.current.scrollBy({
        left: -300, // Scroll left by a fixed amount
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (testimonialContainerRef.current) {
      testimonialContainerRef.current.scrollBy({
        left: 300, // Scroll right by a fixed amount
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="pb-4">
      <div
        className="flex gap-4 overflow-x-auto testimonial-container pb-8"
        ref={testimonialContainerRef}
        onScroll={handleScroll}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            id={testimonial.id}
            clientName={testimonial.clientName}
            clientCompany={testimonial.clientCompany}
            content={testimonial.content}
            rating={testimonial.rating}
            image={testimonial.image}
          />
        ))}
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <button
          className={`p-2 flex items-center justify-baseline bg-neutral ${
            !canScrollLeft ? 'opacity-50 cursor-default' : ''
          }`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="text-black" size={24} />
        </button>
        <button
          className={`p-2 flex items-center justify-baseline bg-neutral ${
            !canScrollRight ? 'opacity-50 cursor-default' : ''
          }`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight className="text-black" size={24} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialList;
