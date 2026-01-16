
import React, { useState } from 'react';
import { WelcomeView } from './components/WelcomeView';
import { CameraView } from './components/CameraView';
import { PreviewView } from './components/PreviewView';
import { CopyTagsView } from './components/CopyTagsView';
import { SocialShareView } from './components/SocialShareView';
import { RewardView } from './components/RewardView';
import { StepIndicator } from './components/StepIndicator';
import { AppStep } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [image, setImage] = useState<string | null>(null);

  const handleCapture = (imageData: string) => {
    setImage(imageData);
    setStep(AppStep.STEP1_PREVIEW);
  };

  const handleConfirmImage = () => {
    setStep(AppStep.STEP2_TAGS);
  };

  const handleTagsCopied = () => {
    setStep(AppStep.STEP3_SHARE);
  };

  const handleShareComplete = () => {
    setStep(AppStep.WIN);
  };

  const handleReset = () => {
    setImage(null);
    setStep(AppStep.WELCOME);
  };

  const getCurrentStepNumber = () => {
    switch(step) {
      case AppStep.STEP1_CAMERA:
      case AppStep.STEP1_PREVIEW: return 1;
      case AppStep.STEP2_TAGS: return 2;
      case AppStep.STEP3_SHARE: return 3;
      case AppStep.WIN: return 4;
      default: return 0;
    }
  };

  const stepNumber = getCurrentStepNumber();

  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-hidden selection:bg-blue-100 touch-none">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-400 z-[100]" />
      
      {step !== AppStep.WELCOME && step !== AppStep.WIN && (
        <StepIndicator currentStep={stepNumber} />
      )}

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {step === AppStep.WELCOME && (
          <WelcomeView onStart={() => setStep(AppStep.STEP1_CAMERA)} />
        )}
        
        {step === AppStep.STEP1_CAMERA && (
          <CameraView onCapture={handleCapture} onBack={() => setStep(AppStep.WELCOME)} />
        )}
        
        {step === AppStep.STEP1_PREVIEW && image && (
          <PreviewView 
            image={image} 
            onConfirm={handleConfirmImage} 
            onRetake={() => setStep(AppStep.STEP1_CAMERA)} 
          />
        )}

        {step === AppStep.STEP2_TAGS && (
          <CopyTagsView 
            onNext={handleTagsCopied} 
            onBack={() => setStep(AppStep.STEP1_PREVIEW)} 
          />
        )}

        {step === AppStep.STEP3_SHARE && image && (
          <SocialShareView 
            image={image} 
            onComplete={handleShareComplete} 
            onBack={() => setStep(AppStep.STEP2_TAGS)}
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
