import { authStore } from '@entities/auth/model/auth.store.ts';

import { HttpClient } from '@shared/lib/HttpClient';

export const client = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
  setAuthenticated: (v) => authStore.setIsAuthenticated(v),
});
