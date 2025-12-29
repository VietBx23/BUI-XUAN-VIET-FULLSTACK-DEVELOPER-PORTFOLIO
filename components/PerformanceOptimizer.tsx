import React, { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Optimize CSS animations based on device performance
    const optimizeForDevice = () => {
      const isLowEndDevice = () => {
        // Check for low-end device indicators
        const memory = (navigator as any).deviceMemory;
        const cores = navigator.hardwareConcurrency;
        const connection = (navigator as any).connection;
        
        return (
          memory && memory < 4 ||
          cores && cores < 4 ||
          connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
        );
      };

      if (isLowEndDevice()) {
        // Disable heavy animations on low-end devices
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.classList.add('reduced-motion');
        
        // Reduce particle count
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.style.display = 'none';
        }
      }
    };

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Trigger any necessary recalculations
        window.dispatchEvent(new Event('optimizedResize'));
      }, 250);
    };

    // Monitor frame rate and adjust accordingly
    let frameCount = 0;
    let lastTime = performance.now();
    
    const monitorPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          // Reduce animations if FPS is too low
          document.documentElement.classList.add('low-performance');
        } else if (fps > 50) {
          // Re-enable animations if performance improves
          document.documentElement.classList.remove('low-performance');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(monitorPerformance);
    };

    optimizeForDevice();
    window.addEventListener('resize', handleResize);
    requestAnimationFrame(monitorPerformance);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;