
import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';

interface WelcomeViewProps {
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn h-full overflow-hidden relative">
      <div className="flex-1 overflow-y-auto px-8 pt-12 flex flex-col items-center">
        
        <div className="text-center mb-10 shrink-0">
          <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">
            Ecco come vincere il <br/>
            <span className="text-blue-600 uppercase">Golden Balloon Dog</span>
          </h1>
          <div className="h-1.5 w-12 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="w-full max-w-[280px] space-y-8 pb-6">
          <ul className="space-y-7">
            <li className="flex items-start space-x-5">
              <div className="bg-gray-900 rounded-full p-1.5 mt-0.5 shadow-lg flex-shrink-0">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-base leading-snug">
                Scatta una foto creativa allo stand
              </p>
            </li>
            <li className="flex items-start space-x-5">
              <div className="bg-blue-600 rounded-full p-1.5 mt-0.5 shadow-lg flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-base leading-snug">
                Condividi con i tag ufficiali
              </p>
            </li>
            <li className="flex items-start space-x-5">
              <div className="bg-yellow-500 rounded-full p-1.5 mt-0.5 shadow-lg flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-bold text-base leading-snug">
                Ricevi subito il tuo regalo esclusivo!
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-8 pb-12 bg-white shrink-0">
        <button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-blue-200 transition-all active:scale-95 text-xl flex items-center justify-center space-x-4 uppercase tracking-widest"
        >
          <span>Inizia Ora</span>
          <Camera className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
