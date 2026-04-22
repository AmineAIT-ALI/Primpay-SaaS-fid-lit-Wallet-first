'use client';

import { useState } from 'react';
import { Smartphone, CheckCircle } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface Customer {
  id: string;
  firstName: string;
  publicId: string;
}

type Step = 'form' | 'success';

export default function WalletAddPage() {
  const [step, setStep] = useState<Step>('form');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);

  async function handleSubmit(e: React.FormEvent) {
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
      setStep('success');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message.includes('Phone already') ? 'Ce numéro est déjà inscrit.' : err.message
          : 'Une erreur est survenue.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-full flex flex-col bg-[#1B2F5E]">
      {/* Hero */}
      <div className="flex flex-col items-center pt-12 pb-8 px-6">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
          <Smartphone size={28} className="text-white" />
        </div>
        <h1 className="text-white text-xl font-bold text-center">Carte de fidélité digitale</h1>
        <p className="text-white/60 text-sm text-center mt-1">
          Inscrivez-vous pour cumuler vos tampons et gagner des récompenses
        </p>
      </div>

      {/* Card */}
      <div className="flex-1 bg-gray-50 rounded-t-3xl px-4 pt-6 pb-10">
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alice@email.fr"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#1B2F5E] text-white py-3.5 text-sm font-semibold disabled:opacity-50 active:scale-[0.98] transition-transform mt-2"
            >
              {submitting ? 'Inscription...' : "M'inscrire"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Vos données ne sont utilisées que pour votre carte de fidélité.
            </p>
          </form>
        )}

        {step === 'success' && customer && (
          <div className="flex flex-col items-center gap-5 pt-6 max-w-sm mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-500" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">Bienvenue, {customer.firstName} !</h2>
              <p className="text-sm text-gray-500 mt-1">Votre carte de fidélité est activée</p>
            </div>

            <div className="w-full bg-white rounded-2xl p-5 space-y-3 border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Votre code client</p>
              <p className="text-3xl font-bold text-[#1B2F5E] tracking-widest">{customer.publicId}</p>
              <p className="text-xs text-gray-400">
                Communiquez ce code en caisse pour cumuler vos tampons
              </p>
            </div>

            <div className="w-full bg-[#1B2F5E]/5 rounded-2xl p-4 text-left space-y-2">
              <p className="text-sm font-semibold text-[#1B2F5E]">Comment ça marche ?</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#1B2F5E] font-bold shrink-0">1.</span>
                  À chaque visite, donnez votre code en caisse
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B2F5E] font-bold shrink-0">2.</span>
                  Cumulez des tampons automatiquement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B2F5E] font-bold shrink-0">3.</span>
                  Débloquez votre récompense
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
