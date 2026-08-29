import React from 'react';

interface HuremasoWaveBgProps {
  className?: string;
}

export const HuremasoWaveBg: React.FC<HuremasoWaveBgProps> = ({ className = '' }) => {
  return (
    <svg 
      className={`absolute inset-0 h-full w-full pointer-events-none select-none ${className}`}
      viewBox="0 0 500 400" 
      preserveAspectRatio="none"
    >
      <defs>
        {/* Background gradient from top-left white to soft ice green */}
        <linearGradient id="hmBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f2f9f9" />
          <stop offset="100%" stopColor="#e6f3f3" />
        </linearGradient>

        {/* Main upper fluid wave gradient */}
        <linearGradient id="hmWaveGrad1" x1="20%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#80cbd0" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#339999" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#006666" stopOpacity="0.9" />
        </linearGradient>

        {/* Soft middle wave layer gradient */}
        <linearGradient id="hmWaveGrad2" x1="0%" y1="50%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6f4f4" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#b3e5e5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4db3b3" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Base background */}
      <rect width="500" height="400" fill="url(#hmBgGrad)" />

      {/* Right sweeping organic wave curve matching attached background image */}
      <path 
        d="M 230,0 C 290,40 340,90 320,170 C 295,270 380,330 500,320 L 500,0 Z" 
        fill="url(#hmWaveGrad1)" 
      />

      {/* Top right subtle accent layer */}
      <path 
        d="M 270,0 C 330,20 420,30 500,120 L 500,0 Z" 
        fill="#4db3b3" 
        opacity="0.5" 
      />

      {/* Bottom sweeping soft wave */}
      <path 
        d="M 0,260 C 120,240 260,250 340,310 C 390,345 440,380 500,400 L 0,400 Z" 
        fill="url(#hmWaveGrad2)" 
      />
    </svg>
  );
};

export default HuremasoWaveBg;
