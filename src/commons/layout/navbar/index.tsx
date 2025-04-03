import React, { useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import logo from '../../../assets/icons/logo.png';
import logoDark from '../../../assets/icons/logo-dark.png';
import Button from '../../buttons';
import { BrightnessHigh, Moon, List, X } from 'react-bootstrap-icons';

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
    <nav className="section-wrapper py-3 border-b-1 border-neutral sticky top-0 bg-white">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <a href="#home">
          <div>
            <img
              src={theme === 'dark' ? logoDark : logo}
              alt="logo"
              width={84}
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-2xl font-bold"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 mx-auto">
          {['Home', 'About Me', 'Services', 'Projects'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-black text-sm lg:text-lg"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side: Contact Button and Theme Toggle (Desktop) */}
        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:flex">
            <Button title="Contact" />
          </a>
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <Moon className="text-black" size={22} />
            ) : (
              <BrightnessHigh className="text-black" size={22} />
            )}
          </button>

          {/* Hamburger Menu Icon (Mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Open menu"
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
          <button onClick={toggleMobileMenu} aria-label="Close menu">
            <X className="text-black" size={28} />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
          {['Home', 'About Me', 'Services', 'Projects'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-black"
                onClick={closeMobileMenu}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a href="/cv.pdf">
              <Button
                title="Download CV"
                variant="outlined"
                className="w-[200px]"
              />
            </a>
          </li>
          <li>
            <a href="#contact">
              <Button title="Contact" className="w-[200px]" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
