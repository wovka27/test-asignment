import { MainPage } from '@pages/MainPage';

import type { ExtendedRouteObject } from '@shared/model/router';

const routes: ExtendedRouteObject[] = [
  {
    path: '',
    Component: MainPage,
    meta: {},
  },
];

export const authorizedRoutes: typeof routes = routes;
