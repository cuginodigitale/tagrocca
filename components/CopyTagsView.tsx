
import React, { useState } from 'react';
import { Copy, Check, ChevronLeft, ArrowRight } from 'lucide-react';

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
    <div className="flex-1 flex flex-col bg-white animate-fadeIn p-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="bg-blue-50 p-6 rounded-[2.5rem] relative">
          <Copy className="w-12 h-12 text-blue-600" />
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Step 2</div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">Copia i Tag</h2>
          <p className="text-sm font-bold text-gray-400 leading-relaxed max-w-[240px] mx-auto">
            Copia questi tag ora per poterli incollare facilmente nel prossimo passaggio.
          </p>
        </div>

        <div className="w-full relative group">
          <div className="bg-gray-50 border-2 border-gray-100 rounded-[2rem] p-6 pr-20 relative overflow-hidden">
             <p className="text-sm font-bold text-gray-700 leading-relaxed italic break-words">
                {tags}
             </p>
          </div>
          <button 
            onClick={handleCopy}
            className={`absolute right-3 top-3 bottom-3 px-5 rounded-2xl flex items-center justify-center transition-all ${copied ? 'bg-green-500' : 'bg-blue-600 shadow-lg shadow-blue-100'}`}
          >
            {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
          </button>
        </div>

        {copied && (
          <div className="animate-bounceIn text-green-500 font-black uppercase text-[10px] tracking-widest">
            Tag copiati negli appunti!
          </div>
        )}
      </div>

      <div className="space-y-4 pt-8">
        <button 
          onClick={onNext}
          className="w-full bg-blue-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-blue-100 transition-all active:scale-95 text-lg flex items-center justify-center space-x-4 uppercase tracking-[0.2em]"
        >
          <span>Prossimo Step</span>
          <ArrowRight className="w-6 h-6" />
        </button>
        <button 
          onClick={onBack}
          className="w-full text-gray-300 font-black py-2 uppercase text-[10px] tracking-widest flex items-center justify-center space-x-2"
        >
          <ChevronLeft className="w-3 h-3" />
          <span>Torna alla foto</span>
        </button>
      </div>
    </div>
  );
};
