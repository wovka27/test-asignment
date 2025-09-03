import type { RouteObject } from 'react-router-dom';

import ClientDetailsPage from '@pages/ClientDetailsPage';
import ClientListPage from '@pages/ClientListPage';
import CompanyDetailsPage from '@pages/CompanyDetailsPage';
import CompanyListPage from '@pages/CompanyListPage';
import ContractDetailsPage from '@pages/ContractDetailsPage';
import ContractListPage from '@pages/ContractListPage';
import { MainPage } from '@pages/MainPage';
import SettingsPage from '@pages/SettingsPage';
import { settingDetailsLoader } from '@pages/SettingsPage/api/settingDetailsLoader.ts';

import { privateLoader } from '@features/auth/ui/privateLoader';
import { clientListLoader } from '@features/client-list/api/clientListLoader.ts';
import { companyListLoader } from '@features/company-list/api/companyListLoader.ts';
import { contractListLoader } from '@features/contract-list/api/contractListLoader.ts';

import { clientDetailsLoader } from '@entities/clients/api/clientDetailsLoader.ts';
import { contractDetailsLoader } from '@entities/contracts/api/contractDetailsLoader.ts';
import { companyDetailsLoader } from '@entities/companies/api/companyDetailsLoader.ts';
import { SearchPage } from '@pages/SearchPage/ui/SearchPage.tsx';
import { searchLoader } from '@pages/SearchPage/api/searchLoader.ts';

const routes: RouteObject[] = [
  {
    path: '/',
    loader: privateLoader,
    handle: {
      layout: 'main',
    },
    children: [
      {
        path: 'search',
        Component: SearchPage,
        loader: searchLoader,
        handle: {
          layout: 'main',
          hideMenu: true,
        },
      },
      {
        path: '/',
        Component: MainPage,
        handle: {
          layout: 'main',
          hideMenu: true,
        },
      },
      {
        path: 'settings',
        Component: SettingsPage,
        loader: settingDetailsLoader,
        handle: {
          layout: 'main',
          hideMenu: true,
          isSelectedInMenu: true,
          menuParent: '/settings',
        },
      },
      {
        path: 'companies',
        Component: CompanyListPage,
        loader: companyListLoader,
        handle: {
          layout: 'main',
          entity_type: 'organization',
          menuParent: '/companies',
        },
      },
      {
        path: 'companies/:id',
        Component: CompanyDetailsPage,
        loader: companyDetailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'organization',
          menuParent: '/companies',
        },
      },
      {
        path: 'contractors',
        Component: ContractListPage,
        loader: contractListLoader,
        handle: {
          layout: 'main',
          entity_type: 'contractor',
          menuParent: '/companies',
        },
      },
      {
        path: 'contractors/:id',
        Component: ContractDetailsPage,
        loader: contractDetailsLoader,
        handle: {
          layout: 'main',
          entity_type: 'contractor',
          menuParent: '/companies',
        },
      },
      {
        path: 'clients',
        Component: ClientListPage,
        loader: clientListLoader,
        handle: {
          layout: 'main',
          entity_type: 'client',
          menuParent: '/companies',
        },
      },
      {
        path: 'clients/:id',
        Component: ClientDetailsPage,
        loader: clientDetailsLoader,
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
