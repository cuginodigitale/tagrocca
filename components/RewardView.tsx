
import React, { useEffect, useState, useMemo } from 'react';
import { PartyPopper, CheckCircle2, ChevronRight } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
}

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: string;
  duration: string;
  size: string;
  swayDuration: string;
}

const COLORS = ['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
const PIECE_COUNT = 60;

export const RewardView: React.FC<RewardViewProps> = ({ onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Generate stable confetti pieces properties
  const confettiPieces = useMemo(() => {
    return Array.from({ length: PIECE_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: `${5 + Math.random() * 10}px`,
      swayDuration: `${2 + Math.random() * 2}s`
    }));
  }, []);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      // Keep them looping or remove them? Let's let them finish their animation
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Confetti Layer */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {confettiPieces.map((p) => (
            <div
              key={p.id}
              className="confetti"
              style={{
                left: p.left,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                animation: `confetti-fall ${p.duration} linear ${p.delay} infinite, confetti-sway ${p.swayDuration} ease-in-out ${p.delay} infinite`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px'
              }}
            />
          ))}
        </div>
      )}

      <div className="z-10 animate-bounceIn w-full flex flex-col items-center">
        <div className="mb-10 relative">
          <div className="w-40 h-40 bg-pink-100 rounded-full flex items-center justify-center relative">
            <PartyPopper className="w-20 h-20 text-pink-600 animate-pulse" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-pink-500 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
        </div>

        <div className="space-y-3 mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Hai Vinto! 🎉
          </h2>
          <p className="text-xl text-pink-600 font-bold">
            Il tuo Balloon Dog ti aspetta.
          </p>
          <p className="text-gray-500 max-w-xs mx-auto">
            Mostra questa schermata allo staff per ricevere il tuo gadget esclusivo.
          </p>
        </div>

        <div className="w-full bg-gray-50/80 backdrop-blur-sm p-6 rounded-[2rem] border-2 border-dashed border-gray-200 mb-10 relative shadow-sm">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
            Codice Premio
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-2xl font-mono font-black text-gray-900 tracking-tighter">BALLOON-2024</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Valido solo oggi</p>
            </div>
            <div className="bg-green-500 p-2 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <button 
            className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 active:scale-95 transition-all"
            onClick={() => window.print()}
          >
            <span>Richiedilo</span>
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <button 
            onClick={onReset}
            className="w-full text-gray-400 font-bold py-2 text-sm hover:text-gray-600 transition-colors"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    </div>
  );
};
