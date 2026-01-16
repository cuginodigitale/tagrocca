
import React, { useEffect, useState, useMemo } from 'react';
import { Home, Sparkles, Loader2, Share2, Instagram, Facebook, Star, ExternalLink } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
  capturedImage: string;
}

const COLORS = ['#FFD700', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
const PIECE_COUNT = 80;

export const RewardView: React.FC<RewardViewProps> = ({ onReset, capturedImage }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // URL e Tag ufficiali
  const companyUrl = "https://www.roccafunfactory.com"; // URL pubblico necessario per il link sharing
  const balloonDogImageUrl = "https://images.unsplash.com/photo-1590074259301-443315758071?q=80&w=800&auto=format&fit=crop"; 
  const tags = "@roccafunfactory #roccafunfactory #Spielwarenmesse2026 #GoldenBalloonDog";
  const shareQuote = `Ho appena vinto un Golden Balloon Dog allo stand di Rocca Fun Factory! Partecipa anche tu alla challenge! ${tags}`;

  const confettiPieces = useMemo(() => {
    return Array.from({ length: PIECE_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 3}s`,
      size: `${6 + Math.random() * 10}px`,
      swayDuration: `${2 + Math.random() * 2}s`
    }));
  }, []);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const handleNativeShare = async () => {
    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], 'my-golden-challenge.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory',
          text: `Guarda la mia foto alla fiera! Incolla qui i tag: ${tags}`,
        });
      } else {
        alert("La condivisione file non è supportata su questo browser. Usa il pulsante Facebook sotto o salva la foto!");
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  const handleFacebookLinkShare = () => {
    // Metodo Link sharing stile Amazon/Facebook Dialog
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(companyUrl)}&quote=${encodeURIComponent(shareQuote)}&hashtag=${encodeURIComponent('#GoldenBalloonDog')}`;
    window.open(fbShareUrl, '_blank', 'width=600,height=400');
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
        <div className="mb-4 space-y-2">
            <h1 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                Il tuo premio <br/>ti aspetta!
            </h1>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
               <Sparkles className="w-4 h-4" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em]">Rocca Fun Factory Reward</p>
               <Sparkles className="w-4 h-4" />
            </div>
        </div>

        {/* Visualizzazione Foto Premio */}
        <div className="mb-6 relative group">
          <div className="w-52 h-52 bg-white rounded-[3.5rem] flex items-center justify-center relative shadow-[0_25px_50px_rgba(0,0,0,0.1)] border-8 border-gray-50 overflow-hidden">
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
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2.5 rounded-2xl shadow-xl transform rotate-12">
             <Star className="w-5 h-5 fill-white" />
          </div>
        </div>

        {/* Istruzioni Finali Stand */}
        <div className="bg-gray-50 border-2 border-gray-100 p-5 rounded-[1.5rem] w-full mb-6 relative overflow-hidden">
          <p className="font-bold text-[13px] leading-relaxed text-gray-700 italic">
            "Condividi la tua foto e mostra il post al nostro team per ricevere il tuo Golden Balloon Dog!"
          </p>
        </div>

        {/* Bottoni di azione */}
        <div className="w-full space-y-3">
          {/* Pulsante Nativo per Menu Sistema (Ottimo per Instagram/Foto) */}
          <button 
            onClick={handleNativeShare}
            className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            <Share2 className="w-5 h-5" />
            <span>Condividi la Foto</span>
          </button>

          {/* Pulsante Facebook Direct Link (Stile Amazon) */}
          <button 
            onClick={handleFacebookLinkShare}
            className="w-full bg-[#1877F2] text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            <Facebook className="w-5 h-5" />
            <span>Posta su Facebook</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </button>
          
          <button 
            onClick={onReset}
            className="w-full text-gray-400 font-black py-2 uppercase text-[9px] tracking-[0.3em] flex items-center justify-center space-x-2"
          >
            <Home className="w-3 h-3" />
            <span>Torna alla Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
