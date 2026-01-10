import { useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import logo from '../../../assets/icons/logo.png';
import logoDark from '../../../assets/icons/logo-dark.png';
import Button from '../../buttons';
import { BrightnessHigh, List, X } from 'react-bootstrap-icons';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="section-wrapper py-3 border-b-1 border-neutral sticky top-0 bg-white z-[1000]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="/">
          <div>
            <img
              src={theme === 'dark' ? logoDark : logo}
              alt="logo"
              width={84}
              height={36}
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-2xl font-bold"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 mx-auto">
          {[
            { name: 'Home', path: '/#home' },
            { name: 'About Me', path: '/#about' },
            { name: 'Services', path: '/#services' },
            { name: 'Projects', path: '/#projects' },
          ].map((item) => (
            <li key={item.name}>
              <a href={item.path} className="text-black text-sm lg:text-lg">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side: Contact Button and Theme Toggle (Desktop) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="switch theme"
          >
            <BrightnessHigh className="text-black" size={22} />
          </button>
          <a href="/#contact" className="hidden md:flex">
            <Button title="Contact" />
          </a>

          {/* Hamburger Menu Icon (Mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="open menu"
          >
            <List className="text-black" size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileMenu} aria-label="close menu">
            <X className="text-black" size={28} />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
          {[
            { name: 'Home', path: '/#home' },
            { name: 'About Me', path: '/#about' },
            { name: 'Services', path: '/#services' },
            { name: 'Projects', path: '/#projects' },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={`${item.path}`}
                className="text-black"
                onClick={closeMobileMenu}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a href="/takem-jim-cv.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                title="Download CV"
                variant="outlined"
                className="w-[200px]"
                onClick={closeMobileMenu}
              />
            </a>
          </li>
          <li>
            <a href="/#contact" onClick={closeMobileMenu}>
              <Button title="Contact" className="w-[200px]" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
