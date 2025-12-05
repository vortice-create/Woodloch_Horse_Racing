import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Winner } from '../types';
import { HORSES } from '../constants';
import { Trophy, RefreshCw } from 'lucide-react';
import { HorseIcon } from './HorseIcon';

interface WinnerModalProps {
  winner: Winner | null;
  onReset: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onReset }) => {
  if (!winner) return null;

  const winnerHorse = HORSES.find(h => h.id === winner.horseId);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-woodloch-cream border-4 border-woodloch-green p-8 rounded-xl shadow-2xl max-w-md w-full text-center relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-woodloch-gold rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-woodloch-gold rounded-br-xl" />

          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-woodloch-gold/20 p-4 rounded-full border-2 border-woodloch-gold">
              <Trophy className="w-12 h-12 text-woodloch-green" />
            </div>
          </motion.div>

          <h2 className="font-serif text-4xl font-bold text-woodloch-green mb-2">Winner!</h2>
          <p className="font-sans text-woodloch-green/80 mb-8">
            Horse <span className="font-bold text-lg">#{winner.horseId}</span> crossed the finish line first!
          </p>

          {winnerHorse && (
            <div className="mx-auto mb-8 flex justify-center">
               <HorseIcon horse={winnerHorse} className="w-32 h-32" />
            </div>
          )}

          <button
            onClick={onReset}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-serif font-bold text-white transition-all duration-200 bg-woodloch-green font-lg rounded hover:bg-woodloch-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-woodloch-green"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Reset Race
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};