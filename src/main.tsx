import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGA, trackPageView } from './utils/analytics';

// Initialize Google Analytics
// Replace 'G-XXXXXXXXXX' with your actual Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Initialize GA on app load
if (typeof window !== 'undefined') {
  initGA(GA_MEASUREMENT_ID);
  
  // Track initial page view
  trackPageView(window.location.pathname, document.title);
  
  // Track page views on route changes (for SPA)
  let lastPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      trackPageView(currentPath, document.title);
      lastPath = currentPath;
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
