'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Building2, CreditCard, Users, ChevronRight, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { apiFetch } from '@/lib/api';

interface MerchantData {
  name: string;
  slug: string;
  status: string;
  locations: { name: string; address: string; city: string }[];
  subscription: {
    planCode: string;
    status: string;
    currentPeriodEnd: string;
  } | null;
}

const planLabel: Record<string, string> = {
  SOLO_29: 'Solo — 29€/mois',
  MULTI_79: 'Multi-sites — 79€/mois',
  ENTERPRISE: 'Enterprise',
};

const statusLabel: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Actif', color: 'text-green-600 bg-green-50' },
  TRIALING: { label: 'Essai gratuit', color: 'text-blue-600 bg-blue-50' },
  PAST_DUE: { label: 'Paiement en retard', color: 'text-red-600 bg-red-50' },
  CANCELED: { label: 'Annulé', color: 'text-gray-600 bg-gray-100' },
};

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [merchant, setMerchant] = useState<MerchantData | null>(null);

  useEffect(() => {
    apiFetch<MerchantData>('/merchants/me').then(setMerchant).catch(() => null);
  }, []);

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  const sub = merchant?.subscription;
  const subStatus = sub ? statusLabel[sub.status] : null;

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 space-y-4">

        {/* Account */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-50">
            <div className="w-11 h-11 rounded-full bg-[#1B2F5E] flex items-center justify-center text-white font-bold text-base shrink-0">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
              <p className="text-xs text-gray-400">
                {user?.role === 'OWNER' ? 'Propriétaire' : 'Employé'}
              </p>
            </div>
          </div>
        </div>

        {/* Merchant */}
        {merchant && (
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <Building2 size={15} className="text-gray-400" />
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Établissement</p>
            </div>
            <div className="px-4 pb-4 space-y-2 border-b border-gray-50">
              <p className="text-sm font-semibold text-gray-900">{merchant.name}</p>
              {merchant.locations[0] && (
                <p className="text-xs text-gray-500">
                  {merchant.locations[0].address}, {merchant.locations[0].city}
                </p>
              )}
              <div className="flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${merchant.status === 'ACTIVE' || merchant.status === 'TRIAL' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  <CheckCircle size={10} />
                  {merchant.status === 'TRIAL' ? 'Période d\'essai' : merchant.status}
                </span>
              </div>
            </div>

            {/* Subscription */}
            {sub && (
              <div className="px-4 py-3 flex items-center gap-3">
                <CreditCard size={16} className="text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium">
                    {planLabel[sub.planCode] ?? sub.planCode}
                  </p>
                  {sub.currentPeriodEnd && (
                    <p className="text-xs text-gray-400">
                      {sub.status === 'TRIALING' ? 'Essai jusqu\'au' : 'Renouvellement le'}{' '}
                      {new Date(sub.currentPeriodEnd).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
                {subStatus && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${subStatus.color}`}>
                    {subStatus.label}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* App info */}
        <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-50">
          <div className="flex items-center gap-3 px-4 py-3">
            <Users size={16} className="text-gray-400 shrink-0" />
            <p className="text-sm text-gray-700 flex-1">Version</p>
            <span className="text-xs text-gray-400">MVP 0.1</span>
          </div>
          <button
            onClick={() => router.push('/customers')}
            className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50"
          >
            <Users size={16} className="text-gray-400 shrink-0" />
            <p className="text-sm text-gray-700 flex-1 text-left">Gérer les clients</p>
            <ChevronRight size={15} className="text-gray-300" />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 text-red-500 active:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Se déconnecter</span>
        </button>

      </div>
    </div>
  );
}
