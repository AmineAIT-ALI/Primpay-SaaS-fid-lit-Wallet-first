'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, Users, Gift, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

const navItems = [
  { href: '/dashboard', label: 'Caisse', icon: CreditCard },
  { href: '/customers', label: 'Clients', icon: Users },
  { href: '/loyalty', label: 'Programme', icon: Gift },
  { href: '/settings', label: 'Réglages', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, fetchMe, logout } = useAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-2 border-[#1B2F5E] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <header className="bg-[#1B2F5E] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-xs text-white/60">Primpay</p>
          <p className="text-sm font-semibold">{user.merchantName}</p>
        </div>
        <button
          onClick={() => { logout(); router.replace('/login'); }}
          className="p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
          aria-label="Se déconnecter"
        >
          <LogOut size={18} />
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* Bottom nav */}
      <nav className="bg-white border-t border-gray-100 flex-shrink-0 safe-area-inset-bottom">
        <ul className="flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={`flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors ${
                    active ? 'text-[#1B2F5E]' : 'text-gray-400'
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
