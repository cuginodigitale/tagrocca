
import React, { useState } from 'react';
import { Share2, RotateCcw, Copy, Instagram } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface PreviewViewProps {
  image: string;
  onShareComplete: () => void;
  onRetake: () => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ image, onShareComplete, onRetake }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const companyTag = "@LaTuaAzienda";

  const handleCopyTag = () => {
    navigator.clipboard.writeText(companyTag);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    // Convert base64 to blob for sharing if supported
    const blob = await (await fetch(image)).blob();
    const file = new File([blob], 'my-cool-photo.jpg', { type: 'image/jpeg' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: 'Guarda la mia foto!',
          text: `Sono allo stand di ${companyTag}! #BalloonDogChallenge`,
          files: [file]
        });
        // We assume sharing was attempted and move forward
        onShareComplete();
      } catch (err) {
        console.error("Share failed", err);
      } finally {
        setIsSharing(false);
      }
    } else {
      // Fallback for desktop or non-supported browsers
      alert("La condivisione diretta non è supportata dal tuo browser. Salva l'immagine e caricala manualmente con il tag " + companyTag);
      // Still allow them to win if they say they shared manually
      setIsSharing(false);
    }
  };

  // Fun helper: Simulating a check or just manual button for win
  const handleManualConfirmation = () => {
    onShareComplete();
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-fadeIn">
      <div className="mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] relative">
        <img src={image} alt="Captured" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-white text-[10px] uppercase font-bold tracking-tighter">
          #BalloonDogChallenge
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-600 font-bold uppercase mb-1">Passaggio Obbligatorio</p>
            <p className="text-sm font-semibold text-gray-800">Tagga <span className="text-blue-600">{companyTag}</span></p>
          </div>
          <button 
            onClick={handleCopyTag}
            className="flex items-center space-x-1 bg-white border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-100 transition-colors"
          >
            {copyStatus ? <span className="text-green-600">Copiato!</span> : <><Copy className="w-3.5 h-3.5" /> <span>Copia</span></>}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onRetake}
            className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold active:scale-95 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Rifalla</span>
          </button>
          
          <button 
            disabled={isSharing}
            onClick={handleShare}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all disabled:opacity-50"
          >
            <Share2 className="w-5 h-5" />
            <span>Condividi</span>
          </button>
        </div>

        <div className="pt-4 text-center">
          <button 
            onClick={handleManualConfirmation}
            className="text-gray-400 text-xs font-medium underline underline-offset-4 decoration-gray-200"
          >
            Ho già condiviso? Clicca qui per il premio
          </button>
        </div>
      </div>
    </div>
  );
};
