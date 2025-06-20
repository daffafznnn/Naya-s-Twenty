
'use client';
import { useEffect, useState } from 'react';
import HeartIcon from './HeartIcon';

const LoveBeadsBackground = () => {
  const [beads, setBeads] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const numBeads = 15; 
    const newBeads = Array.from({ length: numBeads }).map((_, i) => {
      const size = Math.random() * 15 + 10; 
      const animationDuration = Math.random() * 15 + 10; 
      const animationDelay = Math.random() * 7;
      return {
        id: i,
        style: {
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `float ${animationDuration}s ${animationDelay}s infinite ease-in-out`,
          opacity: Math.random() * 0.35 + 0.15, 
        } as React.CSSProperties,
      };
    });
    setBeads(newBeads);
  }, []);

  if (beads.length === 0) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
      {beads.map(bead => (
        <HeartIcon key={bead.id} className="text-primary" style={bead.style} />
      ))}
    </div>
  );
};

export default LoveBeadsBackground;
