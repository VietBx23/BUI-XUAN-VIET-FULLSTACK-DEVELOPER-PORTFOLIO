import React, { useRef, useEffect } from 'react';

interface FocusPreserverProps {
  children: React.ReactNode;
  preserveFocus?: boolean;
}

const FocusPreserver: React.FC<FocusPreserverProps> = ({ 
  children, 
  preserveFocus = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!preserveFocus) return;

    const container = containerRef.current;
    if (!container) return;

    const handleFocusIn = (e: FocusEvent) => {
      if (e.target instanceof HTMLElement) {
        lastFocusedElement.current = e.target;
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      // Small delay to check if focus moved outside the container
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement && !container.contains(activeElement)) {
          // Focus moved outside, try to restore it
          if (lastFocusedElement.current && container.contains(lastFocusedElement.current)) {
            lastFocusedElement.current.focus();
          }
        }
      }, 10);
    };

    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [preserveFocus]);

  return (
    <div ref={containerRef} className="focus-preserver">
      {children}
    </div>
  );
};

export default FocusPreserver;