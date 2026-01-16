
import React, { useEffect, useState, useMemo } from 'react';
import { Home, Sparkles, Trophy, Award, Star, Loader2 } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
}

const COLORS = ['#FFD700', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
const PIECE_COUNT = 100;

export const RewardView: React.FC<RewardViewProps> = ({ onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // URL Assoluto stabile per il premio
  const balloonDogImageUrl = "https://images.unsplash.com/photo-1590074259301-443315758071?q=80&w=800&auto=format&fit=crop"; 

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
      {/* Decorazioni di sfondo */}
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
        {/* Intestazione Successo */}
        <div className="mb-6 space-y-2">
            <div className="flex justify-center space-x-1 mb-2">
                {[1,2,3].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />)}
            </div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                Ottimo Lavoro!
            </h1>
            <p className="text-xl font-bold text-blue-600">Ecco il tuo premio</p>
        </div>

        {/* Visualizzazione Foto Premio */}
        <div className="mb-10 relative">
          <div className="w-60 h-60 bg-white rounded-[4rem] flex items-center justify-center relative shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-8 border-white group overflow-hidden">
            
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            )}
            
            <img 
              src={balloonDogImageUrl} 
              alt="Premio Balloon Dog" 
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-contain p-4 transform group-hover:scale-110 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={(e) => {
                setImageLoaded(true);
              }}
            />
            
            <Sparkles className="absolute -top-4 -right-2 w-10 h-10 text-yellow-400 animate-pulse" />
          </div>
          
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        </div>

        {/* Blocco Istruzioni Stand */}
        <div className="bg-gray-50 border-2 border-gray-100 p-8 rounded-[2.5rem] w-full mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <Trophy className="w-12 h-12 text-blue-600/5" />
          </div>
          
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Ritira allo stand</span>
          </h3>
          
          <div className="space-y-4">
              <p className="text-gray-700 font-bold text-lg leading-tight">
                Mostra la condivisione al nostro team per ricevere il gadget fisico!
              </p>
              <div className="h-px bg-gray-200 w-12 mx-auto"></div>
              <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">
                Rocca Fun Factory Stand
              </p>
          </div>
        </div>

        {/* Bottone di chiusura */}
        <div className="w-full">
          <button 
            onClick={onReset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            <Home className="w-5 h-5" />
            <span>Nuova Foto</span>
          </button>
        </div>
      </div>
    </div>
  );
};
