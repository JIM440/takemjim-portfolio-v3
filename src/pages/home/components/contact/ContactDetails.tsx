import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';
import { Crosshair, Envelope, Telephone } from 'react-bootstrap-icons';

const ContactDetails = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 lg:gap-10">
        <SectionHeaderAndDescription
          title="Get In Touch"
          description="Have a project in mind or just want to say hello? Feel free to reach out!"
        />
        <ScrollReveal>
          <div className="flex flex-col gap-3 lg:gap-4">
            {/* Contact details section */}
            <div className="flex items-start gap-4">
              <Envelope className="text-black" size={18} /> {/* Email icon */}
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-black-700">takemjim43@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Telephone className="text-black" size={18} /> {/* Phone icon */}
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-black-700">+237-654-812-052</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Crosshair className="text-black" size={18} />{' '}
              {/* Location icon */}
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm text-black-700">Buea, Cameroon</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ContactDetails;
