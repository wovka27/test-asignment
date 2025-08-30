import type { RouteObject } from 'react-router-dom';

import AuthPage from '@pages/AuthPage';
import { publicLoader } from '@features/auth/ui/publicLoader';

const routes: RouteObject[] = [
  {
    path: '/login',
    loader: publicLoader,
    element: <AuthPage />,
    handle: {
      layout: 'auth',
    },
  },
];

export const unauthorizedRoutes: typeof routes = routes;
