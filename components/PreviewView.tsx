
import React from 'react';
import { Check, RotateCcw } from 'lucide-react';

interface PreviewViewProps {
  image: string;
  onConfirm: () => void;
  onRetake: () => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ image, onConfirm, onRetake }) => {
  return (
    <div className="flex-1 flex flex-col p-6 animate-fadeIn bg-white overflow-hidden h-full">
      {/* Titolo ridotto per risparmiare spazio */}
      <div className="shrink-0 mb-4">
        <h2 className="text-xl font-black text-center text-gray-900 uppercase tracking-tight">
          Ti piace questa foto?
        </h2>
      </div>
      
      {/* Container Foto - Flessibile per adattarsi allo schermo senza scroll */}
      <div className="flex-1 min-h-0 flex items-center justify-center mb-6">
        <div className="h-full w-full rounded-[2rem] overflow-hidden shadow-2xl border-[4px] border-gray-50 relative aspect-[9/16] mx-auto">
          <img 
            src={image} 
            alt="Captured" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* Pulsanti - Sempre visibili in basso */}
      <div className="grid grid-cols-2 gap-4 shrink-0 pb-4">
        <button 
          onClick={onRetake}
          className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-500 py-5 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Riprova</span>
        </button>
        
        <button 
          onClick={onConfirm}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200 active:scale-95 transition-all"
        >
          <Check className="w-5 h-5" />
          <span>Va bene</span>
        </button>
      </div>
    </div>
  );
};
