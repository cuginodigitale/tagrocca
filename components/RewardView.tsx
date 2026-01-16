
import React, { useEffect, useState, useMemo } from 'react';
import { Home, Sparkles, Trophy, Award, Star, Loader2, Share2 } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
  capturedImage: string; // Aggiunta la prop per la foto scattata dall'utente
}

const COLORS = ['#FFD700', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
const PIECE_COUNT = 100;

export const RewardView: React.FC<RewardViewProps> = ({ onReset, capturedImage }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // URL Assoluto stabile per il premio
  const balloonDogImageUrl = "https://roccafunfactory.com/wp-content/uploads/2026/01/balloon-dog.jpg"; 
  const tags = "@roccafunfactory #roccafunfactory #Spielwarenmesse2026 #GoldenBalloonDog";

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

  const handleNativeShare = async () => {
    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], 'rocca-fun-factory.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory Challenge',
          text: `Ecco la mia foto! Incolla i tag: ${tags}`,
        });
      } else {
        alert("Condivisione non supportata su questo browser. Salva la foto e postala manualmente!");
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-white">
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
        <div className="mb-4 space-y-1">
            <h1 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                Il tuo premio ti aspetta!
            </h1>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">Ritira il tuo Balloon Dog</p>
        </div>

        {/* Visualizzazione Foto Premio */}
        <div className="mb-6 relative">
          <div className="w-52 h-52 bg-white rounded-[3rem] flex items-center justify-center relative shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white group overflow-hidden">
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
            />
            <Sparkles className="absolute -top-4 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        </div>

        {/* Blocco Istruzioni Stand */}
        <div className="bg-gray-50 border-2 border-gray-100 p-6 rounded-[2rem] w-full mb-6 shadow-sm relative overflow-hidden">
          <p className="text-gray-800 font-bold text-sm leading-relaxed mb-4 italic">
            "Condividi la tua foto e mostra il post al nostro team per ricevere il regalo esclusivo!"
          </p>
          <div className="h-px bg-gray-200 w-12 mx-auto mb-3"></div>
          <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">
            Rocca Fun Factory Stand
          </p>
        </div>

        {/* Bottoni di azione */}
        <div className="w-full space-y-3">
          <button 
            onClick={handleNativeShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            <Share2 className="w-5 h-5" />
            <span>Condividi Ora</span>
          </button>
          
          <button 
            onClick={onReset}
            className="w-full text-gray-400 font-black py-2 uppercase text-[10px] tracking-widest flex items-center justify-center space-x-2"
          >
            <Home className="w-3 h-3" />
            <span>Torna alla Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
