import { Outlet, type RouteObject, redirect } from 'react-router-dom';

import { authStore } from '@entities/auth/model/auth.store.ts';

export const privateLoader: RouteObject['loader'] = async () => {
  await authStore.checkAuth();
  console.log('hui', authStore.isAuthenticated);
  if (!authStore.isAuthenticated) return redirect('/login');
  console.log('hui2', authStore.isAuthenticated);

  return <Outlet />;
};
