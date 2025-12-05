import React from 'react';
import { motion } from 'framer-motion';
import { HORSES, TRACK_LENGTH } from '../constants';
import { HorseIcon } from './HorseIcon';

interface TrackProps {
  positions: number[];
}

export const Track: React.FC<TrackProps> = ({ positions }) => {
  const steps = Array.from({ length: TRACK_LENGTH }, (_, i) => i);

  return (
    <div className="w-full overflow-x-auto track-scroll pb-4">
      <div className="min-w-[800px] flex flex-col border-4 border-woodloch-green rounded-lg bg-white shadow-2xl relative">
        {/* Start Line Label */}
        <div className="absolute top-0 bottom-0 left-[7%] w-0.5 bg-red-800/30 z-0 border-l border-dashed border-red-800" />
        
        {/* Finish Line Label - Checkered Flag Pattern */}
        <div className="absolute top-0 bottom-0 right-[2%] w-6 z-0 bg-white border-x-2 border-black" 
             style={{ 
                 backgroundImage: `repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), 
                                   repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`,
                 backgroundSize: '10px 10px', 
                 backgroundPosition: '0 0, 5px 5px' 
             }} 
        />

        {/* Header Row for Step Numbers */}
        <div className="flex h-8 border-b border-woodloch-green/20 bg-woodloch-cream/50">
            <div className="w-12 flex-shrink-0 border-r border-woodloch-green/20"></div>
            <div className="flex-1 flex px-2 relative z-10">
                {steps.map((step) => (
                    <div key={step} className={`flex-1 flex items-center justify-center text-[10px] text-woodloch-green/60 font-bold border-r border-woodloch-green/10 last:border-r-0 ${step % 2 !== 0 ? 'bg-woodloch-green/5' : ''}`}>
                        {step > 0 ? step : 'Start'}
                    </div>
                ))}
            </div>
        </div>

        {HORSES.map((horse, horseIndex) => (
          <div 
            key={horse.id} 
            className="flex items-center border-b last:border-b-0 border-woodloch-green/20 h-16 relative hover:bg-woodloch-gold/5 transition-colors"
          >
            {/* Lane Number / Gate - Number removed as requested */}
            <div className="w-12 flex-shrink-0 flex items-center justify-center border-r-2 border-woodloch-green/50 bg-woodloch-cream h-full z-10 shadow-sm">
              {/* Empty gate box */}
            </div>

            {/* Lane Steps */}
            <div className="flex-1 flex relative px-2 h-full z-10">
              {steps.map((step) => (
                <div 
                  key={step} 
                  className={`flex-1 border-r border-woodloch-green/30 last:border-r-0 h-full flex items-center justify-center relative ${step % 2 !== 0 ? 'bg-woodloch-green/5' : ''}`}
                >
                  {/* Small subtle dot in center of step for grid feel */}
                  {step > 0 && <div className="w-1 h-1 rounded-full bg-woodloch-green/10" />}
                </div>
              ))}

              {/* The Horse */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-20"
                // Calculate left position based on percentage of track length
                initial={false}
                animate={{ 
                  left: `${(positions[horseIndex] / (TRACK_LENGTH - 1)) * 94}%` 
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                style={{ marginLeft: '1.5%' }} // Offset slightly from start
              >
                <HorseIcon horse={horse} />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Track Labels Footer */}
      <div className="min-w-[800px] flex justify-between px-14 mt-1 text-xs font-serif uppercase tracking-widest text-woodloch-green/60">
        <span>Starting Gate</span>
        <span>Finish Line</span>
      </div>
    </div>
  );
};