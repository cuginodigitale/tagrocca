
import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, RefreshCcw } from 'lucide-react';

interface CameraViewProps {
  onCapture: (image: string) => void;
  onBack: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1920 } }, 
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

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Horizontal flip for front camera
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
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
          <p>Preparazione fotocamera...</p>
        </div>
      )}

      {error ? (
        <div className="p-8 text-center text-white">
          <p className="mb-4">{error}</p>
          <button onClick={onBack} className="bg-white text-black px-6 py-2 rounded-xl font-bold">Torna Indietro</button>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover scale-x-[-1]" 
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Overlays */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30">
            <button onClick={onBack} className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-white text-xs font-medium uppercase tracking-widest">
              Live Preview
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center space-y-6 z-30 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white/80 text-sm font-medium">Trova l'angolazione perfetta!</p>
            <button 
              onClick={capture}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-8 border-white/20 active:scale-90 transition-transform shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center">
                 <Camera className="w-8 h-8 text-black" />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
