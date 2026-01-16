
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

      // Navigator.share è il modo migliore per aprire direttamente il selettore di app native (incluso Instagram/FB)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Rocca Fun Factory Challenge',
          text: `Incolla qui i tag ufficiali!`,
        });
      } else {
        // Fallback per desktop o browser limitati
        if (platform === 'Instagram') {
          window.open('instagram://camera', '_blank');
          setTimeout(() => window.open('https://www.instagram.com/', '_blank'), 500);
        } else if (platform === 'Facebook') {
          window.open('fb://facewebmodal/f?href=https://www.facebook.com/', '_blank');
          setTimeout(() => window.open('https://www.facebook.com/', '_blank'), 500);
        }
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div className="bg-pink-50 p-5 rounded-[2rem] relative">
          <Share2 className="w-10 h-10 text-pink-500" />
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Step 3</div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tight">Condividi ora</h2>
          <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-[220px] mx-auto">
            Scegli il social e <span className="text-blue-600">incolla i tag</span>.
          </p>
        </div>

        {/* Pulsanti in linea per risparmiare spazio */}
        <div className="w-full flex flex-row gap-3">
          <button 
            onClick={() => handleShare('Instagram')}
            className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl text-white shadow-lg shadow-pink-100 active:scale-95 transition-all"
          >
            <Instagram className="w-6 h-6 mb-2" />
            <span className="font-black uppercase text-[9px] tracking-widest">Instagram</span>
          </button>
          
          <button 
            onClick={() => handleShare('Facebook')}
            className="flex-1 flex flex-col items-center justify-center p-4 bg-[#1877F2] rounded-2xl text-white shadow-lg shadow-blue-100 active:scale-95 transition-all"
          >
            <Facebook className="w-6 h-6 mb-2" />
            <span className="font-black uppercase text-[9px] tracking-widest">Facebook</span>
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start space-x-3">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[9px] font-bold text-blue-800 leading-tight uppercase tracking-tight">
            Ricorda di incollare i tag copiati per ritirare il premio!
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-6">
        <button 
          onClick={onComplete}
          className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 text-base flex items-center justify-center space-x-3 uppercase tracking-widest"
        >
          <span>Ho Condiviso!</span>
        </button>
        <button 
          onClick={onBack}
          className="w-full text-gray-300 font-black py-2 uppercase text-[9px] tracking-widest flex items-center justify-center space-x-2"
        >
          <ChevronLeft className="w-3 h-3" />
          <span>Torna ai tag</span>
        </button>
      </div>
    </div>
  );
};
