import React, { useState, useEffect, useCallback } from 'react';
import { Dice } from './components/Dice';
import { Track } from './components/Track';
import { WinnerModal } from './components/WinnerModal';
import { HeaderLogo } from './components/HeaderLogo';
import { GameState, Winner } from './types';
import { TRACK_LENGTH, HORSES } from './constants';
import { Play, RotateCcw, Dices, Trophy } from 'lucide-react';

const App: React.FC = () => {
  // Indices 0-5 correspond to Horses 1-6
  const [positions, setPositions] = useState<number[]>(new Array(6).fill(0));
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [winner, setWinner] = useState<Winner | null>(null);

  // Sound effect (simulated logic for future enhancement)
  const playClickSound = () => {
    // Placeholder for Audio API interaction
  };

  const handleReset = () => {
    setPositions(new Array(6).fill(0));
    setGameState('idle');
    setWinner(null);
    setDice([1, 1]);
  };

  const checkWinner = useCallback((newPositions: number[]) => {
    // Find any horse that has reached or exceeded the track length
    // Using -1 because track length includes start index 0
    const winningIndex = newPositions.findIndex(pos => pos >= TRACK_LENGTH - 1);
    
    if (winningIndex !== -1) {
      const winningHorse = HORSES[winningIndex];
      setWinner({ horseId: winningHorse.id, name: winningHorse.name });
      setGameState('finished');
      return true;
    }
    return false;
  }, []);

  const rollDice = useCallback(() => {
    if (isRolling || gameState === 'finished') return;

    playClickSound();
    setIsRolling(true);
    setGameState('racing');

    // Animate dice roll for 600ms before determining result
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      
      setDice([d1, d2]);
      
      setPositions(prev => {
        const newPositions = [...prev];
        
        // Game Logic
        if (d1 === d2) {
          // Doubles: Move corresponding horse 2 steps
          // Dice 1 maps to Horse 1 (index 0), so subtract 1
          const horseIndex = d1 - 1;
          newPositions[horseIndex] = Math.min(newPositions[horseIndex] + 2, TRACK_LENGTH);
        } else {
          // Different: Move both horses 1 step
          const h1Index = d1 - 1;
          const h2Index = d2 - 1;
          newPositions[h1Index] = Math.min(newPositions[h1Index] + 1, TRACK_LENGTH);
          newPositions[h2Index] = Math.min(newPositions[h2Index] + 1, TRACK_LENGTH);
        }

        return newPositions;
      });

      setIsRolling(false);
    }, 800);
  }, [isRolling, gameState]);

  // Effect to check for winner after positions update
  useEffect(() => {
    if (gameState === 'racing') {
      checkWinner(positions);
    }
  }, [positions, gameState, checkWinner]);

  // Helper for status text
  const getStatusText = () => {
    if (gameState === 'idle') return "Welcome to the Races! Roll the dice to begin.";
    if (gameState === 'finished') return "Race Finished! Reset to start again.";
    if (isRolling) return "Rolling the dice...";
    if (dice[0] === dice[1]) return `Doubles! Horse #${dice[0]} moves 2 steps!`;
    return `Horses #${dice[0]} and #${dice[1]} move 1 step.`;
  };

  return (
    <div className="min-h-screen bg-woodloch-cream text-woodloch-green font-sans selection:bg-woodloch-gold/30">
      {/* Header with Logo - Increased height for overlap */}
      <header className="w-full bg-[#354a3e] pt-8 pb-20 px-4 border-b-0 relative z-0 flex flex-col items-center">
        <div className="max-w-5xl mx-auto text-center w-full">
          <HeaderLogo />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 relative z-10 -mt-12 flex flex-col gap-8 pb-12">
        
        {/* Floating Control Card */}
        <section className="bg-white p-3 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 min-h-[90px]">
            
            {/* Left: Last Roll / Dice */}
            <div className="flex items-center gap-4 pl-2 md:pl-4 w-full md:w-auto justify-center md:justify-start">
                {gameState === 'idle' ? (
                     <div className="flex gap-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg shadow-inner border border-gray-200"></div>
                        <div className="w-14 h-14 bg-gray-100 rounded-lg shadow-inner border border-gray-200"></div>
                     </div>
                ) : (
                    <div className="flex gap-3">
                        <Dice value={dice[0]} isRolling={isRolling} className="w-14 h-14" />
                        <Dice value={dice[1]} isRolling={isRolling} className="w-14 h-14" />
                    </div>
                )}
                
                <div className="flex flex-col justify-center text-left ml-2">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">Last Roll</span>
                    <span className="font-serif text-2xl font-bold text-woodloch-green leading-none">
                        {gameState === 'idle' ? 'Waiting...' : `${dice[0]} and ${dice[1]}`}
                    </span>
                </div>
            </div>

            {/* Middle: Status Text */}
            <div className="flex-1 text-center px-4 md:border-l md:border-r border-gray-100 hidden md:flex items-center justify-center">
                <p className="font-serif text-2xl font-bold text-woodloch-green leading-tight whitespace-nowrap">
                   {getStatusText()}
                </p>
            </div>
             {/* Mobile status text shown only on small screens */}
             <div className="md:hidden text-center w-full">
                <p className="font-serif text-lg font-bold text-woodloch-green">
                   {getStatusText()}
                </p>
            </div>

            {/* Right: Action Button */}
            <div className="pr-2 md:pr-4 w-full md:w-auto flex justify-center items-center gap-2">
               
               {/* Restart Button (Visible during race) */}
               {gameState === 'racing' && !isRolling && (
                 <button
                    onClick={handleReset}
                    className="text-woodloch-green/60 hover:text-woodloch-rust hover:bg-red-50 font-sans font-semibold text-sm px-3 py-3 rounded-lg transition-colors flex items-center gap-1"
                    title="Restart Race"
                 >
                   <RotateCcw className="w-4 h-4" />
                   <span className="hidden lg:inline">Restart</span>
                 </button>
               )}

               {gameState === 'finished' ? (
                  <button 
                    onClick={handleReset} 
                    className="bg-[#354a3e] hover:bg-[#283a30] text-white font-serif font-bold text-lg px-8 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all active:scale-95 min-w-[160px] justify-center"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset Race
                  </button>
               ) : (
                  <button 
                    onClick={rollDice}
                    disabled={isRolling}
                    className={`
                      bg-[#354a3e] text-white font-serif font-bold text-xl px-8 py-3 rounded-lg shadow-md flex items-center gap-3 transition-all min-w-[160px] justify-center
                      ${isRolling ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#283a30] hover:shadow-lg active:scale-95'}
                    `}
                  >
                    {isRolling ? 'Rolling...' : 'Roll Dice'}
                    {!isRolling && <Dices className="w-5 h-5 opacity-80" />}
                  </button>
               )}
            </div>

        </section>

        {/* The Track */}
        <section className="w-full mt-4">
          <Track positions={positions} />
        </section>

        {/* Instructions / Footer */}
        <footer className="max-w-5xl mx-auto mt-8 mb-8 px-4 border-t border-woodloch-green/10 pt-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Column 1 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 text-woodloch-gold">
                <Dices className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-woodloch-green uppercase tracking-wider mb-2 text-sm">How to Move</h3>
              <p className="text-woodloch-green/80 text-sm leading-relaxed px-4">
                Roll two dice. If numbers are different, both horses move 1 step.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 text-woodloch-gold">
                <Play className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-woodloch-green uppercase tracking-wider mb-2 text-sm">The "Doubles" Rule</h3>
              <p className="text-woodloch-green/80 text-sm leading-relaxed px-4">
                If you roll doubles (e.g., 6 and 6), that horse moves 2 steps forward!
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 text-woodloch-gold">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-woodloch-green uppercase tracking-wider mb-2 text-sm">Winning</h3>
              <p className="text-woodloch-green/80 text-sm leading-relaxed px-4">
                The first horse to complete 12 steps wins the race.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12 opacity-60">
             <p className="font-serif italic text-lg">"A Woodloch Tradition"</p>
          </div>
        </footer>
      </main>

      <WinnerModal winner={winner} onReset={handleReset} />
    </div>
  );
};

export default App;