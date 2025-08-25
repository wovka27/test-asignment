import { HttpClient } from '@shared/lib/HttpClient';

export const client = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
});
