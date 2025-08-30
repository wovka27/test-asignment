import type { RouteObject } from 'react-router-dom';

import LayoutWrapper from '@app/layouts/wrapper';
import { authorizedRoutes } from '@app/providers/router/routes/authorized-routes';
import { unauthorizedRoutes } from '@app/providers/router/routes/unauthorized-routes';

import NotFoundPage from '@pages/NotFoundPage';

const notFoundRouteParams = {
  element: <NotFoundPage />,
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
    ],
  },
];

export default routes;
