
import React from 'react';
import { Instagram, Facebook, Share2, ChevronLeft, Info, Sparkles } from 'lucide-react';

interface SocialShareViewProps {
  image: string;
  onComplete: () => void;
  onBack: () => void;
}

export const SocialShareView: React.FC<SocialShareViewProps> = ({ image, onComplete, onBack }) => {
  const handleShare = async (platform: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], 'rocca-fun-factory.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory Challenge',
          text: `Incolla qui i tag che hai appena copiato!`,
        });
      } else {
        alert(`Per condividere su ${platform}:\n1. Salva la foto\n2. Apri ${platform}\n3. Crea un post e INCOLLA i tag ufficiali.`);
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn p-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="bg-pink-50 p-6 rounded-[2.5rem] relative">
          <Share2 className="w-12 h-12 text-pink-500" />
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Step 3</div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">Condividi e Incolla</h2>
          <p className="text-sm font-bold text-gray-400 leading-relaxed max-w-[240px] mx-auto">
            Scegli il tuo social preferito, carica la foto e <span className="text-blue-600">incolla i tag</span> nella descrizione.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 gap-4">
          <button 
            onClick={() => handleShare('Instagram')}
            className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2rem] text-white shadow-xl shadow-pink-100 active:scale-95 transition-all"
          >
            <div className="flex items-center space-x-4">
              <Instagram className="w-7 h-7" />
              <span className="font-black uppercase text-xs tracking-[0.2em]">Instagram</span>
            </div>
            <Sparkles className="w-5 h-5 opacity-50" />
          </button>
          
          <button 
            onClick={() => handleShare('Facebook')}
            className="w-full flex items-center justify-between p-6 bg-[#1877F2] rounded-[2rem] text-white shadow-xl shadow-blue-100 active:scale-95 transition-all"
          >
            <div className="flex items-center space-x-4">
              <Facebook className="w-7 h-7" />
              <span className="font-black uppercase text-xs tracking-[0.2em]">Facebook</span>
            </div>
            <Sparkles className="w-5 h-5 opacity-50" />
          </button>
        </div>

        <div className="bg-blue-50 p-5 rounded-[1.5rem] border border-blue-100 flex items-start space-x-4">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase tracking-tight">
            Ricorda di incollare i tag che hai copiato nello step precedente per rendere valida la partecipazione!
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <button 
          onClick={onComplete}
          className="w-full bg-gray-900 text-white font-black py-6 rounded-[2rem] shadow-2xl transition-all active:scale-95 text-lg flex items-center justify-center space-x-4 uppercase tracking-[0.2em]"
        >
          <span>Fatto! Ho Postato</span>
        </button>
        <button 
          onClick={onBack}
          className="w-full text-gray-300 font-black py-2 uppercase text-[10px] tracking-widest flex items-center justify-center space-x-2"
        >
          <ChevronLeft className="w-3 h-3" />
          <span>Torna ai tag</span>
        </button>
      </div>
    </div>
  );
};
