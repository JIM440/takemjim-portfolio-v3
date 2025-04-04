import {
  Facebook,
  Instagram,
  TwitterX,
  Linkedin,
  // Youtube,
} from 'react-bootstrap-icons';
import Input from '../../input';
import Button from '../../buttons';
import logo from '../../../assets/icons/logo.png';
import logoDark from '../../../assets/icons/logo-dark.png';
import { useState } from 'react';
import useTheme from '../../../hooks/useTheme';

// Social media icons using React Bootstrap Icons
const socialIcons = [
  { name: 'LinkedIn', icon: Linkedin, link: 'https://linkedin.com/takem-jim' },
  { name: 'Twitter', icon: TwitterX, link: 'https://x.com/takem-jim' },
  { name: 'Facebook', icon: Facebook, link: 'https://facebook.com' },
  {
    name: 'Instagram',
    icon: Instagram,
    link: 'https://instagram.com/takemjim43',
  },
  // { name: 'YouTube', icon: Youtube, link: 'https://youtube.com' },
];

const Footer = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  return (
    <footer className="section-wrapper py-4">
      <div className="flex flex-wrap gap-8 justify-between">
        {/* Logo and Newsletter Section */}
        <div className="max-w-[500px]">
          <img src={theme === 'dark' ? logoDark : logo} height={36} />
          <p className="text-black mb-4">
            Subscribe to my newsletter for the latest updates and features.
          </p>
          <div className="flex gap-2">
            <Input
              name="email"
              type="email"
              placeholder="Your email here"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button
              title="Join"
              variant="outlined"
              className="mt-1 mb-4 py-2.5"
            />
          </div>
          <p className="text-black text-sm mt-2">
            By subscribing, you consent to my
            <a href="/privacy-policy" className="text-sm text-black underline">
              Privacy Policy
            </a>{' '}
            and receive updates.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="max-w-[400px] min-w-[200px]">
          <h3 className="text-lg mb-4">Quick Links:</h3>
          <ul className="space-y-2">
            {['Home', 'About Me', 'My Services', 'Projects', 'Contact Me'].map(
              (link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-black text-sm"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Code & Content Section */}
        <div className="max-w-[400px] min-w-[200px]">
          <h3 className="text-lg mb-4">Code & Content:</h3>
          <ul className="space-y-2">
            {['GitHub', 'Bitbucket', 'Blog'].map((item) => (
              <li key={item}>
                <a
                  href={`https://${item.toLowerCase()}.com/jim440`}
                  className="font-medium text-black text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Find Me Here Section */}
        <div className="max-w-[400px] min-w-[200px]">
          <h3 className="text-lg mb-4">Find me here:</h3>
          <div className="flex flex-col space-y-4">
            {socialIcons.map((social) => {
              const IconComponent = social.icon; // Dynamically assign the icon component
              return (
                <a
                  key={social.name}
                  href={social.link}
                  className="text-black text-sm flex gap-2 items-center"
                  aria-label={social.name}
                >
                  <IconComponent />
                  <p className="mr-1 font-medium">{social.name}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 pt-4 border-t border-neutral text-center">
        <p className="text-sm">© 2025 Takem Jim. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
