
import React from 'react';
import { Camera, Copy, Trophy } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Scatta', icon: Camera },
    { id: 2, label: 'Copia', icon: Copy },
  ];

  return (
    <div className="w-full bg-white pt-6 pb-4 px-6 border-b border-gray-50 shrink-0 z-[60]">
      <div className="flex items-center justify-between max-w-xs mx-auto relative">
        {/* Linea di connessione */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
        <div 
          className="absolute top-4 left-0 h-0.5 bg-blue-600 transition-all duration-500 -z-10" 
          style={{ width: `${currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'}` }}
        ></div>

        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110 shadow-lg' 
                    : isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-300 border-2 border-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest mt-2 ${isActive ? 'text-blue-600' : 'text-gray-300'}`}>
                {step.label}
              </span>
            </div>
          );
        })}

        {/* Goal Finale */}
        <div className="flex flex-col items-center ml-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-dashed transition-all duration-300 ${currentStep === 3 ? 'bg-yellow-400 border-yellow-500 text-white scale-110 shadow-lg' : 'bg-gray-50 border-gray-200 text-gray-300'}`}>
                <Trophy className="w-4 h-4" />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest mt-2 ${currentStep === 3 ? 'text-yellow-600' : 'text-gray-400'}`}>Premio</span>
        </div>
      </div>
    </div>
  );
};
