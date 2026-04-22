'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { apiFetch } from '@/lib/api';
import CreditConfirmModal from './CreditConfirmModal';

interface CreditResult {
  customerId: string;
  customerName: string;
  stampsBalance: number;
  rewardUnlocked: boolean;
  rewardLabel?: string;
}

type ScanState = 'scanning' | 'processing' | 'success' | 'error';

export default function QrTab() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<CreditResult | null>(null);

  const startScanner = useCallback(async () => {
    if (!videoRef.current) return;
    setScanState('scanning');
    setErrorMsg('');

    try {
      const reader = new BrowserQRCodeReader();
      controlsRef.current = await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        async (res, err) => {
          if (!res) return;
          if (err?.name === 'NotFoundException') return;

          controlsRef.current?.stop();
          setScanState('processing');

          try {
            const data = await apiFetch<CreditResult>('/loyalty/credit', {
              method: 'POST',
              body: JSON.stringify({
                source: 'QR_SCAN',
                qrPayload: res.getText(),
              }),
            });
            setResult(data);
            setScanState('success');
          } catch (e: unknown) {
            setErrorMsg(e instanceof Error ? e.message : 'Erreur lors du crédit');
            setScanState('error');
          }
        },
      );
    } catch {
      setErrorMsg("Impossible d'accéder à la caméra");
      setScanState('error');
    }
  }, []);

  useEffect(() => {
    startScanner();
    return () => {
      controlsRef.current?.stop();
    };
  }, [startScanner]);

  function handleClose() {
    setResult(null);
    startScanner();
  }

  return (
    <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full px-8">
        {/* Viewfinder */}
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-2xl border-2 border-white/30" />
          {/* Corner markers */}
          {[
            'top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl',
            'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl',
            'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl',
            'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl',
          ].map((cls, i) => (
            <div key={i} className={`absolute w-8 h-8 border-white ${cls}`} />
          ))}

          {scanState === 'processing' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60">
              <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
            </div>
          )}
        </div>

        <p className="text-white/80 text-sm text-center">
          {scanState === 'scanning' && 'Pointez la caméra vers le QR code du client'}
          {scanState === 'processing' && 'Crédit en cours...'}
          {scanState === 'error' && (
            <span className="text-red-300">{errorMsg}</span>
          )}
        </p>

        {scanState === 'error' && (
          <button
            onClick={startScanner}
            className="rounded-xl bg-white text-[#1B2F5E] px-6 py-2 text-sm font-semibold active:scale-95 transition-transform"
          >
            Réessayer
          </button>
        )}
      </div>

      {/* Success modal */}
      {scanState === 'success' && result && (
        <CreditConfirmModal result={result} onClose={handleClose} />
      )}
    </div>
  );
}
