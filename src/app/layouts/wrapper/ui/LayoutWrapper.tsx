import { lazy } from 'react';

import { type RouteObject, useMatches } from 'react-router-dom';

import type { LayoutType } from '@app/layouts/model';

const layoutMap: Record<LayoutType, React.LazyExoticComponent<() => React.JSX.Element>> = {
  main: lazy(() => import('@app/layouts/main')),
  auth: lazy(() => import('@app/layouts/auth')),
};

export const LayoutWrapper = () => {
  const routes = useMatches();

  const layout = routes.at(-1) as RouteObject & { handle?: { layout: LayoutType } };
  const Component = layoutMap[layout?.handle.layout as LayoutType];

  return <Component />;
};
