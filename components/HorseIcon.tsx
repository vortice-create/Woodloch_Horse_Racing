import React from 'react';
import { HorseDef } from '../constants';

interface HorseIconProps {
  horse: HorseDef;
  className?: string;
}

export const HorseIcon: React.FC<HorseIconProps> = ({ horse, className = "w-12 h-12" }) => {
  const isLightColor = horse.id === 1; // White horse needs dark details
  const detailColor = isLightColor ? '#2E4A3D' : 'white';

  return (
    <div className={`relative flex-shrink-0 ${className} select-none group`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1"
      >
        {/* Main Horse Head Silhouette */}
        <path 
          d="M28,98 C25,60 35,25 48,12 L54,5 L60,15 C70,18 78,30 85,52 L88,62 C90,68 88,76 78,76 C72,76 65,70 62,65 C62,75 56,98 56,98 L28,98 Z"
          fill={horse.color}
          stroke={horse.borderColor}
          strokeWidth="1.5"
        />
        
        {/* Bridle - Cheek Strap (Diagonal) */}
        <line 
          x1="38" y1="32" 
          x2="64" y2="62" 
          stroke={detailColor} 
          strokeWidth="3" 
          strokeLinecap="round"
        />

        {/* Bridle - Noseband (Horizontal-ish) */}
        <line 
          x1="64" y1="62" 
          x2="85" y2="58" 
          stroke={detailColor} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        
        {/* Bridle Joint - Cheek */}
        <circle 
          cx="38" cy="32" 
          r="3" 
          fill="none" 
          stroke={detailColor} 
          strokeWidth="2" 
        />

        {/* Bridle Joint - Mouth/Nose */}
        <circle 
          cx="64" cy="62" 
          r="3" 
          fill="none" 
          stroke={detailColor} 
          strokeWidth="2" 
        />
        
        {/* Bridle Joint - Snout */}
        <circle 
          cx="85" cy="58" 
          r="3" 
          fill="none" 
          stroke={detailColor} 
          strokeWidth="2" 
        />

        {/* Eye */}
        <circle cx="66" cy="30" r="3.5" fill={isLightColor ? '#2E4A3D' : 'white'} />
        <circle cx="66" cy="30" r="1.5" fill={horse.borderColor} />
      </svg>
      
      {/* Number Badge - Positioned on the horse neck/shoulder */}
      <div 
        className="absolute top-[65%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[28%] h-[28%] flex items-center justify-center rounded-full border shadow-sm font-bold font-sans z-10 bg-white"
        style={{ 
          borderColor: horse.borderColor,
          color: horse.borderColor,
          fontSize: 'clamp(8px, 25cqw, 16px)' // Fluid font size relative to container
        }}
      >
        {horse.id}
      </div>
    </div>
  );
};