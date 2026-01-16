
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
        // Vincoli rigorosi per forzare la modalità verticale (Portrait)
        const constraints = {
          video: {
            facingMode: facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            // Molti browser mobili invertono width/height in base all'orientamento
            // Usiamo aspectRatio per guidare il browser
            aspectRatio: { ideal: 9 / 16 }
          },
          audio: false
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsLoading(false);
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Impossibile accedere alla fotocamera. Assicurati di aver dato i permessi e di usare un dispositivo mobile.");
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
        // Catturiamo esattamente quello che si vede nel riquadro 9:16
        // Se il video sorgente è orizzontale, dobbiamo ritagliarlo centralmente
        const targetRatio = 9 / 16;
        let sourceWidth = video.videoWidth;
        let sourceHeight = video.videoHeight;
        let xOffset = 0;
        let yOffset = 0;

        // Se il video è più largo di 9:16 (es. è 4:3 o 16:9 orizzontale)
        if (sourceWidth / sourceHeight > targetRatio) {
          const newWidth = sourceHeight * targetRatio;
          xOffset = (sourceWidth - newWidth) / 2;
          sourceWidth = newWidth;
        } 
        // Se il video è più alto di 9:16
        else if (sourceWidth / sourceHeight < targetRatio) {
          const newHeight = sourceWidth / targetRatio;
          yOffset = (sourceHeight - newHeight) / 2;
          sourceHeight = newHeight;
        }

        canvas.width = 1080;
        canvas.height = 1920;
        
        context.save();
        if (facingMode === 'user') {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        
        context.drawImage(
          video, 
          xOffset, yOffset, sourceWidth, sourceHeight, 
          0, 0, canvas.width, canvas.height
        );
        context.restore();
        
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="flex-1 bg-black relative flex flex-col items-center justify-center overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 bg-black">
          <RefreshCcw className="w-10 h-10 animate-spin mb-4 text-blue-500" />
          <p className="font-black tracking-[0.3em] text-[10px] uppercase">Portrait Mode...</p>
        </div>
      )}

      {error ? (
        <div className="p-8 text-center text-white z-30">
          <div className="bg-red-500/20 p-6 rounded-3xl border border-red-500/50 mb-8">
            <p className="text-sm font-bold leading-relaxed">{error}</p>
          </div>
          <button onClick={onBack} className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl active:scale-95 transition-all">
            Torna Indietro
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Container 9:16 per forzare l'aspetto visivo indipendentemente dallo schermo */}
          <div className="relative w-full aspect-[9/16] max-h-full overflow-hidden flex items-center justify-center">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={`absolute min-w-full min-h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
            />
          </div>
          
          <canvas ref={canvasRef} className="hidden" />

          {/* Overlays Superiore */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30">
            <button onClick={onBack} className="bg-black/40 backdrop-blur-xl p-4 rounded-3xl text-white border border-white/20 active:scale-90 transition-all">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-blue-600/90 backdrop-blur-xl px-5 py-2 rounded-full text-white text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/30 flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span>Rocca Fun 2026</span>
            </div>
            <button onClick={toggleCamera} className="bg-black/40 backdrop-blur-xl p-4 rounded-3xl text-white border border-white/20 active:scale-90 transition-all">
              <SwitchCamera className="w-6 h-6" />
            </button>
          </div>

          {/* Griglia Guida Centrale */}
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
             <div className="w-full aspect-[9/16] border-[1px] border-white/20 rounded-[2rem] relative">
                {/* Angoli mirino */}
                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white/40"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-white/40"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-white/40"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white/40"></div>
             </div>
          </div>

          {/* Controlli Inferiori */}
          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center z-30 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <p className="text-white text-[9px] font-black uppercase tracking-[0.4em] mb-6 drop-shadow-md">Vertical 9:16 Capture</p>
            <div className="relative">
                <button 
                  onClick={capture}
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)] relative z-10"
                >
                  <div className="w-20 h-20 rounded-full border-[1px] border-black/5 flex items-center justify-center bg-gray-50">
                     <Camera className="w-10 h-10 text-black" />
                  </div>
                </button>
                <div className="absolute inset-0 bg-white/20 rounded-full scale-125 animate-ping opacity-10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
