
import React, { useState } from 'react';
import { WelcomeView } from './components/WelcomeView';
import { CameraView } from './components/CameraView';
import { PreviewView } from './components/PreviewView';
import { ShareView } from './components/ShareView';
import { RewardView } from './components/RewardView';
import { AppStep } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [image, setImage] = useState<string | null>(null);

  const handleCapture = (imageData: string) => {
    setImage(imageData);
    setStep(AppStep.PREVIEW);
  };

  const handleConfirm = () => {
    setStep(AppStep.SHARE);
  };

  const handleShareComplete = () => {
    setStep(AppStep.WIN);
  };

  const handleReset = () => {
    setImage(null);
    setStep(AppStep.WELCOME);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-hidden selection:bg-blue-100 touch-none">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-400 z-[100]" />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {step === AppStep.WELCOME && (
          <WelcomeView onStart={() => setStep(AppStep.CAMERA)} />
        )}
        
        {step === AppStep.CAMERA && (
          <CameraView onCapture={handleCapture} onBack={() => setStep(AppStep.WELCOME)} />
        )}
        
        {step === AppStep.PREVIEW && image && (
          <PreviewView 
            image={image} 
            onConfirm={handleConfirm} 
            onRetake={() => setStep(AppStep.CAMERA)} 
          />
        )}

        {step === AppStep.SHARE && image && (
          <ShareView 
            image={image} 
            onComplete={handleShareComplete} 
            onBack={() => setStep(AppStep.PREVIEW)}
          />
        )}
        
        {step === AppStep.WIN && (
          <RewardView onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;
