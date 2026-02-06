import React from 'react';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../../../../types';

interface TestimonialListProps {
  testimonials: Testimonial[];
}

const TestimonialList: React.FC<TestimonialListProps> = ({ testimonials }) => {
  return (
    <div className="pb-4">
      <div className="flex flex-wrap justify-start gap-6 w-full pb-8">
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
    </div>
  );
};

export default TestimonialList;
