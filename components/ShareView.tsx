
import React, { useState } from 'react';
import { Copy, Facebook, Instagram, Linkedin, ChevronLeft, Check, Share2, Info } from 'lucide-react';

interface ShareViewProps {
  image: string;
  tags: string;
  onComplete: () => void;
  onBack: () => void;
}

export const ShareView: React.FC<ShareViewProps> = ({ image, tags, onComplete, onBack }) => {
  const [copyStatus, setCopyStatus] = useState(false);
  const fullTagString = tags;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(fullTagString);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleSocialShare = async (platform: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], 'rocca-fun-factory.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory Challenge',
          text: `Incolla qui i tag dello stand!`,
        });
      } else {
        alert(`Per condividere su ${platform}:\n1. Salva la foto\n2. Apri ${platform}\n3. Incolla i tag: ${fullTagString}`);
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn overflow-hidden h-full">
      <div className="px-6 pt-6 pb-2 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-black text-xs uppercase tracking-[0.2em] text-gray-900 mr-6">
          Condivisione Premio
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 flex flex-col">
        <div className="text-center space-y-2 shrink-0">
          <h3 className="text-xl font-black text-gray-900 leading-tight">
            Usa i <span className="text-blue-600">tag ufficiali</span> <br/>dallo stand!
          </h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Ecco i parametri attivati dal QR:
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">1</span>
            <p className="text-sm font-black text-gray-800 uppercase tracking-tight">Copia i tag personalizzati</p>
          </div>
          
          <div className="relative group">
            <div className="bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] p-5 pr-16">
              <p className="text-sm font-bold text-gray-700 leading-relaxed italic truncate">
                {fullTagString}
              </p>
            </div>
            <button 
              onClick={handleCopy}
              className={`absolute right-2 top-2 bottom-2 px-4 rounded-2xl flex items-center justify-center transition-all ${copyStatus ? 'bg-green-500 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'}`}
            >
              {copyStatus ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">2</span>
            <p className="text-sm font-black text-gray-800 uppercase tracking-tight">Posta sul tuo Social</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => handleSocialShare('Instagram')} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white active:scale-95 transition-all">
              <Instagram className="w-6 h-6 mr-3" />
              <span className="font-black uppercase text-[10px] tracking-widest">Instagram</span>
              <Share2 className="w-4 h-4 opacity-50 ml-auto" />
            </button>
            <button onClick={() => handleSocialShare('Facebook')} className="flex items-center justify-between p-4 bg-[#1877F2] rounded-2xl text-white active:scale-95 transition-all">
              <Facebook className="w-6 h-6 mr-3" />
              <span className="font-black uppercase text-[10px] tracking-widest">Facebook</span>
              <Share2 className="w-4 h-4 opacity-50 ml-auto" />
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
          <p className="text-[10px] font-bold text-yellow-800 leading-snug text-center italic">
            "Mostra il post allo staff Rocca Fun Factory per ritirare il Golden Balloon Dog!"
          </p>
        </div>
      </div>

      <div className="p-8 pb-10 bg-white border-t border-gray-50 shrink-0">
        <button 
          onClick={onComplete}
          className="w-full bg-blue-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-blue-100 transition-all active:scale-95 text-lg flex items-center justify-center space-x-4 uppercase tracking-[0.2em]"
        >
          <span>Conferma Condivisione</span>
        </button>
      </div>
    </div>
  );
};
