import { useEffect, useCallback } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: string;
  offset?: number;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { duration = 800, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', offset = 80 } = options;

  const scrollToElement = useCallback((target: string | Element) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) return;

    // Use native smooth scroll for better performance
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Optimize scroll performance
  useEffect(() => {
    // Add CSS for smooth scrolling if not present
    const styleId = 'smooth-scroll-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        html {
          scroll-behavior: smooth;
          scroll-padding-top: ${offset}px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  return {
    scrollToElement,
    scrollToTop
  };
};