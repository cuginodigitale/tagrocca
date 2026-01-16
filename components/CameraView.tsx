
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
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    let mounted = true;

    async function setupCamera(retryWithDefaults = false) {
      if (!mounted) return;
      setIsLoading(true);
      setError(null);
      stopTracks();

      try {
        // Vincoli iniziali: cerchiamo di essere specifici ma non troppo restrittivi
        const constraints: MediaStreamConstraints = retryWithDefaults 
          ? { video: true } 
          : {
              video: {
                facingMode: facingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 }
              },
              audio: false
            };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (mounted) setIsLoading(false);
          };
        }
      } catch (err: any) {
        console.warn("Camera setup attempt failed:", err.name, err.message);
        
        // Se fallisce con 'environment' (comune su desktop che ha solo 1 camera frontale), riproviamo senza facingMode
        if (!retryWithDefaults && (err.name === 'OverconstrainedError' || err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError')) {
          console.log("Retrying with default constraints...");
          setupCamera(true);
        } else {
          if (mounted) {
            setError("Impossibile accedere alla fotocamera. Assicurati di aver dato i permessi e che nessun'altra app la stia usando.");
            setIsLoading(false);
          }
        }
      }
    }

    setupCamera();

    return () => {
      mounted = false;
      stopTracks();
    };
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
        const sourceWidth = video.videoWidth;
        const sourceHeight = video.videoHeight;
        
        // Obiettivo: Portrait 9:16
        const targetRatio = 9 / 16;
        let drawWidth = sourceWidth;
        let drawHeight = sourceHeight;
        let xOffset = 0;
        let yOffset = 0;

        // Ritaglio centrale per forzare il rapporto 9:16
        if (sourceWidth / sourceHeight > targetRatio) {
          drawWidth = sourceHeight * targetRatio;
          xOffset = (sourceWidth - drawWidth) / 2;
        } else {
          drawHeight = sourceWidth / targetRatio;
          yOffset = (sourceHeight - drawHeight) / 2;
        }

        canvas.width = 1080;
        canvas.height = 1920;
        
        context.save();
        // Specchio per la fotocamera frontale
        if (facingMode === 'user') {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        
        context.drawImage(
          video, 
          xOffset, yOffset, drawWidth, drawHeight, 
          0, 0, canvas.width, canvas.height
        );
        context.restore();
        
        const imageData = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="flex-1 bg-black relative flex flex-col items-center justify-center overflow-hidden">
      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 bg-black">
          <RefreshCcw className="w-10 h-10 animate-spin mb-4 text-blue-500" />
          <p className="font-black tracking-[0.2em] text-[10px] uppercase">Inizializzazione...</p>
        </div>
      )}

      {error ? (
        <div className="p-8 text-center text-white z-30 animate-fadeIn">
          <div className="bg-red-500/20 p-6 rounded-3xl border border-red-500/50 mb-8">
            <p className="text-sm font-bold leading-relaxed">{error}</p>
          </div>
          <button 
            onClick={onBack} 
            className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
          >
            Torna Indietro
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[9/16] max-h-full overflow-hidden flex items-center justify-center bg-gray-900">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={`absolute min-w-full min-h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
            />
          </div>
          
          <canvas ref={canvasRef} className="hidden" />

          {/* Overlays */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30">
            <button onClick={onBack} className="bg-black/40 backdrop-blur-xl p-4 rounded-3xl text-white border border-white/20 active:scale-90 transition-all">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-blue-600/90 backdrop-blur-xl px-5 py-2 rounded-full text-white text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/30 flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span>LIVE CAMERA</span>
            </div>
            <button onClick={toggleCamera} className="bg-black/40 backdrop-blur-xl p-4 rounded-3xl text-white border border-white/20 active:scale-90 transition-all">
              <SwitchCamera className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
             <div className="w-full aspect-[9/16] border-[1px] border-white/20 rounded-[2rem] relative">
                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white/40"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-white/40"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-white/40"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white/40"></div>
             </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center z-30 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <div className="relative">
                <button 
                  onClick={capture}
                  disabled={isLoading}
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)] relative z-10 disabled:opacity-50"
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
