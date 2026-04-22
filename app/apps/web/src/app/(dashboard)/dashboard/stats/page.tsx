'use client';

import { useEffect, useState } from 'react';
import { Users, Zap, Gift, Clock } from 'lucide-react';
import { apiFetch } from '@/lib/api';

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

function StatCard({ icon: Icon, label, value, color }: { icon: typeof Users; label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h}h`;
  return `il y a ${Math.floor(h / 24)}j`;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Stats>('/merchants/me/stats')
      .then(setStats)
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

  if (!stats) {
    return <p className="text-center text-gray-400 py-16 text-sm">Impossible de charger les stats</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Vue d'ensemble</p>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Users} label="Clients inscrits" value={stats.totalCustomers} color="bg-[#1B2F5E]" />
        <StatCard icon={Zap} label="Tampons crédités" value={stats.totalEvents} color="bg-indigo-500" />
        <StatCard icon={Gift} label="Récompenses dispo" value={stats.activeRewards} color="bg-amber-500" />
      </div>

      {stats.recentEvents.length > 0 && (
        <div className="bg-white rounded-2xl overflow-hidden">
          <p className="px-4 pt-4 pb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Activité récente</p>
          <ul className="divide-y divide-gray-50">
            {stats.recentEvents.map((ev) => (
              <li key={ev.id} className="flex items-center gap-3 px-4 py-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${ev.eventType === 'CREDIT' ? 'bg-green-50' : 'bg-amber-50'}`}>
                  {ev.eventType === 'CREDIT'
                    ? <Zap size={14} className="text-green-600" />
                    : <Gift size={14} className="text-amber-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{ev.customer.firstName}</p>
                  <p className="text-xs text-gray-400">{ev.eventType === 'CREDIT' ? '+1 tampon' : 'Récompense'}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 flex items-center gap-1">
                  <Clock size={11} />
                  {timeAgo(ev.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
