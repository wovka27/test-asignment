import { lazy } from 'react';

import type { LayoutType } from '@app/layouts/model';
import { useCurrentRoute } from '@app/providers/router/lib/hooks/useCurrentRoute.ts';

const layoutMap: Record<LayoutType, React.LazyExoticComponent<() => React.JSX.Element>> = {
  main: lazy(() => import('@app/layouts/main')),
  auth: lazy(() => import('@app/layouts/auth')),
};

export const LayoutWrapper = () => {
  const route = useCurrentRoute<object, { layout: string }>();

  const layout = route?.handle.layout;
  const Component = layoutMap[layout as LayoutType];

  return <Component />;
};
