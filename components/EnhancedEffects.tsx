import React, { useEffect } from 'react';
import ParticleBackground from './ParticleBackground';
import ScrollProgress from './ScrollProgress';

const EnhancedEffects: React.FC = () => {
  useEffect(() => {
    // Add stagger animation to elements as they come into view
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-stagger');
          
          const children = entry.target.querySelectorAll(':scope > *');
          children.forEach((child, index) => {
            (child as HTMLElement).style.animationDelay = `${index * 0.05}s`;
          });
        }
      });
    }, observerOptions);

    const staggerElements = document.querySelectorAll('.stagger-on-scroll');
    staggerElements.forEach((el) => observer.observe(el));

    // Optimized event handlers with better throttling
    const handleRippleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target?.classList?.contains('ripple-button')) return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const mouseEvent = e as MouseEvent;
      const x = mouseEvent.clientX - rect.left - size / 2;
      const y = mouseEvent.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(16, 185, 129, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.4s ease-out;
        pointer-events: none;
      `;

      target.appendChild(ripple);
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 400);
    };

    // Throttled magnetic effect with reduced calculations
    let magneticTicking = false;
    const handleMagneticMove = (e: Event) => {
      if (!magneticTicking) {
        requestAnimationFrame(() => {
          const mouseEvent = e as MouseEvent;
          const magneticElements = document.querySelectorAll('.magnetic');
          
          magneticElements.forEach((element) => {
            const htmlElement = element as HTMLElement;
            const rect = htmlElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
              Math.pow(mouseEvent.clientX - centerX, 2) + 
              Math.pow(mouseEvent.clientY - centerY, 2)
            );
            
            if (distance < 80) { // Reduced range
              const deltaX = (mouseEvent.clientX - centerX) * 0.1; // Reduced intensity
              const deltaY = (mouseEvent.clientY - centerY) * 0.1;
              htmlElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.01)`;
            } else {
              htmlElement.style.transform = 'translate(0px, 0px) scale(1)';
            }
          });
          
          magneticTicking = false;
        });
        magneticTicking = true;
      }
    };

    const handleMagneticLeave = () => {
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach((element) => {
        (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
      });
    };

    // Optimized parallax with better throttling
    let parallaxTicking = false;
    const handleParallax = () => {
      if (!parallaxTicking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxElements = document.querySelectorAll('.parallax');
          
          // Only update if scroll distance is significant
          if (Math.abs(scrolled - (window as any).lastScrollY || 0) > 5) {
            parallaxElements.forEach((element) => {
              const htmlElement = element as HTMLElement;
              const speed = parseFloat(htmlElement.dataset.speed || '0.3'); // Reduced default speed
              const yPos = -(scrolled * speed);
              htmlElement.style.transform = `translateY(${yPos}px)`;
            });
            (window as any).lastScrollY = scrolled;
          }
          
          parallaxTicking = false;
        });
        parallaxTicking = true;
      }
    };

    // Add event listeners with passive option for better performance
    document.addEventListener('click', handleRippleClick);
    document.addEventListener('mousemove', handleMagneticMove, { passive: true });
    document.addEventListener('mouseleave', handleMagneticLeave);
    window.addEventListener('scroll', handleParallax, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleRippleClick);
      document.removeEventListener('mousemove', handleMagneticMove);
      document.removeEventListener('mouseleave', handleMagneticLeave);
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <>
      <ParticleBackground />
      <ScrollProgress />
      
      {/* Floating Decorative Elements - Reduced for performance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-400/8 to-cyan-400/8 rounded-full blur-2xl animate-parallax-float will-change-transform" />
        <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-gradient-to-r from-blue-400/6 to-purple-400/6 rounded-full blur-2xl animate-parallax-float will-change-transform" style={{ animationDelay: '2s' }} />
        
        <div className="absolute top-20 right-20 w-3 h-3 bg-emerald-400/20 rotate-45 animate-breathe will-change-transform" />
        <div className="absolute bottom-40 left-20 w-4 h-4 border border-cyan-400/20 rotate-12 animate-tilt will-change-transform" />
      </div>
    </>
  );
};

export default EnhancedEffects;