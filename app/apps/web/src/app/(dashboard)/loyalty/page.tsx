'use client';

import { useEffect, useState } from 'react';
import { Gift, Users, Zap, Trophy, Clock } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface MerchantData {
  name: string;
  loyaltyPrograms: {
    id: string;
    name: string;
    type: string;
    status: string;
    rulesJson: { stampsRequired?: number; pointsRequired?: number };
    rewardPolicyJson: { label: string; value: string };
  }[];
}

interface Stats {
  totalCustomers: number;
  totalEvents: number;
  activeRewards: number;
  recentEvents: {
    id: string;
    eventType: string;
    createdAt: string;
    customer: { firstName: string; publicId: string };
  }[];
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}j`;
}

export default function LoyaltyPage() {
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<MerchantData>('/merchants/me'),
      apiFetch<Stats>('/merchants/me/stats'),
    ])
      .then(([m, s]) => { setMerchant(m); setStats(s); })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-7 h-7 rounded-full border-2 border-[#1B2F5E] border-t-transparent animate-spin" />
      </div>
    );
  }

  const program = merchant?.loyaltyPrograms[0];
  const threshold = program?.rulesJson.stampsRequired ?? 10;

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 space-y-4">

        {/* Stats row */}
        {stats && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Users, label: 'Clients', value: stats.totalCustomers, color: 'text-[#1B2F5E] bg-[#1B2F5E]/10' },
              { icon: Zap, label: 'Tampons', value: stats.totalEvents, color: 'text-indigo-600 bg-indigo-50' },
              { icon: Gift, label: 'Récompenses', value: stats.activeRewards, color: 'text-amber-600 bg-amber-50' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="text-lg font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Program card */}
        {program && (
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[#1B2F5E]" />
              <p className="text-sm font-semibold text-gray-900">{program.name}</p>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${program.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {program.status === 'ACTIVE' ? 'Actif' : program.status}
              </span>
            </div>

            <div className="border-t border-gray-50 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <span className="font-medium text-gray-800">
                  {program.type === 'STAMPS' ? 'Carte à tampons' : 'Points'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Seuil récompense</span>
                <span className="font-medium text-gray-800">{threshold} tampons</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Récompense</span>
                <span className="font-medium text-gray-800 text-right max-w-[180px] truncate">
                  {program.rewardPolicyJson.value}
                </span>
              </div>
            </div>

            {/* Stamp preview */}
            <div className="border-t border-gray-50 pt-3">
              <p className="text-xs text-gray-400 mb-2">Aperçu carte</p>
              <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(threshold, 10)}, 1fr)` }}>
                {Array.from({ length: Math.min(threshold, 10) }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 rounded-full ${i < Math.floor(threshold * 0.4) ? 'bg-[#1B2F5E]' : 'bg-gray-100'}`}
                  />
                ))}
              </div>
              {threshold > 10 && (
                <p className="text-xs text-gray-400 mt-1">(aperçu des 10 premiers)</p>
              )}
            </div>
          </div>
        )}

        {/* Recent activity */}
        {stats && stats.recentEvents.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden">
            <p className="px-4 pt-4 pb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
              Activité récente
            </p>
            <ul className="divide-y divide-gray-50">
              {stats.recentEvents.map((ev) => (
                <li key={ev.id} className="flex items-center gap-3 px-4 py-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ev.eventType === 'CREDIT' ? 'bg-green-50' : 'bg-amber-50'}`}>
                    {ev.eventType === 'CREDIT'
                      ? <Zap size={13} className="text-green-600" />
                      : <Gift size={13} className="text-amber-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{ev.customer.firstName}</p>
                    <p className="text-xs text-gray-400">
                      {ev.eventType === 'CREDIT' ? '+1 tampon' : 'Récompense utilisée'}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 flex items-center gap-1">
                    <Clock size={11} />
                    {timeAgo(ev.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
