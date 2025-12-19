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

    // Improved event handlers with proper null checks
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
        background: rgba(16, 185, 129, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      target.appendChild(ripple);
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 600);
    };

    const handleMagneticMove = (e: Event) => {
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
        
        if (distance < 100) {
          const deltaX = (mouseEvent.clientX - centerX) * 0.15;
          const deltaY = (mouseEvent.clientY - centerY) * 0.15;
          htmlElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        } else {
          htmlElement.style.transform = 'translate(0px, 0px) scale(1)';
        }
      });
    };

    const handleMagneticLeave = () => {
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach((element) => {
        (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
      });
    };

    // Optimized parallax with throttling
    let parallaxTicking = false;
    const handleParallax = () => {
      if (!parallaxTicking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxElements = document.querySelectorAll('.parallax');
          
          parallaxElements.forEach((element) => {
            const htmlElement = element as HTMLElement;
            const speed = parseFloat(htmlElement.dataset.speed || '0.5');
            const yPos = -(scrolled * speed);
            htmlElement.style.transform = `translateY(${yPos}px)`;
          });
          
          parallaxTicking = false;
        });
        parallaxTicking = true;
      }
    };

    // Add event listeners
    document.addEventListener('click', handleRippleClick);
    document.addEventListener('mousemove', handleMagneticMove);
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
      
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-parallax-float" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-emerald-400/5 rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '4s' }} />
        
        <div className="absolute top-20 right-20 w-4 h-4 bg-emerald-400/30 rotate-45 animate-breathe" />
        <div className="absolute bottom-40 left-20 w-6 h-6 border-2 border-cyan-400/30 rotate-12 animate-tilt" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-float" />
      </div>
    </>
  );
};

export default EnhancedEffects;