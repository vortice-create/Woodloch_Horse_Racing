import React from 'react';
import { motion } from 'framer-motion';

interface DiceProps {
  value: number;
  isRolling: boolean;
  className?: string;
}

export const Dice: React.FC<DiceProps> = ({ value, isRolling, className = "w-16 h-16" }) => {
  // Dot configurations for 1-6
  const dots = {
    1: [<div key="1" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />],
    2: [
      <div key="1" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 left-2" />,
      <div key="2" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 right-2" />
    ],
    3: [
      <div key="1" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 left-2" />,
      <div key="2" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />,
      <div key="3" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 right-2" />
    ],
    4: [
      <div key="1" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 left-2" />,
      <div key="2" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 right-2" />,
      <div key="3" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 left-2" />,
      <div key="4" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 right-2" />
    ],
    5: [
      <div key="1" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 left-2" />,
      <div key="2" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 right-2" />,
      <div key="3" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />,
      <div key="4" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 left-2" />,
      <div key="5" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 right-2" />
    ],
    6: [
      <div key="1" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 left-2" />,
      <div key="2" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-2 right-2" />,
      <div key="3" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-1/2 left-2 transform -translate-y-1/2" />,
      <div key="4" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute top-1/2 right-2 transform -translate-y-1/2" />,
      <div key="5" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 left-2" />,
      <div key="6" className="w-2.5 h-2.5 bg-woodloch-green rounded-full absolute bottom-2 right-2" />
    ],
  };

  return (
    <motion.div
      className={`${className} bg-woodloch-cream border-2 border-woodloch-gold rounded-xl shadow-sm relative flex-shrink-0`}
      animate={isRolling ? {
        rotate: [0, 15, -15, 10, -10, 0],
        x: [0, 5, -5, 3, -3, 0],
        scale: [1, 1.05, 1]
      } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Inner Dice Face */}
      <div className="w-full h-full relative">
        {dots[value as keyof typeof dots] || dots[1]}
      </div>
    </motion.div>
  );
};
