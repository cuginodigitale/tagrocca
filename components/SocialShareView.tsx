
import React from 'react';
import { Instagram, Facebook, Share2, ChevronLeft, ArrowRight } from 'lucide-react';

interface SocialShareViewProps {
  image: string;
  onComplete: () => void;
  onBack: () => void;
}

export const SocialShareView: React.FC<SocialShareViewProps> = ({ onComplete, onBack }) => {
  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="bg-pink-50 p-6 rounded-[2.5rem] relative">
          <Share2 className="w-12 h-12 text-pink-500" />
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Step 3</div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">Tutto Pronto!</h2>
          <p className="text-sm font-bold text-gray-400 leading-relaxed max-w-[240px] mx-auto">
            Ora non resta che pubblicare la tua foto sui social.
          </p>
        </div>

        {/* Icone Social in linea e minimali */}
        <div className="flex items-center space-x-6">
          <div className="p-4 bg-gray-50 rounded-2xl text-pink-500 border border-gray-100 shadow-sm">
            <Instagram className="w-8 h-8" />
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl text-[#1877F2] border border-gray-100 shadow-sm">
            <Facebook className="w-8 h-8" />
          </div>
        </div>

        <div className="text-center px-4">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
            Premi il tasto sotto per procedere al ritiro
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-6">
        <button 
          onClick={onComplete}
          className="w-full bg-blue-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-blue-100 transition-all active:scale-95 text-lg flex items-center justify-center space-x-3 uppercase tracking-widest"
        >
          <span>Pronto per condividere</span>
          <ArrowRight className="w-6 h-6" />
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
