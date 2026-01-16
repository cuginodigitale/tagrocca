
import React from 'react';
import { Camera, Gift, CheckCircle2 } from 'lucide-react';

interface WelcomeViewProps {
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn h-full overflow-hidden">
      {/* Area Contenuto Superiore - Scrollabile solo internamente per evitare sovrapposizioni su schermi piccoli */}
      <div className="flex-1 overflow-y-auto px-8 pt-10 pb-4 flex flex-col items-center">
        
        {/* Branding Superiore */}
        <div className="text-center mb-8 shrink-0">
          <p className="text-[12px] font-black text-blue-600 uppercase tracking-[0.4em] mb-1">
            ROCCA FUN FACTORY
          </p>
          <div className="inline-block px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Spielwarenmesse 2026
            </p>
          </div>
        </div>

        {/* Icona Centrale */}
        <div className="mb-8 shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-white rounded-[2.5rem] flex items-center justify-center border-2 border-blue-50 shadow-sm relative">
            <Gift className="w-12 h-14 text-blue-600" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-md animate-pulse"></div>
          </div>
        </div>

        {/* Titolo Principale */}
        <div className="text-center mb-8 max-w-[300px] shrink-0">
          <h1 className="text-3xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Vuoi vincere il <br/><span className="text-blue-600">Gold Balloon Dog?</span>
          </h1>
          <p className="text-gray-400 text-xs font-bold mt-4 uppercase tracking-[0.1em]">Partecipare è semplicissimo:</p>
        </div>
        
        {/* Bullet Points */}
        <div className="w-full max-w-[280px] space-y-6 pb-6">
          <ul className="space-y-5">
            <li className="flex items-start space-x-5">
              <div className="bg-blue-600 rounded-full p-1.5 mt-0.5 shadow-lg shadow-blue-100 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-sm leading-snug">
                Scatta una foto creativa al nostro stand
              </p>
            </li>
            <li className="flex items-start space-x-5">
              <div className="bg-pink-500 rounded-full p-1.5 mt-0.5 shadow-lg shadow-pink-100 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-sm leading-snug">
                Condividila taggando <span className="text-blue-600 underline decoration-blue-200 decoration-2">@roccafunfactory</span>
              </p>
            </li>
            <li className="flex items-start space-x-5">
              <div className="bg-yellow-500 rounded-full p-1.5 mt-0.5 shadow-lg shadow-yellow-100 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-sm leading-snug">
                Mostra il post al team e ritira il premio!
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Area Pulsante - Sempre in fondo, fisso */}
      <div className="p-8 pb-10 bg-white border-t border-gray-100 shrink-0">
        <button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-blue-200 transition-all active:scale-95 text-xl flex items-center justify-center space-x-4 uppercase tracking-widest"
        >
          <span>Partecipa</span>
          <Camera className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
