'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserCircle, Clock } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import CreditConfirmModal from './CreditConfirmModal';

interface RecentCustomer {
  id: string;
  firstName: string;
  phone: string;
  stampsBalance: number;
  lastVisitAt: string;
}

interface CreditResult {
  customerId: string;
  customerName: string;
  stampsBalance: number;
  rewardUnlocked: boolean;
  rewardLabel?: string;
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

export default function RecentTab() {
  const [customers, setCustomers] = useState<RecentCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [crediting, setCrediting] = useState<string | null>(null);
  const [result, setResult] = useState<CreditResult | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<RecentCustomer[]>('/customers/recent');
      setCustomers(data);
    } catch {
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function credit(customer: RecentCustomer) {
    setCrediting(customer.id);
    try {
      const data = await apiFetch<CreditResult>('/loyalty/credit', {
        method: 'POST',
        body: JSON.stringify({
          source: 'QUICK_ADD_RECENT_CUSTOMER',
          customerId: customer.id,
        }),
      });
      setResult(data);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Erreur lors du crédit');
    } finally {
      setCrediting(null);
    }
  }

  function handleClose() {
    setResult(null);
    load();
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 rounded-full border-2 border-[#1B2F5E] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
        <Clock size={32} strokeWidth={1} />
        <p className="text-sm">Aucun client récent</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <p className="px-4 py-2 text-xs text-gray-400 bg-white border-b border-gray-100">
        Derniers clients crédités
      </p>
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {customers.map((c) => (
          <li key={c.id} className="bg-white flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-[#1B2F5E]/10 flex items-center justify-center flex-shrink-0">
              <UserCircle size={20} className="text-[#1B2F5E]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{c.firstName}</p>
              <p className="text-xs text-gray-500">{formatRelative(c.lastVisitAt)} · {c.stampsBalance} tampon{c.stampsBalance > 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={() => credit(c)}
              disabled={crediting === c.id}
              className="rounded-lg bg-[#1B2F5E] text-white px-4 py-2 text-xs font-semibold disabled:opacity-50 active:scale-95 transition-transform flex-shrink-0"
            >
              {crediting === c.id ? '...' : '+1'}
            </button>
          </li>
        ))}
      </ul>

      {result && <CreditConfirmModal result={result} onClose={handleClose} />}
    </div>
  );
}
