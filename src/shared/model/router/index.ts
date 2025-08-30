import type { RouteObject } from 'react-router-dom';

export type ExtendedRouteObject = Omit<RouteObject, 'children'> & {
  children?: ExtendedRouteObject[];
  meta?: {
    layout?: string;
    title?: string;
    requiresAuth?: boolean;
  };
};
