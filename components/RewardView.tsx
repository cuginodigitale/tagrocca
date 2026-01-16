
import React, { useEffect, useState, useMemo } from 'react';
import { Home, Sparkles, Loader2, Share2, Facebook, Star, Info, ExternalLink } from 'lucide-react';

interface RewardViewProps {
  onReset: () => void;
  capturedImage: string;
}

const COLORS = ['#FFD700', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
const PIECE_COUNT = 80;

export const RewardView: React.FC<RewardViewProps> = ({ onReset, capturedImage }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // URL Ufficiale del Balloon Dog e del sito
  const balloonDogImageUrl = "https://roccafunfactory.com/wp-content/uploads/2026/01/balloon-dog.jpg"; 
  const companyUrl = "https://roccafunfactory.com";
  const tags = "@roccafunfactory #roccafunfactory #Spielwarenmesse2026 #GoldenBalloonDog";
  const shareQuote = `Guarda cosa ho vinto allo stand di Rocca Fun Factory! Un Golden Balloon Dog! 🎈🐶 Partecipa anche tu! ${tags}`;

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

  const handleFacebookShare = () => {
    // Metodo Link per bypassare il menu di sistema nativo (stile Amazon)
    // Usiamo sharer.php che accetta URL e Quote (testo precompilato)
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(companyUrl)}&quote=${encodeURIComponent(shareQuote)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], 'rocca-challenge.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory Challenge',
          text: `Ho vinto il Golden Balloon Dog! 🎈🐶 Incolla i tag: ${tags}`,
        });
      } else {
        const link = document.createElement('a');
        link.href = capturedImage;
        link.download = 'rocca-fun-factory-photo.jpg';
        link.click();
        alert("Condivisione non supportata. Abbiamo scaricato la foto: caricala sui social e incolla i tag per ricevere il premio!");
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-white h-full">
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
                Complimenti! <br/>Ecco il tuo premio
            </h1>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
               <Sparkles className="w-4 h-4" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em]">Golden Balloon Dog</p>
               <Sparkles className="w-4 h-4" />
            </div>
        </div>

        {/* Visualizzazione Foto Premio Ufficiale */}
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
              className={`w-full h-full object-contain p-4 transition-all duration-700 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2.5 rounded-2xl shadow-xl transform rotate-12">
             <Star className="w-5 h-5 fill-white" />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-100 p-5 rounded-[1.5rem] w-full mb-6 flex items-start space-x-3 text-left">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="font-bold text-[11px] leading-relaxed text-blue-900 uppercase tracking-tight">
            Condividi ora per ricevere il Golden Balloon Dog fisico allo stand!
          </p>
        </div>

        <div className="w-full space-y-3">
          {/* Pulsante Facebook con link diretto che bypassa il menu di sistema */}
          <button 
            onClick={handleFacebookShare}
            className="w-full bg-[#1877F2] text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center space-x-3 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            <Facebook className="w-5 h-5" />
            <span>Posta su Facebook</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </button>

          {/* Pulsante Nativo per la FOTO reale (utile se vogliono postare l'immagine scattata) */}
          <button 
            onClick={handleNativeShare}
            className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-4 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            <Share2 className="w-5 h-5" />
            <span>Invia Foto</span>
          </button>

          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] pt-2">
            Mostra il post allo stand per il ritiro
          </p>
          
          <button 
            onClick={onReset}
            className="w-full text-gray-400 font-black py-3 uppercase text-[10px] tracking-[0.3em] flex items-center justify-center space-x-2"
          >
            <Home className="w-3 h-3" />
            <span>Torna alla Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
