import type { RouteObject } from 'react-router-dom';

import LayoutWrapper from '@app/layouts/wrapper';
import { authorizedRoutes } from '@app/providers/router/routes/authorized-routes';
import { unauthorizedRoutes } from '@app/providers/router/routes/unauthorized-routes';

import NetWorkErrorPage from '@pages/NetWorkErrorPage';
import NotFoundPage from '@pages/NotFoundPage';
import { privateLoader } from '@features/auth/ui/privateLoader';

const notFoundRouteParams = {
  element: <NotFoundPage />,
  loader: privateLoader,
  handle: {
    layout: 'main',
    hideMenu: true,
  },
};

const routes: RouteObject[] = [
  {
    id: 'main',
    element: <LayoutWrapper />,
    children: [
      ...authorizedRoutes,
      ...unauthorizedRoutes,
      {
        path: '*',
        ...notFoundRouteParams,
      },
      {
        path: '404',
        ...notFoundRouteParams,
      },
      {
        path: '/network-error',
        element: <NetWorkErrorPage />,
        handle: {
          layout: 'main',
          hideMenu: true,
        },
      },
    ],
  },
];

export default routes;
