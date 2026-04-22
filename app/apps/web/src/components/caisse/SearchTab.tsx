'use client';

import { useState, useRef } from 'react';
import { Search, UserCircle } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import CreditConfirmModal from './CreditConfirmModal';

interface CustomerResult {
  id: string;
  firstName: string;
  phone: string;
  stampsBalance: number;
}

interface CreditResult {
  customerId: string;
  customerName: string;
  stampsBalance: number;
  rewardUnlocked: boolean;
  rewardLabel?: string;
}

export default function SearchTab() {
  const [query, setQuery] = useState('');
  const [customers, setCustomers] = useState<CustomerResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [crediting, setCrediting] = useState<string | null>(null);
  const [result, setResult] = useState<CreditResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleQuery(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setCustomers([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await apiFetch<CustomerResult[]>(`/customers/search?q=${encodeURIComponent(value)}`);
        setCustomers(data);
      } catch {
        setCustomers([]);
      } finally {
        setSearching(false);
      }
    }, 350);
  }

  async function credit(customer: CustomerResult) {
    setCrediting(customer.id);
    try {
      const data = await apiFetch<CreditResult>('/loyalty/credit', {
        method: 'POST',
        body: JSON.stringify({
          source: 'MANUAL_SEARCH_CREDIT',
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
    setQuery('');
    setCustomers([]);
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Search bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQuery(e.target.value)}
            placeholder="Nom ou téléphone du client..."
            className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E] focus:border-transparent"
            autoFocus
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {searching && (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 rounded-full border-2 border-[#1B2F5E] border-t-transparent animate-spin" />
          </div>
        )}

        {!searching && customers.length === 0 && query.trim() && (
          <p className="text-center text-gray-400 text-sm py-8">Aucun client trouvé</p>
        )}

        {!searching && customers.length === 0 && !query.trim() && (
          <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
            <Search size={32} strokeWidth={1} />
            <p className="text-sm">Recherchez un client</p>
          </div>
        )}

        <ul className="divide-y divide-gray-100">
          {customers.map((c) => (
            <li key={c.id} className="bg-white flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-[#1B2F5E]/10 flex items-center justify-center flex-shrink-0">
                <UserCircle size={20} className="text-[#1B2F5E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{c.firstName}</p>
                <p className="text-xs text-gray-500">{c.phone} · {c.stampsBalance} tampon{c.stampsBalance > 1 ? 's' : ''}</p>
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
      </div>

      {result && <CreditConfirmModal result={result} onClose={handleClose} />}
    </div>
  );
}
