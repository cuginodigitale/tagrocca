
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
        // Richiediamo esplicitamente un aspect ratio verticale (9:16)
        const constraints = {
          video: {
            facingMode: facingMode,
            aspectRatio: { ideal: 9 / 16 },
            width: { ideal: 1080 },
            height: { ideal: 1920 }
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
        setError("Impossibile accedere alla fotocamera. Assicurati di aver dato i permessi e di usare HTTPS.");
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
        // Manteniamo le proporzioni del video per il canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        context.save();
        if (facingMode === 'user') {
          // Effetto specchio solo per la fotocamera frontale
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.restore();
        
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="flex-1 bg-black relative flex flex-col items-center justify-center overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 bg-black">
          <RefreshCcw className="w-10 h-10 animate-spin mb-4 text-blue-500" />
          <p className="font-bold tracking-widest text-xs uppercase animate-pulse">Inquadratura verticale...</p>
        </div>
      )}

      {error ? (
        <div className="p-8 text-center text-white z-30">
          <div className="bg-red-500/20 p-4 rounded-2xl border border-red-500/50 mb-6">
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button onClick={onBack} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all">
            Torna Indietro
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Overlays Superiore */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30 bg-gradient-to-b from-black/60 to-transparent">
            <button onClick={onBack} className="bg-black/20 backdrop-blur-xl p-3 rounded-2xl text-white border border-white/20 active:scale-90 transition-all">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-blue-600/80 backdrop-blur-xl px-5 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl border border-white/30 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Spielwarenmesse 2026</span>
            </div>
            <button onClick={toggleCamera} className="bg-black/20 backdrop-blur-xl p-3 rounded-2xl text-white border border-white/20 active:scale-90 transition-all">
              <SwitchCamera className="w-6 h-6" />
            </button>
          </div>

          {/* Mirino centrale (Opzionale, per aiutare l'inquadratura) */}
          <div className="absolute inset-0 border-[2px] border-white/10 pointer-events-none m-12 rounded-3xl"></div>

          {/* Controlli Inferiori */}
          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center space-y-6 z-30 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-lg">Inquadra e scatta</p>
            <div className="relative">
                <button 
                  onClick={capture}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.4)] relative z-10"
                >
                  <div className="w-[70px] h-[70px] rounded-full border-2 border-black/10 flex items-center justify-center bg-gray-50">
                     <Camera className="w-8 h-8 text-black" />
                  </div>
                </button>
                {/* Effetto alone */}
                <div className="absolute inset-0 bg-white/30 rounded-full scale-125 animate-ping opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
