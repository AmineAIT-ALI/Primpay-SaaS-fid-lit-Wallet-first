'use client';

import { useState } from 'react';
import { QrCode, Search, Clock, UserPlus } from 'lucide-react';
import QrTab from '@/components/caisse/QrTab';
import SearchTab from '@/components/caisse/SearchTab';
import RecentTab from '@/components/caisse/RecentTab';
import NewCustomerModal from '@/components/caisse/NewCustomerModal';
import CreditConfirmModal from '@/components/caisse/CreditConfirmModal';

type Tab = 'qr' | 'search' | 'recent';

const tabs: { id: Tab; label: string; icon: typeof QrCode }[] = [
  { id: 'qr', label: 'Scanner QR', icon: QrCode },
  { id: 'search', label: 'Recherche', icon: Search },
  { id: 'recent', label: 'Récents', icon: Clock },
];

interface CreditResult {
  customerId: string;
  customerName: string;
  stampsBalance: number;
  rewardUnlocked: boolean;
  rewardLabel?: string;
}

export default function CaissePage() {
  const [activeTab, setActiveTab] = useState<Tab>('qr');
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [postSignupCredit, setPostSignupCredit] = useState<CreditResult | null>(null);

  function handleCreated(result: CreditResult) {
    setShowNewCustomer(false);
    setPostSignupCredit(result);
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Tab bar */}
      <div className="bg-white border-b border-gray-100 shrink-0">
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
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'qr' && <QrTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'recent' && <RecentTab />}

        {/* FAB — nouveau client */}
        <button
          onClick={() => setShowNewCustomer(true)}
          className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#1B2F5E] text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform z-20"
          aria-label="Nouveau client"
        >
          <UserPlus size={20} />
        </button>
      </div>

      {/* Modals */}
      {showNewCustomer && (
        <NewCustomerModal
          onClose={() => setShowNewCustomer(false)}
          onCreated={handleCreated}
        />
      )}

      {postSignupCredit && (
        <CreditConfirmModal
          result={postSignupCredit}
          onClose={() => setPostSignupCredit(null)}
        />
      )}
    </div>
  );
}
