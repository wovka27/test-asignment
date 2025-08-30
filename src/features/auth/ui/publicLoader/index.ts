import { type RouteObject, redirect } from 'react-router-dom';

import { authStore } from '@entities/auth/model/auth.store.ts';

export const publicLoader: RouteObject['loader'] = async () => {
  await authStore.checkAuth();

  if (authStore.isAuthenticated) return redirect('/');

  return null;
};
