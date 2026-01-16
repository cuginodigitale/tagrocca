
import React, { useState } from 'react';
import { Copy, Facebook, Instagram, Linkedin, ChevronLeft, Check, Share2, Download } from 'lucide-react';

interface ShareViewProps {
  image: string;
  onComplete: () => void;
  onBack: () => void;
}

export const ShareView: React.FC<ShareViewProps> = ({ image, onComplete, onBack }) => {
  const [copyStatus, setCopyStatus] = useState(false);
  const companyTag = "@roccafunfactory";
  const hashtags = "#roccafunfactory #Spielwarenmesse2026";
  const fullMessage = `Guarda la mia foto allo stand di ${companyTag}! ${hashtags}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`${companyTag} ${hashtags}`);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], 'rocca-fun-factory.jpg', { type: 'image/jpeg' });

      // La Web Share API permette di condividere FILE e TESTO (tag) insieme
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory',
          text: fullMessage,
        });
      } else {
        // Fallback: Download immagine + Copia tag
        handleDownload();
        handleCopy();
        alert("Condivisione automatica non supportata. L'immagine è stata salvata e i tag copiati negli appunti. Caricala ora sul tuo social preferito!");
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'rocca-fun-photo.jpg';
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn overflow-hidden h-full">
      {/* Header compatto */}
      <div className="px-6 pt-6 pb-2 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-black text-sm uppercase tracking-widest text-gray-900 mr-6">
          Condividi il tuo Post
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
        {/* Box Tag - Sempre utile come riferimento */}
        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Tag negli appunti:</p>
            <p className="text-xs font-bold text-gray-800 truncate">{companyTag} {hashtags}</p>
          </div>
          <button 
            onClick={handleCopy}
            className={`shrink-0 ml-4 p-2.5 rounded-xl transition-all ${copyStatus ? 'bg-green-500 text-white' : 'bg-white text-blue-600 border border-blue-100'}`}
          >
            {copyStatus ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Pulsante Principale di Condivisione (Simultanea) */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] text-center">Invia foto e tag insieme</p>
          <button 
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 rounded-3xl font-black uppercase text-sm tracking-[0.2em] shadow-xl shadow-blue-100 flex items-center justify-center space-x-3 active:scale-95 transition-all"
          >
            <Share2 className="w-6 h-6" />
            <span>Condividi Ora</span>
          </button>
        </div>

        {/* Pulsanti Rapidi Social (Fallback/Alternative) */}
        <div className="grid grid-cols-3 gap-3">
          <button onClick={handleShare} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 active:scale-90 transition-all">
            <Instagram className="w-6 h-6 text-pink-500 mb-2" />
            <span className="text-[8px] font-black uppercase text-gray-400">Insta</span>
          </button>
          <button onClick={handleShare} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 active:scale-90 transition-all">
            <Facebook className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-[8px] font-black uppercase text-gray-400">FB</span>
          </button>
          <button onClick={handleShare} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 active:scale-90 transition-all">
            <Linkedin className="w-6 h-6 text-blue-700 mb-2" />
            <span className="text-[8px] font-black uppercase text-gray-400">LinkedIn</span>
          </button>
        </div>

        {/* Opzione Download */}
        <button 
          onClick={handleDownload}
          className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center space-x-2 text-gray-400 hover:text-blue-500 hover:border-blue-100 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Salva nel rullino</span>
        </button>

        {/* Info Box */}
        <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
          <p className="text-[10px] font-bold text-yellow-800 leading-relaxed text-center italic">
            "Assicurati di includere il tag @roccafunfactory per permetterci di convalidare la tua vincita!"
          </p>
        </div>
      </div>

      {/* Footer Button - Step Finale */}
      <div className="p-8 bg-white border-t border-gray-50 shrink-0">
        <button 
          onClick={onComplete}
          className="w-full bg-gray-900 text-white font-black py-5 rounded-[2rem] shadow-xl active:scale-95 transition-all text-xs flex items-center justify-center space-x-4 uppercase tracking-[0.2em]"
        >
          <span>Fatto! Ho Condiviso</span>
        </button>
      </div>
    </div>
  );
};
