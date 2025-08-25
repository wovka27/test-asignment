import type { RouteObject } from 'react-router-dom';

export type ExtendedRouteObject = RouteObject & {
  meta?: {
    title?: string;
    requiresAuth?: boolean;
  };
};
