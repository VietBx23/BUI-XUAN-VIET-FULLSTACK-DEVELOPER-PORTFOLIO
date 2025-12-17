import React, { useEffect } from 'react';
import ParticleBackground from './ParticleBackground';
import ScrollProgress from './ScrollProgress';

const EnhancedEffects: React.FC = () => {
  useEffect(() => {
    // Add stagger animation to elements as they come into view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-stagger');
          
          // Add stagger delay to children
          const children = entry.target.querySelectorAll(':scope > *');
          children.forEach((child, index) => {
            (child as HTMLElement).style.animationDelay = `${index * 0.1}s`;
          });
        }
      });
    }, observerOptions);

    // Observe elements with stagger class
    const staggerElements = document.querySelectorAll('.stagger-on-scroll');
    staggerElements.forEach((el) => observer.observe(el));

    // Add ripple effect to buttons
    const addRippleEffect = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      if (!button.classList.contains('ripple-button')) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

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

      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    // Add magnetic effect to elements
    const addMagneticEffect = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      if (!element.classList.contains('magnetic')) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
    };

    const removeMagneticEffect = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      if (!element.classList.contains('magnetic')) return;
      
      element.style.transform = 'translate(0px, 0px) scale(1)';
    };

    // Add event listeners
    document.addEventListener('click', addRippleEffect);
    document.addEventListener('mousemove', addMagneticEffect);
    document.addEventListener('mouseleave', removeMagneticEffect);

    // Parallax effect for floating elements
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('click', addRippleEffect);
      document.removeEventListener('mousemove', addMagneticEffect);
      document.removeEventListener('mouseleave', removeMagneticEffect);
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <>
      <ParticleBackground />
      <ScrollProgress />
      
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-parallax-float" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-emerald-400/5 rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '4s' }} />
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-emerald-400/30 rotate-45 animate-breathe" />
        <div className="absolute bottom-40 left-20 w-6 h-6 border-2 border-cyan-400/30 rotate-12 animate-tilt" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-float" />
      </div>
    </>
  );
};

export default EnhancedEffects;