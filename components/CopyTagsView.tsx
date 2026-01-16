
import React, { useState } from 'react';
import { Copy, Check, ChevronLeft, Trophy } from 'lucide-react';

interface CopyTagsViewProps {
  onNext: () => void;
  onBack: () => void;
}

export const CopyTagsView: React.FC<CopyTagsViewProps> = ({ onNext, onBack }) => {
  const [copied, setCopied] = useState(false);
  const tags = "@roccafunfactory #roccafunfactory #Spielwarenmesse2026 #GoldenBalloonDog";

  const handleCopy = () => {
    navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div className="bg-blue-50 p-5 rounded-[2rem] relative">
          <Copy className="w-10 h-10 text-blue-600" />
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Step 2</div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tight">Copia i Tag</h2>
          <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-[220px] mx-auto">
            Copia questi tag ora, ti serviranno quando condividerai la tua foto!
          </p>
        </div>

        <div className="w-full relative group">
          <div className="bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] p-5 pr-16 relative overflow-hidden">
             <p className="text-xs font-bold text-gray-700 leading-relaxed italic break-words">
                {tags}
             </p>
          </div>
          <button 
            onClick={handleCopy}
            className={`absolute right-2 top-2 bottom-2 px-4 rounded-xl flex items-center justify-center transition-all ${copied ? 'bg-green-500' : 'bg-blue-600 shadow-lg shadow-blue-100'}`}
          >
            {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
          </button>
        </div>

        {copied && (
          <div className="animate-bounceIn text-green-500 font-black uppercase text-[9px] tracking-widest">
            Tag Copiati con successo!
          </div>
        )}
      </div>

      <div className="space-y-3 pt-6">
        <button 
          onClick={onNext}
          className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 text-base flex items-center justify-center space-x-3 uppercase tracking-widest"
        >
          <span>Vedi il mio premio</span>
          <Trophy className="w-5 h-5" />
        </button>
        <button 
          onClick={onBack}
          className="w-full text-gray-300 font-black py-2 uppercase text-[9px] tracking-widest flex items-center justify-center space-x-2"
        >
          <ChevronLeft className="w-3 h-3" />
          <span>Indietro</span>
        </button>
      </div>
    </div>
  );
};
