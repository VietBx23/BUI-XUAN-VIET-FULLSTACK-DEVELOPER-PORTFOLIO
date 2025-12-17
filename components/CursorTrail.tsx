import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  id: number;
}

const CursorTrail: React.FC = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const idRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      // Calculate velocity
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      // Only add trail points when moving fast enough
      if (velocity > 3) {
        const newPoint: TrailPoint = {
          x,
          y,
          timestamp: Date.now(),
          id: idRef.current++
        };
        
        setTrail(prev => [...prev, newPoint].slice(-15)); // Keep last 15 points
      }
      
      lastPos.current = { x, y };
    };

    // Clean up old trail points
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrail(prev => prev.filter(point => now - point.timestamp < 500));
    }, 50);

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0, 1 - age / 500);
        const scale = 0.3 + (opacity * 0.7);
        
        return (
          <div
            key={point.id}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${10 * opacity}px rgba(16, 185, 129, ${opacity * 0.8})`,
              transition: 'opacity 0.1s ease-out'
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;