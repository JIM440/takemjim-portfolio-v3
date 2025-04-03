// src/components/ScrollToTop.tsx
import React, { useState, useEffect } from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const checkScrollTop = () => {
    if (window.pageYOffset > 150) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', checkScrollTop);

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      title="Back to top"
      className={`fixed bottom-5 right-5 p-2 rounded-full text-white bg-black transition-all ${
        visible ? 'block' : 'hidden'
      } sm:hidden`}
    >
      <ArrowUpShort size={24} />
    </button>
  );
};

export default ScrollToTop;
