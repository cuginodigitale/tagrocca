
import React, { useEffect, useState, useMemo } from 'react';
import { PartyPopper, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
}

const COLORS = ['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
const PIECE_COUNT = 60;

export const RewardView: React.FC<RewardViewProps> = ({ onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);

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
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
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
        {/* Gadget Image Placeholder */}
        <div className="mb-6 relative">
          <div className="w-44 h-44 bg-gradient-to-br from-blue-50 to-pink-50 rounded-3xl flex items-center justify-center relative shadow-inner border border-white">
            <div className="flex flex-col items-center animate-pulse">
               <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                 <Sparkles className="w-10 h-10 text-yellow-500" />
               </div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Foto Balloon Dog</span>
            </div>
            {/* Badge */}
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-lg shadow-lg rotate-12 uppercase">
              Vinto!
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
            Complimenti! 🎉
          </h2>
          <p className="text-lg text-blue-600 font-bold">
            Il tuo Balloon Dog è pronto!
          </p>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Mostra questo coupon allo stand <strong>Rocca Fun Factory</strong> per ritirare il gadget.
          </p>
        </div>

        <div className="w-full bg-white p-6 rounded-[2rem] border-4 border-blue-600 mb-8 relative shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600 rotate-45 translate-x-8 -translate-y-8"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="text-left">
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-1">Coupon ID</p>
              <p className="text-2xl font-mono font-black text-gray-900">ROCCA-FUN-24</p>
            </div>
            <div className="bg-blue-600 p-2 rounded-2xl shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <button 
            className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest"
            onClick={() => window.print()}
          >
            <span>Ritira allo Stand</span>
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <button 
            onClick={onReset}
            className="w-full text-gray-400 font-bold py-2 text-xs uppercase tracking-widest hover:text-gray-600 transition-colors"
          >
            Nuova Foto
          </button>
        </div>
      </div>
    </div>
  );
};
