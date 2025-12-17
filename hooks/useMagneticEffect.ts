import { useEffect, useRef } from 'react';

interface MagneticOptions {
  strength?: number;
  range?: number;
}

export const useMagneticEffect = (options: MagneticOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { strength = 0.3, range = 100 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < range) {
        const force = (range - distance) / range;
        const moveX = deltaX * strength * force;
        const moveY = deltaY * strength * force;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        element.style.transform = 'translate(0px, 0px)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, range]);

  return elementRef;
};