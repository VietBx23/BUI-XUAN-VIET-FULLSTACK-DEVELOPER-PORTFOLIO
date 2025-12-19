import React, { useEffect, useRef, useState } from 'react';

type Direction = 'bottom' | 'left' | 'right';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'bottom'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      {
        threshold: 0.05, // Trigger earlier when only 5% is visible
        rootMargin: "0px 0px -20px 0px" // Reduced margin for earlier trigger
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getHiddenClass = () => {
    switch (direction) {
      case 'left': return 'reveal-hidden-left';
      case 'right': return 'reveal-hidden-right';
      default: return 'reveal-hidden-bottom';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${className} reveal-hidden ${getHiddenClass()} ${isVisible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;