
import React, { useEffect, useState, useMemo } from 'react';
import { Home, Sparkles, Loader2, Share2, Instagram, Facebook, Star } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
  capturedImage: string;
}

const COLORS = ['#FFD700', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
const PIECE_COUNT = 80;

export const RewardView: React.FC<RewardViewProps> = ({ onReset, capturedImage }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Immagine assoluta del balloon dog dorato
  const balloonDogImageUrl = "https://images.unsplash.com/photo-1590074259301-443315758071?q=80&w=800&auto=format&fit=crop"; 
  const tags = "@roccafunfactory #roccafunfactory #Spielwarenmesse2026 #GoldenBalloonDog";

  const confettiPieces = useMemo(() => {
    return Array.from({ length: PIECE_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 3}s`,
      // Fix: Corrected syntax error in template literal (removed px from inside the expression)
      size: `${6 + Math.random() * 10}px`,
      swayDuration: `${2 + Math.random() * 2}s`
    }));
  }, []);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const handleShare = async () => {
    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], 'my-golden-challenge.jpg', { type: 'image/jpeg' });

      // Utilizziamo la Web Share API (stile Amazon su mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory',
          // Fix: Ensure template literal is properly closed
          text: `Guarda la mia foto alla fiera! Incolla qui i tag: ${tags}`,
        });
      } else {
        // Fallback stile link Amazon per browser desktop
        // Fix: Ensure template literal is properly closed
        const shareText = encodeURIComponent(`Guarda la mia foto! ${tags}`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=https://roccafunfactory.com&quote=${shareText}`, '_blank');
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-white">
      {/* Confetti */}
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
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
      )}

      <div className="z-10 animate-bounceIn w-full flex flex-col items-center max-w-sm">
        <div className="mb-6 space-y-2">
            <h1 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                Il tuo premio <br/>ti aspetta!
            </h1>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
               <Sparkles className="w-4 h-4" />
               <p className="text-xs font-black uppercase tracking-[0.2em]">Golden Balloon Dog</p>
               <Sparkles className="w-4 h-4" />
            </div>
        </div>

        {/* Visualizzazione Foto Premio */}
        <div className="mb-8 relative group">
          <div className="w-60 h-60 bg-white rounded-[3.5rem] flex items-center justify-center relative shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-8 border-gray-50 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            )}
            <img 
              src={balloonDogImageUrl} 
              alt="Golden Balloon Dog" 
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-contain p-6 transition-all duration-700 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            />
          </div>
          <div className="absolute -bottom-4 -right-2 bg-yellow-400 text-white p-3 rounded-2xl shadow-xl transform rotate-12">
             {/* Fix: Added Star icon from lucide-react */}
             <Star className="w-6 h-6 fill-white" />
          </div>
        </div>

        {/* Istruzioni Finali Stand */}
        <div className="bg-gray-900 text-white p-6 rounded-[2rem] w-full mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Share2 className="w-12 h-12" />
          </div>
          <p className="font-bold text-sm leading-relaxed mb-4 text-gray-200">
            "Condividi la tua foto ora e mostra il post al nostro team allo stand per ricevere il premio!"
          </p>
          <div className="flex items-center justify-center space-x-4 opacity-50">
             <Instagram className="w-4 h-4" />
             <Facebook className="w-4 h-4" />
          </div>
        </div>

        {/* Bottoni di azione ridimensionati */}
        <div className="w-full space-y-4">
          <button 
            onClick={handleShare}
            className="w-full bg-blue-600 text-white font-black py-5 rounded-[1.5rem] shadow-[0_15px_30px_rgba(37,99,235,0.3)] flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest text-base"
          >
            <Share2 className="w-5 h-5" />
            <span>Condividi e Ritira</span>
          </button>
          
          <button 
            onClick={onReset}
            className="w-full text-gray-400 font-black py-2 uppercase text-[10px] tracking-[0.3em] flex items-center justify-center space-x-2"
          >
            <span>Torna alla Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
