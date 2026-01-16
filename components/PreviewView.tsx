
import React from 'react';
import { Check, RotateCcw } from 'lucide-react';

interface PreviewViewProps {
  image: string;
  onConfirm: () => void;
  onRetake: () => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ image, onConfirm, onRetake }) => {
  return (
    <div className="flex-1 flex flex-col p-6 animate-fadeIn bg-gray-50/50 overflow-hidden">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h2 className="text-xl font-black text-center mb-6 text-gray-900 uppercase tracking-tight">
          Ti piace questa foto?
        </h2>
        
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white aspect-[9/16] relative mb-10">
          <img src={image} alt="Captured" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onRetake}
            className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-100 text-gray-500 py-5 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-sm"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Rifalla</span>
          </button>
          
          <button 
            onClick={onConfirm}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200 active:scale-95 transition-all"
          >
            <Check className="w-5 h-5" />
            <span>Usa questa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
