import { client } from '@shared/api/client.ts';

export const fetchGetAuth = (params: { user: string }) => {
  return client.get('auth', { params });
};
