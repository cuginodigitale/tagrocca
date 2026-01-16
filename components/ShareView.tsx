
import React, { useState } from 'react';
import { Copy, Facebook, Instagram, Linkedin, ChevronLeft, Check, Download } from 'lucide-react';

interface ShareViewProps {
  image: string;
  onComplete: () => void;
  onBack: () => void;
}

export const ShareView: React.FC<ShareViewProps> = ({ image, onComplete, onBack }) => {
  const [copyStatus, setCopyStatus] = useState(false);
  const companyTag = "@roccafunfactory";
  const hashtags = "#roccafunfactory #Spielwarenmesse2026";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`${companyTag} ${hashtags}`);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleSocialShare = async (platform: 'fb' | 'ig' | 'li') => {
    // Web Share API è il modo migliore per condividere file immagine su mobile
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], 'rocca-fun-factory.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory',
          text: `Guarda la mia foto allo stand di ${companyTag}! ${hashtags}`,
        });
      } else {
        // Fallback per desktop o browser limitati
        const link = document.createElement('a');
        link.href = image;
        link.download = 'rocca-fun-photo.jpg';
        link.click();
        alert("Immagine salvata! Caricala manualmente su " + platform.toUpperCase() + " taggando " + companyTag);
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-black text-sm uppercase tracking-widest text-gray-900 mr-6">
          Condividi e Vinci
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8">
        {/* Step 1: Copia Tag */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">1</div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Copia il Tag</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-800">{companyTag} <span className="text-gray-400 text-xs">{hashtags}</span></p>
            <button 
              onClick={handleCopy}
              className={`p-3 rounded-2xl transition-all ${copyStatus ? 'bg-green-500 text-white' : 'bg-white text-blue-600 border border-blue-50'}`}
            >
              {copyStatus ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Step 2: Scegli Social */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">2</div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Scegli dove pubblicare</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => handleSocialShare('ig')}
              className="flex items-center p-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white shadow-lg active:scale-95 transition-all"
            >
              <Instagram className="w-6 h-6 mr-4" />
              <span className="font-black uppercase text-xs tracking-[0.2em]">Instagram</span>
            </button>
            
            <button 
              onClick={() => handleSocialShare('fb')}
              className="flex items-center p-5 bg-[#1877F2] rounded-3xl text-white shadow-lg active:scale-95 transition-all"
            >
              <Facebook className="w-6 h-6 mr-4" />
              <span className="font-black uppercase text-xs tracking-[0.2em]">Facebook</span>
            </button>
            
            <button 
              onClick={() => handleSocialShare('li')}
              className="flex items-center p-5 bg-[#0077B5] rounded-3xl text-white shadow-lg active:scale-95 transition-all"
            >
              <Linkedin className="w-6 h-6 mr-4" />
              <span className="font-black uppercase text-xs tracking-[0.2em]">LinkedIn</span>
            </button>
          </div>
        </div>

        {/* Info Extra */}
        <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
           <p className="text-[11px] font-bold text-yellow-800 leading-relaxed text-center">
             Ricordati di rendere il post pubblico o di mostrarlo al nostro staff per ricevere il Golden Balloon Dog!
           </p>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-8 pb-10 bg-white border-t border-gray-50 shrink-0">
        <button 
          onClick={onComplete}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-blue-200 transition-all active:scale-95 text-xl flex items-center justify-center space-x-4 uppercase tracking-widest"
        >
          <span>Fatto! Ho Condiviso</span>
        </button>
      </div>
    </div>
  );
};
