import React from 'react';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 select-none">
      {/* Main Title */}
      <h1 className="text-white font-serif text-6xl md:text-8xl font-bold tracking-wide leading-none drop-shadow-md text-center">
        WOODLOCH
      </h1>

      {/* Subtitle with Lines */}
      <div className="flex items-center gap-4 mt-1 w-full justify-center opacity-90">
        <div className="h-[2px] bg-[#bfa264] w-12 md:w-24 rounded-full"></div>
        <span className="text-[#bfa264] font-serif font-bold tracking-[0.15em] uppercase text-lg md:text-xl whitespace-nowrap">
          Horse Racing
        </span>
        <div className="h-[2px] bg-[#bfa264] w-12 md:w-24 rounded-full"></div>
      </div>
    </div>
  );
};