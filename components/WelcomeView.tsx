
import React from 'react';
import { Camera, Gift, Share2 } from 'lucide-react';

interface WelcomeViewProps {
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center animate-bounce">
          <Gift className="w-16 h-16 text-blue-600" />
        </div>
        <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
          VINCI ORA!
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
        Scatta, Condividi e <span className="text-blue-600">Vinci!</span>
      </h1>
      
      <p className="text-gray-600 mb-10 text-lg">
        Partecipa alla nostra sfida! Scatta una foto creativa al nostro stand e ricevi subito un 
        <strong className="text-gray-900"> Balloon Dog</strong> originale.
      </p>

      <div className="space-y-4 w-full mb-12">
        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-700 text-left">Fatti un selfie originale</p>
        </div>
        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="bg-purple-500 p-2 rounded-lg">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-700 text-left">Condividi con #TuaAzienda</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl transition-all active:scale-95 text-xl flex items-center justify-center space-x-3"
      >
        <span>Inizia Ora</span>
        <Camera className="w-6 h-6" />
      </button>
    </div>
  );
};
