'use client';

import { useState } from 'react';
import { QrCode, Search, Clock } from 'lucide-react';
import QrTab from '@/components/caisse/QrTab';
import SearchTab from '@/components/caisse/SearchTab';
import RecentTab from '@/components/caisse/RecentTab';

type Tab = 'qr' | 'search' | 'recent';

const tabs: { id: Tab; label: string; icon: typeof QrCode }[] = [
  { id: 'qr', label: 'Scanner QR', icon: QrCode },
  { id: 'search', label: 'Recherche', icon: Search },
  { id: 'recent', label: 'Récents', icon: Clock },
];

export default function CaissePage() {
  const [activeTab, setActiveTab] = useState<Tab>('qr');

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-[#1B2F5E] text-[#1B2F5E]'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'qr' && <QrTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'recent' && <RecentTab />}
      </div>
    </div>
  );
}
