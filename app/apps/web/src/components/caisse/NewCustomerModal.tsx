'use client';

import { useState } from 'react';
import { X, UserPlus, CheckCircle } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface Customer {
  id: string;
  firstName: string;
  phone: string;
  publicId: string;
}

interface CreditResult {
  customerId: string;
  customerName: string;
  stampsBalance: number;
  rewardUnlocked: boolean;
  rewardLabel?: string;
}

interface Props {
  onClose: () => void;
  onCreated: (result: CreditResult) => void;
}

type Step = 'form' | 'created';

export default function NewCustomerModal({ onClose, onCreated }: Props) {
  const [step, setStep] = useState<Step>('form');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [crediting, setCrediting] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const created = await apiFetch<Customer>('/customers', {
        method: 'POST',
        body: JSON.stringify({
          firstName: firstName.trim(),
          phone: phone.trim(),
          ...(email.trim() ? { email: email.trim() } : {}),
        }),
      });
      setCustomer(created);
      setStep('created');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreditNow() {
    if (!customer) return;
    setCrediting(true);
    try {
      const result = await apiFetch<CreditResult>('/loyalty/credit', {
        method: 'POST',
        body: JSON.stringify({
          source: 'MANUAL_SEARCH_CREDIT',
          customerId: customer.id,
        }),
      });
      onCreated(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors du crédit');
      setCrediting(false);
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-sm bg-white rounded-t-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <UserPlus size={20} className="text-[#1B2F5E]" />
            <h2 className="text-base font-semibold text-gray-900">Nouveau client</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Step: form */}
        {step === 'form' && (
          <form onSubmit={handleCreate} className="px-5 pb-8 space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                autoFocus
                autoComplete="off"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Alice"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33600000000"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <input
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alice@email.fr"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#1B2F5E] text-white py-3 text-sm font-semibold disabled:opacity-50 active:scale-[0.98] transition-transform mt-2"
            >
              {submitting ? 'Création...' : 'Créer le client'}
            </button>
          </form>
        )}

        {/* Step: created — offer immediate credit */}
        {step === 'created' && customer && (
          <div className="px-5 pb-8 space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800">{customer.firstName} créé(e) ✓</p>
                <p className="text-xs text-green-700">Code : {customer.publicId}</p>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
                {error}
              </div>
            )}

            <p className="text-sm text-gray-600 text-center">
              Créditer le premier tampon maintenant ?
            </p>

            <button
              onClick={handleCreditNow}
              disabled={crediting}
              className="w-full rounded-xl bg-[#1B2F5E] text-white py-3 text-sm font-semibold disabled:opacity-50 active:scale-[0.98] transition-transform"
            >
              {crediting ? 'Crédit en cours...' : '+1 tampon maintenant'}
            </button>

            <button
              onClick={onClose}
              className="w-full rounded-xl border border-gray-200 text-gray-600 py-3 text-sm font-medium active:scale-[0.98] transition-transform"
            >
              Plus tard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
