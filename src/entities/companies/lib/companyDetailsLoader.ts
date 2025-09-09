import type { RouteObject } from 'react-router-dom';

import companyStore from '@entities/companies/model/company.store.ts';
import { checkDetailsLoader } from '@entities/entity/lib/checkDetailsLoader.ts';

export const companyDetailsLoader: RouteObject['loader'] = async ({ params }) => {
  await checkDetailsLoader(companyStore.list, params.id!, 'companies');
  await companyStore.getById(params.id!);

  return null;
};
