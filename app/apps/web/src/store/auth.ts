import { create } from 'zustand';
import { apiFetch, setAccessToken, getAccessToken } from '@/lib/api';

export interface StaffUser {
  id: string;
  email: string;
  role: 'OWNER' | 'STAFF';
  merchantId: string;
  merchantName: string;
}

interface AuthState {
  user: StaffUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface MerchantMe {
  id: string;
  name: string;
}

function decodeJwt(token: string): { sub: string; email: string; merchantId: string; role: string } {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchMe: async () => {
    const token = getAccessToken();
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const payload = decodeJwt(token);
      // Check token not expired
      const exp = (payload as unknown as { exp: number }).exp;
      if (exp && Date.now() / 1000 > exp) {
        setAccessToken(null);
        set({ user: null, loading: false });
        return;
      }
      const merchant = await apiFetch<MerchantMe>('/merchants/me');
      set({
        user: {
          id: payload.sub,
          email: payload.email,
          role: payload.role as 'OWNER' | 'STAFF',
          merchantId: payload.merchantId,
          merchantName: merchant.name,
        },
        loading: false,
      });
    } catch {
      setAccessToken(null);
      set({ user: null, loading: false });
    }
  },

  login: async (email: string, password: string) => {
    const res = await apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(res.accessToken);
    const payload = decodeJwt(res.accessToken);
    const merchant = await apiFetch<MerchantMe>('/merchants/me');
    set({
      user: {
        id: payload.sub,
        email: payload.email,
        role: payload.role as 'OWNER' | 'STAFF',
        merchantId: payload.merchantId,
        merchantName: merchant.name,
      },
    });
  },

  logout: () => {
    setAccessToken(null);
    set({ user: null });
  },
}));
