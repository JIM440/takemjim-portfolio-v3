import Section from '../../../../commons/sections/Section';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';
import ui from '../../../../assets/images/ui-design.png';
import web from '../../../../assets/images/web.jpeg';
import mobile from '../../../../assets/images/mobile-2.jpg';
import ServiceList from './ServiceList';

const services = [
  {
    id: '1',
    name: 'UI/UX Design',
    description: 'Creating user-centered designs that enhance engagement.',
    imageUrl: ui,
  },
  {
    id: '2',
    name: 'Web Development',
    description: 'Building responsive and robust websites tailored to you.',
    imageUrl: web,
  },
  {
    id: '3',
    name: 'Mobile Development',
    description: 'Developing seamless mobile applications for all platforms.',
    imageUrl: mobile,
  },
];

const Services = () => {
  return (
    <Section id="services">
      <div className="flex flex-col gap-10 lg:gap-16">
        <SectionHeaderAndDescription
          title="Explore My Core Services"
          description="I offer a range of services designed to meet your digital needs. From UI/UX design to full-stack development, I bring your ideas to life."
        />
        <ServiceList services={services} />
      </div>
    </Section>
  );
};

export default Services;
