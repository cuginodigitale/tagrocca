
import React, { useState } from 'react';
// Fix: Import RefreshCcw which was used but not imported
import { Share2, RotateCcw, Copy, RefreshCcw } from 'lucide-react';

interface PreviewViewProps {
  image: string;
  onShareComplete: () => void;
  onRetake: () => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ image, onShareComplete, onRetake }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  
  const companyTag = "@roccafunfactory";
  const hashtags = "#roccafunfactory #Spielwarenmesse #Spielwarenmesse2026";
  const shareText = `Mi sto divertendo allo stand di ${companyTag}! Passa a trovarci a #Spielwarenmesse per ricevere il tuo gadget! ${hashtags}`;

  const handleCopyTag = () => {
    navigator.clipboard.writeText(`${companyTag} ${hashtags}`);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], 'rocca-fun-factory-2026.jpg', { type: 'image/jpeg' });

      // Verifichiamo se il browser supporta Web Share API per i file
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Rocca Fun Factory @ Spielwarenmesse 2026',
          text: shareText,
          files: [file]
        });
        onShareComplete();
      } else {
        // Fallback: download della foto e alert istruzioni
        const link = document.createElement('a');
        link.href = image;
        link.download = 'rocca-fun-photo.jpg';
        link.click();
        alert(`Impossibile condividere automaticamente. Abbiamo salvato la foto sul tuo dispositivo!\n\nCaricala ora sui social taggando ${companyTag} e usando gli hashtag:\n#roccafunfactory #Spielwarenmesse2026`);
        onShareComplete();
      }
    } catch (err) {
      console.error("Share failed", err);
      // Se l'utente annulla la condivisione, non procediamo alla vittoria a meno che non confermi manualmente
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-fadeIn bg-gray-50/50">
      <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white aspect-[9/16] max-h-[60vh] relative mx-auto w-full">
        <img src={image} alt="Captured" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[8px] font-black tracking-widest uppercase border border-white/20">
          Ready to Share
        </div>
        <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white text-[8px] font-black tracking-widest uppercase border border-white/10">
          Spielwarenmesse 2026
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-[10px] text-blue-600 font-black uppercase mb-1 tracking-wider">Social Copy</p>
              <p className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-relaxed">
                {companyTag} {hashtags}
              </p>
            </div>
            <button 
              onClick={handleCopyTag}
              className="flex items-center space-x-1 bg-blue-50 border border-blue-100 px-3 py-2.5 rounded-2xl text-[10px] font-black text-blue-600 hover:bg-blue-100 transition-all shadow-sm uppercase tracking-tighter active:scale-95"
            >
              {copyStatus ? <span className="text-green-600 font-bold">Copiato!</span> : <><Copy className="w-3.5 h-3.5" /> <span>Copia Tag</span></>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onRetake}
            className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-sm"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Rifalla</span>
          </button>
          
          <button 
            disabled={isSharing}
            onClick={handleShare}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSharing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
            <span>Condividi</span>
          </button>
        </div>

        <div className="pt-2 text-center">
          <button 
            onClick={onShareComplete}
            className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-8 decoration-gray-200 hover:text-blue-600 transition-colors"
          >
            Ho già condiviso? Clicca qui
          </button>
        </div>
      </div>
    </div>
  );
};
