'use client';

import { useEffect } from 'react';
import { CheckCircle, Gift, X } from 'lucide-react';

interface CreditResult {
  customerId: string;
  customerName: string;
  stampsBalance: number;
  rewardUnlocked: boolean;
  rewardLabel?: string;
}

interface Props {
  result: CreditResult;
  onClose: () => void;
}

export default function CreditConfirmModal({ result, onClose }: Props) {
  // Auto-close after 4 seconds if no reward
  useEffect(() => {
    if (result.rewardUnlocked) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [result.rewardUnlocked, onClose]);

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 pb-8 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div
          className={`px-6 py-5 flex items-center gap-4 ${
            result.rewardUnlocked ? 'bg-amber-50' : 'bg-green-50'
          }`}
        >
          {result.rewardUnlocked ? (
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Gift size={24} className="text-amber-600" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{result.customerName}</p>
            <p className={`text-sm font-medium ${result.rewardUnlocked ? 'text-amber-700' : 'text-green-700'}`}>
              {result.rewardUnlocked ? 'Récompense débloquée !' : 'Tampon crédité ✓'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-3">
          {/* Stamp progress */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Tampons</span>
              <span>{result.stampsBalance} tampons</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2.5 rounded-full transition-colors ${
                    i < result.stampsBalance ? 'bg-[#1B2F5E]' : 'bg-gray-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Reward banner */}
          {result.rewardUnlocked && result.rewardLabel && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs font-medium text-amber-800 uppercase tracking-wide mb-0.5">Offrir maintenant</p>
              <p className="text-sm text-amber-900 font-semibold">{result.rewardLabel}</p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#1B2F5E] text-white py-3 text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            {result.rewardUnlocked ? 'Récompense remise' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
}
