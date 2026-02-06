/**
 * Google Analytics 4 (GA4) Integration
 * 
 * To set up:
 * 1. Go to https://analytics.google.com/
 * 2. Create a new property for your website
 * 3. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 4. Replace 'G-XXXXXXXXXX' in index.html with your actual Measurement ID
 * 5. Deploy and verify tracking in Google Analytics dashboard
 */

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string | object,
      config?: object
    ) => void;
    dataLayer: unknown[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Create dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: true,
  });
};

// Track page views
export const trackPageView = (path: string, title?: string, measurementId?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  const id = measurementId || 'G-XXXXXXXXXX';
  window.gtag('config', id, {
    page_path: path,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: unknown;
  }
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, eventParams);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || window.location.pathname,
  });
};

// Track link clicks
export const trackLinkClick = (linkUrl: string, linkText?: string) => {
  trackEvent('link_click', {
    link_url: linkUrl,
    link_text: linkText,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

// Track project views
export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    project_name: projectName,
  });
};

// Track section views (for scroll tracking)
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

// Track download events
export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string, url: string) => {
  trackEvent('social_click', {
    platform: platform,
    url: url,
  });
};

