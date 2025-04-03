import Section from '../../../../commons/sections/Section';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';
import placeholder from '../../../../assets/images/placeholder.png';
import TestimonialList from './TestimonialList';

const testimonials = [
  {
    id: '1',
    clientName: 'John Doe',
    clientCompany: 'Acme Corp / CEO',
    content: 'Outstanding service and attention to detail. Highly recommended!',
    rating: 5,
    image: placeholder,
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    clientCompany: 'Tech Solutions / CTO',
    content: 'Delivered exceptional results on time and within budget.',
    rating: 4.5,
    image: placeholder,
  },
  {
    id: '3',
    clientName: 'Michael Brown',
    clientCompany: 'Innovate Inc / Product Manager',
    content: 'Great communication and technical expertise. Would hire again!',
    rating: 5,
    image: placeholder,
  },
];
const Testimonials = () => {
  return (
    <Section id="testimonials">
      <div className="flex flex-col gap-6 lg:gap-10">
        <SectionHeaderAndDescription
          title="Client Testimonials"
          description="A word from my clients."
        />
        <TestimonialList testimonials={testimonials} />
      </div>
    </Section>
  );
};

export default Testimonials;
