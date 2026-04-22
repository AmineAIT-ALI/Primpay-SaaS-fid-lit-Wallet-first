'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Search, UserCircle, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

interface Customer {
  id: string;
  firstName: string;
  phone: string;
  stampsBalance: number;
}

export default function CustomersPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Customer[]>([]);
  const [recent, setRecent] = useState<Customer[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    apiFetch<Customer[]>('/customers/recent')
      .then(setRecent)
      .catch(() => null);
  }, []);

  const search = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) { setResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await apiFetch<Customer[]>(`/customers/search?q=${encodeURIComponent(value)}`);
        setResults(data);
      } catch { setResults([]); }
      finally { setSearching(false); }
    }, 300);
  }, []);

  const list = query.trim() ? results : recent;
  const emptyMsg = query.trim() ? 'Aucun client trouvé' : 'Aucun client récent';

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Search bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 shrink-0">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Rechercher par nom ou téléphone..."
            className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E] focus:border-transparent"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {searching && (
          <div className="flex justify-center py-10">
            <div className="w-5 h-5 rounded-full border-2 border-[#1B2F5E] border-t-transparent animate-spin" />
          </div>
        )}

        {!searching && list.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
            <Users size={36} strokeWidth={1} />
            <p className="text-sm">{emptyMsg}</p>
          </div>
        )}

        {!searching && !query && recent.length > 0 && (
          <p className="px-4 pt-3 pb-1 text-xs text-gray-400 font-medium uppercase tracking-wide">Récents</p>
        )}

        <ul className="divide-y divide-gray-100">
          {list.map((c) => (
            <li key={c.id}>
              <Link
                href={`/customers/${c.id}`}
                className="bg-white flex items-center gap-3 px-4 py-3 active:bg-gray-50"
              >
                <div className="w-10 h-10 rounded-full bg-[#1B2F5E]/10 flex items-center justify-center shrink-0">
                  <UserCircle size={20} className="text-[#1B2F5E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.firstName}</p>
                  <p className="text-xs text-gray-500">{c.phone} · {c.stampsBalance} tampon{c.stampsBalance > 1 ? 's' : ''}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
