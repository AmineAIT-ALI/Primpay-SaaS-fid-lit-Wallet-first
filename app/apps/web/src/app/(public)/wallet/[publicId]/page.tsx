'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QRCode from 'react-qr-code';
import { Smartphone, Gift, Download } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface CardData {
  publicId: string;
  firstName: string;
  merchantName: string;
  programName: string;
  stampsBalance: number;
  stampsRequired: number;
  rewardLabel: string;
  qrPayload: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function WalletCardPage() {
  const { publicId } = useParams<{ publicId: string }>();
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    apiFetch<CardData>(`/wallet/${publicId}`)
      .then(setCard)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [publicId]);

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#1B2F5E]">
        <div className="w-8 h-8 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      </div>
    );
  }

  if (notFound || !card) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center bg-[#1B2F5E] px-6 text-center gap-4">
        <Smartphone size={40} className="text-white/40" />
        <p className="text-white font-semibold">Carte introuvable</p>
        <p className="text-white/60 text-sm">Ce code n'est pas reconnu.</p>
      </div>
    );
  }

  const progressPct = Math.min((card.stampsBalance / card.stampsRequired) * 100, 100);

  return (
    <div className="min-h-full flex flex-col bg-[#1B2F5E]">
      {/* Header */}
      <div className="flex flex-col items-center pt-10 pb-6 px-6 text-center">
        <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-1">Primpay</p>
        <h1 className="text-white text-2xl font-bold">{card.merchantName}</h1>
        <p className="text-white/60 text-sm mt-0.5">{card.programName}</p>
      </div>

      {/* Card */}
      <div className="flex-1 bg-white rounded-t-3xl px-5 pt-6 pb-10 flex flex-col gap-5">

        {/* Customer + stamps */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">{card.firstName}</p>
            <p className="text-xs text-gray-400 font-mono">{card.publicId}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#1B2F5E]">{card.stampsBalance}</p>
            <p className="text-xs text-gray-400">/ {card.stampsRequired} tampons</p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B2F5E] rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-gray-400">0</span>
            {Array.from({ length: card.stampsRequired - 1 }, (_, i) => i + 1)
              .filter(n => n % Math.ceil(card.stampsRequired / 4) === 0)
              .map(n => (
                <span key={n} className="text-xs text-gray-300">{n}</span>
              ))}
            <span className="text-xs text-gray-400">{card.stampsRequired}</span>
          </div>
        </div>

        {/* Reward */}
        {card.rewardLabel && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <Gift size={18} className="text-amber-500 shrink-0" />
            <div>
              <p className="text-xs text-amber-600 font-medium">Récompense</p>
              <p className="text-sm text-amber-900 font-semibold">{card.rewardLabel}</p>
            </div>
          </div>
        )}

        {/* QR code */}
        {card.qrPayload ? (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <QRCode
                value={card.qrPayload}
                size={200}
                fgColor="#1B2F5E"
                bgColor="#FFFFFF"
              />
            </div>
            <p className="text-xs text-gray-400 text-center">
              Présentez ce QR code en caisse pour cumuler vos tampons
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-4">
            <Smartphone size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">QR code non disponible</p>
          </div>
        )}

        {/* Apple Wallet */}
        <a
          href={`${API_URL}/api/v1/wallet/${card.publicId}/pass.pkpass`}
          className="flex items-center justify-center gap-2 w-full rounded-2xl bg-black text-white py-3.5 text-sm font-semibold active:scale-[0.98] transition-transform"
        >
          <Download size={16} />
          Ajouter à Apple Wallet
        </a>

        <p className="text-xs text-gray-400 text-center -mt-2">
          iOS uniquement · Nécessite les certificats Apple en production
        </p>
      </div>
    </div>
  );
}
