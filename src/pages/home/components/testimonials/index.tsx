import Section from '../../../../commons/sections/Section';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';
import author1 from '../../../../assets/images/author-1.jpeg';
import author2 from '../../../../assets/images/author-2.jpg';
import author3 from '../../../../assets/images/author-3.jpeg';
import TestimonialList from './TestimonialList';

const testimonials = [
  {
    id: '1',
    clientName: 'Dr. Eric Paul',
    clientCompany: 'Acme Corp / CEO',
    content: 'Outstanding service and attention to detail. Highly recommended!',
    rating: 5,
    image: author1,
  },
  {
    id: '2',
    clientName: 'Mrs. Ayuk Mayelle Smith',
    clientCompany: 'Tech Solutions / CTO',
    content: 'Delivered exceptional results on time and within budget.',
    rating: 4.5,
    image: author2,
  },
  {
    id: '3',
    clientName: 'Candace Owens',
    clientCompany: 'Innovate Inc / Product Manager',
    content: 'Great communication and technical expertise. Would hire again!',
    rating: 5,
    image: author3,
  },
];
const Testimonials = () => {
  // Generate Review schema for structured data (E-E-A-T)
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: testimonials.map((testimonial, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: testimonial.clientName,
          jobTitle: testimonial.clientCompany,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: testimonial.rating,
          bestRating: 5,
        },
        reviewBody: testimonial.content,
        itemReviewed: {
          '@type': 'Service',
          name: 'Takem Jim - Full Stack Development Services',
          provider: {
            '@type': 'Person',
            name: 'Takem Jim',
            alternateName: 'Takem Jim-Rawlings',
          },
        },
      },
    })),
  };

  // Aggregate rating schema
  const aggregateRating = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Takem Jim - Full Stack Development Services',
    provider: {
      '@type': 'Person',
      name: 'Takem Jim',
      alternateName: 'Takem Jim-Rawlings',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (
        testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      ).toFixed(1),
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      {/* Add Review structured data for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRating) }}
      />
      
      <Section id="testimonials">
        <div className="flex flex-col gap-6 lg:gap-10">
          <SectionHeaderAndDescription
            title="Client Testimonials"
            description="A word from my clients."
          />
          <TestimonialList testimonials={testimonials} />
        </div>
      </Section>
    </>
  );
};

export default Testimonials;
