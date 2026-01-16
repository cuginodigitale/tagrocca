
import React, { useState } from 'react';
import { Share2, RotateCcw, Copy } from 'lucide-react';

interface PreviewViewProps {
  image: string;
  onShareComplete: () => void;
  onRetake: () => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ image, onShareComplete, onRetake }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const companyTag = "@roccafunfactory";
  const shareText = `Mi sto divertendo allo stand di ${companyTag}! Passa a trovarci per ricevere il tuo gadget! #RoccaFunFactory #BalloonDog #Fiera`;

  const handleCopyTag = () => {
    navigator.clipboard.writeText(companyTag);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      const blob = await (await fetch(image)).blob();
      const file = new File([blob], 'rocca-fun-photo.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Rocca Fun Factory Challenge',
          text: shareText,
          files: [file]
        });
        onShareComplete();
      } else {
        alert(`Copia il tag ${companyTag}, salva la foto e caricala sui tuoi social preferiti!`);
      }
    } catch (err) {
      console.error("Share failed", err);
    } finally {
      setIsSharing(false);
    }
  };

  const handleManualConfirmation = () => {
    onShareComplete();
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-fadeIn">
      <div className="mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] relative">
        <img src={image} alt="Captured" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] uppercase font-black tracking-widest">
          ROCCA FUN FACTORY
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-[10px] text-blue-600 font-bold uppercase mb-0.5 tracking-wider">Tag Obbligatorio</p>
            <p className="text-sm font-bold text-gray-800">{companyTag}</p>
          </div>
          <button 
            onClick={handleCopyTag}
            className="flex items-center space-x-1 bg-white border border-blue-200 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-100 transition-colors shadow-sm"
          >
            {copyStatus ? <span className="text-green-600">Copiato!</span> : <><Copy className="w-3.5 h-3.5" /> <span>Copia Tag</span></>}
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

        <div className="pt-2 text-center">
          <button 
            onClick={handleManualConfirmation}
            className="text-gray-400 text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 decoration-gray-200"
          >
            Ho già condiviso? Clicca qui
          </button>
        </div>
      </div>
    </div>
  );
};
