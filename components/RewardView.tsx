
import React, { useEffect, useState, useMemo } from 'react';
import { CheckCircle2, Home, Sparkles, Trophy, Award, Star } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
}

const COLORS = ['#FFD700', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
const PIECE_COUNT = 100;

export const RewardView: React.FC<RewardViewProps> = ({ onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiPieces = useMemo(() => {
    return Array.from({ length: PIECE_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: `${Math.random() * 3}s`,
      duration: `${4 + Math.random() * 4}s`,
      size: `${6 + Math.random() * 12}px`,
      swayDuration: `${2 + Math.random() * 3}s`
    }));
  }, []);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full blur-[100px]"></div>
      </div>

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

      <div className="z-10 animate-bounceIn w-full flex flex-col items-center max-w-sm">
        {/* Success Header */}
        <div className="mb-6 space-y-2">
            <div className="flex justify-center space-x-1 mb-2">
                {[1,2,3].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                Complimenti!
            </h1>
            <p className="text-xl font-bold text-blue-600">Ecco il tuo Balloon Dog</p>
        </div>

        {/* Prize Image Visual - Representation of the Gold Balloon Dog */}
        <div className="mb-10 relative">
          <div className="w-64 h-64 bg-gradient-to-br from-yellow-300 via-yellow-100 to-yellow-500 rounded-[4rem] flex items-center justify-center relative shadow-[0_30px_60px_rgba(234,179,8,0.4)] border-8 border-white group">
            
            {/* Centered stylized Balloon Dog */}
            <div className="relative transform group-hover:scale-110 transition-transform duration-500">
               {/* This SVG mimics the shape of the balloon dog from the provided image */}
               <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-2xl">
                 <defs>
                   <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" style={{stopColor: '#f9e498'}} />
                     <stop offset="50%" style={{stopColor: '#d4af37'}} />
                     <stop offset="100%" style={{stopColor: '#b8860b'}} />
                   </linearGradient>
                   <filter id="glow">
                     <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                   </filter>
                 </defs>
                 {/* Body Parts */}
                 <ellipse cx="50" cy="55" rx="15" ry="10" fill="url(#gold)" /> {/* Body */}
                 <ellipse cx="30" cy="40" rx="12" ry="10" fill="url(#gold)" transform="rotate(-30 30 40)" /> {/* Head */}
                 <circle cx="20" cy="42" r="3" fill="url(#gold)" /> {/* Nose */}
                 <ellipse cx="38" cy="30" rx="6" ry="12" fill="url(#gold)" transform="rotate(10 38 30)" /> {/* Ear 1 */}
                 <ellipse cx="32" cy="28" rx="6" ry="12" fill="url(#gold)" transform="rotate(-10 32 28)" /> {/* Ear 2 */}
                 <ellipse cx="45" cy="72" rx="5" ry="12" fill="url(#gold)" /> {/* Front Leg 1 */}
                 <ellipse cx="55" cy="72" rx="5" ry="12" fill="url(#gold)" /> {/* Front Leg 2 */}
                 <ellipse cx="70" cy="65" rx="5" ry="12" fill="url(#gold)" transform="rotate(20 70 65)" /> {/* Back Leg 1 */}
                 <ellipse cx="78" cy="62" rx="5" ry="12" fill="url(#gold)" transform="rotate(30 78 62)" /> {/* Back Leg 2 */}
                 <ellipse cx="85" cy="45" rx="8" ry="4" fill="url(#gold)" transform="rotate(-45 85 45)" /> {/* Tail */}
               </svg>
              
              <Sparkles className="absolute -top-6 -right-2 w-10 h-10 text-white animate-pulse" />
              <div className="absolute -bottom-2 -left-4 bg-gray-900 text-white text-[9px] font-black px-4 py-2 rounded-xl shadow-2xl rotate-[-5deg] uppercase tracking-widest border border-white/20">
                Gold Edition
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/30 rounded-full blur-3xl"></div>
        </div>

        {/* Instructions Block */}
        <div className="bg-gray-50 border-2 border-gray-100 p-8 rounded-[3rem] w-full mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <Trophy className="w-12 h-12 text-yellow-500/10" />
          </div>
          
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center justify-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Ritira allo stand</span>
          </h3>
          
          <div className="space-y-4">
              <p className="text-gray-700 font-bold text-lg leading-tight">
                Mostra la condivisione social al nostro team per ricevere il tuo premio fisico!
              </p>
              <div className="h-px bg-gray-200 w-12 mx-auto"></div>
              <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">
                Siamo allo stand Rocca Fun Factory <br/>
                Spielwarenmesse 2026
              </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <button 
            onClick={onReset}
            className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-2xl flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            <Home className="w-5 h-5" />
            <span>Fatto</span>
          </button>
          
          <p className="text-blue-600 text-[9px] font-black uppercase tracking-[0.4em] opacity-50">
            Grazie per aver partecipato!
          </p>
        </div>
      </div>
    </div>
  );
};
