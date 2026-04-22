'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, Gift, Zap, Clock, CheckCircle } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import CreditConfirmModal from '@/components/caisse/CreditConfirmModal';

interface LoyaltyAccount {
  stampsBalance: number;
  pointsBalance: number;
  totalEarned: number;
  totalRedeemed: number;
  lastActivityAt: string | null;
  loyaltyProgram: { name: string; rulesJson: { stampsRequired?: number } };
}

interface Reward {
  id: string;
  rewardType: string;
  rewardValue: string;
  status: string;
  expiresAt: string;
}

interface Event {
  id: string;
  eventType: string;
  stampsDelta: number;
  createdAt: string;
  source: string;
}

interface CustomerDetail {
  id: string;
  firstName: string;
  phone: string;
  email?: string;
  publicId: string;
}

interface AccountData {
  account: LoyaltyAccount;
  availableRewards: Reward[];
  recentEvents: Event[];
}

interface CreditResult {
  customerId: string;
  customerName: string;
  stampsBalance: number;
  rewardUnlocked: boolean;
  rewardLabel?: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h}h`;
  return `il y a ${Math.floor(h / 24)}j`;
}

const sourceLabel: Record<string, string> = {
  QR_SCAN: 'QR scan',
  MANUAL_SEARCH_CREDIT: 'Recherche',
  QUICK_ADD_RECENT_CUSTOMER: 'Récents',
};

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [crediting, setCrediting] = useState(false);
  const [creditResult, setCreditResult] = useState<CreditResult | null>(null);

  const load = () =>
    Promise.all([
      apiFetch<CustomerDetail>(`/customers/${id}`),
      apiFetch<AccountData>(`/loyalty/customers/${id}/account`),
    ])
      .then(([c, a]) => { setCustomer(c); setAccountData(a); })
      .catch(() => null)
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, [id]);

  async function handleCredit() {
    setCrediting(true);
    try {
      const result = await apiFetch<CreditResult>('/loyalty/credit', {
        method: 'POST',
        body: JSON.stringify({ source: 'MANUAL_SEARCH_CREDIT', customerId: id }),
      });
      setCreditResult(result);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setCrediting(false);
    }
  }

  function handleCreditClose() {
    setCreditResult(null);
    setLoading(true);
    load();
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-7 h-7 rounded-full border-2 border-[#1B2F5E] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!customer || !accountData) {
    return <p className="text-center text-gray-400 py-16 text-sm">Client introuvable</p>;
  }

  const { account, availableRewards, recentEvents } = accountData;
  const threshold = account.loyaltyProgram.rulesJson.stampsRequired ?? 10;
  const stamps = account.stampsBalance;

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100 shrink-0 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1 -ml-1 text-gray-500">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900">{customer.firstName}</p>
          <p className="text-xs text-gray-400">{customer.publicId}</p>
        </div>
        <button
          onClick={handleCredit}
          disabled={crediting}
          className="rounded-xl bg-[#1B2F5E] text-white px-4 py-2 text-sm font-semibold disabled:opacity-50 active:scale-95 transition-transform shrink-0"
        >
          {crediting ? '...' : '+1 tampon'}
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Contact */}
        <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3">
          <Phone size={16} className="text-gray-400" />
          <p className="text-sm text-gray-700">{customer.phone}</p>
        </div>

        {/* Stamp card */}
        <div className="bg-white rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-baseline">
            <p className="text-sm font-medium text-gray-700">Tampons</p>
            <p className="text-xs text-gray-400">{stamps} / {threshold}</p>
          </div>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${threshold}, 1fr)` }}>
            {Array.from({ length: threshold }).map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded-full ${i < stamps ? 'bg-[#1B2F5E]' : 'bg-gray-100'}`}
              />
            ))}
          </div>
          <div className="flex gap-4 pt-1 text-xs text-gray-500">
            <span>Total crédités : <strong className="text-gray-800">{account.totalEarned}</strong></span>
            <span>Récompenses : <strong className="text-gray-800">{account.totalRedeemed}</strong></span>
          </div>
        </div>

        {/* Available rewards */}
        {availableRewards.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Gift size={16} className="text-amber-600" />
              <p className="text-sm font-semibold text-amber-800">
                {availableRewards.length} récompense{availableRewards.length > 1 ? 's' : ''} disponible{availableRewards.length > 1 ? 's' : ''}
              </p>
            </div>
            {availableRewards.map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-amber-600 shrink-0" />
                <p className="text-sm text-amber-900">{r.rewardValue}</p>
              </div>
            ))}
          </div>
        )}

        {/* Activity */}
        {recentEvents.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden">
            <p className="px-4 pt-4 pb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Historique</p>
            <ul className="divide-y divide-gray-50">
              {recentEvents.map((ev) => (
                <li key={ev.id} className="flex items-center gap-3 px-4 py-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ev.eventType === 'CREDIT' ? 'bg-green-50' : 'bg-amber-50'}`}>
                    {ev.eventType === 'CREDIT'
                      ? <Zap size={13} className="text-green-600" />
                      : <Gift size={13} className="text-amber-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {ev.eventType === 'CREDIT'
                        ? `+${ev.stampsDelta} tampon`
                        : 'Récompense utilisée'}
                    </p>
                    <p className="text-xs text-gray-400">{sourceLabel[ev.source] ?? ev.source}</p>
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

      {creditResult && (
        <CreditConfirmModal result={creditResult} onClose={handleCreditClose} />
      )}
    </div>
  );
}
