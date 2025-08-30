import { client } from '@shared/api/client.ts';

export const fetchGetAuth = (formData: FormData) => {
  return client.get('auth', { params: Object.fromEntries(formData) });
};
