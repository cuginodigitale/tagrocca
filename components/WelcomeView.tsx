
import React from 'react';
import { Camera, Gift, CheckCircle2 } from 'lucide-react';

interface WelcomeViewProps {
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn h-full">
      {/* Area Contenuto Superiore */}
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-4 flex flex-col items-center">
        
        {/* Branding Superiore */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">
            ROCCA FUN FACTORY
          </p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Spielwarenmesse 2026
          </p>
        </div>

        {/* Icona Centrale Soft */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-white rounded-[2.5rem] flex items-center justify-center border-2 border-blue-100 shadow-sm relative">
            <Gift className="w-12 h-12 text-blue-600" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white animate-pulse"></div>
          </div>
        </div>

        {/* Titolo Principale */}
        <div className="text-center mb-10 max-w-[280px]">
          <h1 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
            Vuoi vincere il <span className="text-blue-600">Gold Balloon Dog?</span>
          </h1>
          <p className="text-gray-400 text-xs font-medium mt-2 uppercase tracking-wide">Segui questi semplici passi:</p>
        </div>
        
        {/* Bullet Points Compatti */}
        <div className="w-full max-w-[260px] space-y-5">
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <div className="bg-blue-600 rounded-full p-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-[13px] leading-snug">
                Scatta una foto creativa al nostro stand
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <div className="bg-pink-500 rounded-full p-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-[13px] leading-snug">
                Condividila taggando <span className="text-blue-600">@roccafunfactory</span>
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <div className="bg-yellow-500 rounded-full p-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-[13px] leading-snug">
                Mostra il post al team e ritira il premio!
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Pulsante Sempre Visibile (Sticky bottom) */}
      <div className="p-8 pb-10 bg-white border-t border-gray-50 flex flex-col items-center">
        <button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-blue-200 transition-all active:scale-95 text-lg flex items-center justify-center space-x-3 uppercase tracking-widest"
        >
          <span>Partecipa Ora</span>
          <Camera className="w-6 h-6" />
        </button>
        <div className="mt-4 flex items-center space-x-2 opacity-40">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
           <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">
             Sistema Attivo • Richiesti Permessi Cam
           </p>
        </div>
      </div>
    </div>
  );
};
