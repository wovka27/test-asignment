import type { RouteObject } from 'react-router-dom';

import CompanyDetailsPage from '@pages/CompanyDetailsPage';
import { MainPage } from '@pages/MainPage';
import SettingsPage from '@pages/SettingsPage';
import { settingDetailsLoader } from '@pages/SettingsPage/api/settingDetailsLoader.ts';

import { privateLoader } from '@features/auth/ui/privateLoader';
import EntityList from '@features/entity-list';

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
    loader: settingDetailsLoader,
    handle: {
      layout: 'main',
      hideMenu: true,
      isSelectedInMenu: true,
      menuParent: '/settings'
    },
  },
  {
    loader: privateLoader,
    children: [
      {
        path: 'companies',
        Component: EntityList,
        handle: {
          layout: 'main',
          entity_type: 'organization',
          menuParent: '/companies',
        },
      },
      {
        path: 'companies/:id',
        Component: CompanyDetailsPage,
        loader: detailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'organization',
          menuParent: '/companies',
        },
      },
      {
        path: 'contractors',
        Component: EntityList,
        handle: {
          layout: 'main',
          entity_type: 'contractor',
          menuParent: '/companies',
        },
      },
      {
        path: 'contractors/:id',
        Component: CompanyDetailsPage,
        loader: detailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'contractor',
          menuParent: '/companies',
        },
      },
      {
        path: 'clients',
        Component: EntityList,
        handle: {
          layout: 'main',
          entity_type: 'client',
          menuParent: '/companies',
        },
      },
      {
        path: 'clients/:id',
        Component: CompanyDetailsPage,
        loader: detailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'client',
          menuParent: '/companies',
        },
      },
    ],
  },
];

export const authorizedRoutes: typeof routes = routes;
