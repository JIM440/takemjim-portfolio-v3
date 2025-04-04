import React, { useRef, useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../../../../types';
import { ArrowLeftSquare, ArrowRightSquare } from 'react-bootstrap-icons';

interface TestimonialListProps {
  testimonials: Testimonial[];
}

const TestimonialList: React.FC<TestimonialListProps> = ({ testimonials }) => {
  const testimonialContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check overflow and scroll position
  const checkScrollState = () => {
    if (testimonialContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        testimonialContainerRef.current;
      const hasOverflow = scrollWidth > clientWidth;

      setIsOverflowing(hasOverflow);
      setCanScrollLeft(hasOverflow && scrollLeft > 0);
      setCanScrollRight(hasOverflow && scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Handle scroll event
  const handleScroll = () => {
    checkScrollState();
  };

  // Initial check and window resize listener
  useEffect(() => {
    checkScrollState(); // Check on mount
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [testimonials]); // Re-check when testimonials change

  const scrollLeft = () => {
    if (testimonialContainerRef.current) {
      testimonialContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (testimonialContainerRef.current) {
      testimonialContainerRef.current.scrollBy({
        left: 300,
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
      {isOverflowing && (
        <div className="flex gap-2 justify-end mt-4">
          <button
            className={`p-1 ${
              !canScrollLeft ? 'opacity-50 cursor-default' : ''
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll testimonials left"
          >
            <ArrowLeftSquare className="text-black" size={20} />
          </button>
          <button
            className={`p-1 ${
              !canScrollRight ? 'opacity-50 cursor-default' : ''
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll testimonials right"
          >
            <ArrowRightSquare className="text-black" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialList;
