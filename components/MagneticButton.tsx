import React, { useRef, useState, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  intensity = 0.3,
  onClick,
  href 
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${isHovered ? 1.03 : 1})`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    
    setIsHovered(false);
    requestAnimationFrame(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)';
      }
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = () => {
    if (onClick) onClick();
    if (href) window.open(href, '_blank');
  };

  return (
    <div
      ref={buttonRef}
      className={`cursor-pointer transition-all duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ 
        transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)', // Faster response
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;