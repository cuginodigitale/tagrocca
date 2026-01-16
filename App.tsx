
import React, { useState, useEffect } from 'react';
import { WelcomeView } from './components/WelcomeView';
import { CameraView } from './components/CameraView';
import { PreviewView } from './components/PreviewView';
import { RewardView } from './components/RewardView';
import { AppStep } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [image, setImage] = useState<string | null>(null);

  const handleCapture = (imageData: string) => {
    setImage(imageData);
    setStep(AppStep.PREVIEW);
  };

  const handleShareComplete = () => {
    setStep(AppStep.WIN);
  };

  const handleReset = () => {
    setImage(null);
    setStep(AppStep.WELCOME);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden flex flex-col">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50" />
      
      <main className="flex-1 flex flex-col">
        {step === AppStep.WELCOME && (
          <WelcomeView onStart={() => setStep(AppStep.CAMERA)} />
        )}
        
        {step === AppStep.CAMERA && (
          <CameraView onCapture={handleCapture} onBack={() => setStep(AppStep.WELCOME)} />
        )}
        
        {step === AppStep.PREVIEW && image && (
          <PreviewView 
            image={image} 
            onShareComplete={handleShareComplete} 
            onRetake={() => setStep(AppStep.CAMERA)} 
          />
        )}
        
        {step === AppStep.WIN && (
          <RewardView onReset={handleReset} />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="p-4 text-center text-xs text-gray-400">
        © 2024 La Tua Azienda • Evento Stand Gadget
      </footer>
    </div>
  );
};

export default App;
