import ContactForm from './ContactForm';
import Section from '../../../../commons/sections/Section';
import ContactDetails from './ContactDetails';

const Contact = () => {
  return (
    <Section id="contact">
      <div className="grid grid-cols-none gap-10 lg:grid-cols-2 lg:gap-20">
        <ContactDetails />
        <ContactForm />
      </div>
    </Section>
  );
};

export default Contact;
