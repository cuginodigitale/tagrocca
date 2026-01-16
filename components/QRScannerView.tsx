
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, QrCode, RefreshCcw, Info } from 'lucide-react';
import jsQR from 'jsqr';

interface QRScannerViewProps {
  onScanned: (tags: string) => void;
  onBack: () => void;
  onSkip: () => void;
}

export const QRScannerView: React.FC<QRScannerViewProps> = ({ onScanned, onBack, onSkip }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    let mounted = true;
    let stream: MediaStream | null = null;
    let animationId: number;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.play();
          requestAnimationFrame(tick);
        }
      } catch (err) {
        setError("Impossibile accedere alla fotocamera per la scansione QR.");
      }
    };

    const tick = () => {
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        
        if (context) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (code && mounted) {
            setIsScanning(false);
            // Simula un piccolo feedback prima di procedere
            setTimeout(() => {
              onScanned(code.data);
            }, 500);
            return;
          }
        }
      }
      if (mounted) {
        animationId = requestAnimationFrame(tick);
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (stream) stream.getTracks().forEach(t => t.stop());
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex-1 bg-gray-900 relative flex flex-col overflow-hidden text-white h-full">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={onBack} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Scansione Stand</h2>
        </div>
        <button onClick={onSkip} className="text-[10px] font-black uppercase tracking-widest text-white/60">
          Salta
        </button>
      </div>

      {/* Video Preview */}
      <div className="flex-1 relative">
        <video ref={videoRef} className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="hidden" />

        {/* Scanner Overlay UI */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="relative w-64 h-64 border-2 border-white/20 rounded-3xl overflow-hidden shadow-[0_0_0_100vmax_rgba(0,0,0,0.5)]">
              <div className="qr-scanner-line" />
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>
           </div>
        </div>

        {/* Instruction Message */}
        <div className="absolute bottom-24 left-0 w-full px-12 text-center">
           {!isScanning ? (
              <div className="bg-green-500 text-white p-4 rounded-2xl animate-bounceIn flex items-center justify-center space-x-2">
                 <QrCode className="w-5 h-5" />
                 <span className="font-black uppercase text-xs tracking-widest">Codice Rilevato!</span>
              </div>
           ) : (
              <div className="space-y-4">
                 <p className="text-sm font-bold text-white/80 leading-tight">
                    Inquadra il QR Code allo stand <br/>per attivare i tag ufficiali
                 </p>
                 <div className="flex justify-center">
                    <RefreshCcw className="w-6 h-6 text-blue-400 animate-spin opacity-40" />
                 </div>
              </div>
           )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-50">
          <div className="bg-red-500/20 p-6 rounded-3xl border border-red-500/50 mb-8">
            <p className="text-sm font-bold leading-relaxed">{error}</p>
          </div>
          <button 
            onClick={onSkip} 
            className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest"
          >
            Continua senza QR
          </button>
        </div>
      )}
    </div>
  );
};
