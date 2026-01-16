
import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, RefreshCcw, SwitchCamera } from 'lucide-react';

interface CameraViewProps {
  onCapture: (image: string) => void;
  onBack: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const stopTracks = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    async function setupCamera() {
      setIsLoading(true);
      stopTracks();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: facingMode, 
            width: { ideal: 1080 }, 
            height: { ideal: 1920 } 
          }, 
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsLoading(false);
          };
        }
      } catch (err) {
        setError("Impossibile accedere alla fotocamera. Assicurati di aver dato i permessi.");
        setIsLoading(false);
      }
    }
    setupCamera();

    return stopTracks;
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        if (facingMode === 'user') {
          // Horizontal flip only for front camera
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="flex-1 bg-black relative flex flex-col justify-center overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 bg-black">
          <RefreshCcw className="w-10 h-10 animate-spin mb-4" />
          <p className="font-bold tracking-widest text-xs uppercase">Inizializzazione...</p>
        </div>
      )}

      {error ? (
        <div className="p-8 text-center text-white">
          <p className="mb-4 text-sm opacity-80">{error}</p>
          <button onClick={onBack} className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest">Torna Indietro</button>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Overlays */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30">
            <button onClick={onBack} className="bg-black/40 backdrop-blur-md p-3 rounded-2xl text-white border border-white/10">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-blue-600/90 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/20">
              {facingMode === 'user' ? 'Selfie Mode' : 'Live View'}
            </div>
            <button onClick={toggleCamera} className="bg-black/40 backdrop-blur-md p-3 rounded-2xl text-white border border-white/10">
              <SwitchCamera className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center space-y-6 z-30 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em]">Scatta la tua foto Fun Factory</p>
            <button 
              onClick={capture}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-[10px] border-white/20 active:scale-90 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              <div className="w-16 h-16 rounded-full border-2 border-black/5 flex items-center justify-center bg-gray-50">
                 <Camera className="w-10 h-10 text-black" />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
