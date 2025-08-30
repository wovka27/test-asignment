import type { RouteObject } from 'react-router-dom';

import CompanyDetailPage from '@pages/CompanyDetailPage';
import CompanyDetailsPage from '@pages/CompanyDetailsPage';
import { MainPage } from '@pages/MainPage';
import SettingsPage from '@pages/SettingsPage';

import { privateLoader } from '@features/auth/ui/privateLoader';
import { detailsLoader } from '@entities/entityDetails/api/detailsLoader.ts';

const routes: RouteObject[] = [
  {
    path: '',
    Component: MainPage,
    loader: privateLoader,
    handle: {
      layout: 'main',
      hideMenu: true,
    },
  },
  {
    path: '/settings',
    Component: SettingsPage,
    loader: privateLoader,
    handle: {
      layout: 'main',
      hideMenu: true,
      isSelectedInMenu: true,
    },
  },
  {
    loader: privateLoader,
    children: [
      {
        path: 'companies',
        Component: CompanyDetailPage,
        handle: {
          layout: 'main',
          entity_type: 'organization',
        },
      },
      {
        path: 'companies/:id',
        Component: CompanyDetailsPage,
        loader: detailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'organization',
        },
      },
      {
        path: 'contractors',
        Component: CompanyDetailPage,
        handle: {
          layout: 'main',
          entity_type: 'contractor',
        },
      },
      {
        path: 'contractors/:id',
        Component: CompanyDetailsPage,
        loader: detailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'contractor',
        },
      },
      {
        path: 'clients',
        Component: CompanyDetailPage,
        loader: privateLoader,
        handle: {
          layout: 'main',
          entity_type: 'client',
        },
      },
      {
        path: 'clients/:id',
        Component: CompanyDetailsPage,
        loader: detailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'client',
        },
      },
    ],
  },
];

export const authorizedRoutes: typeof routes = routes;
