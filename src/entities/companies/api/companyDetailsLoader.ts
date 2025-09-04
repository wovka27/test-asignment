import { privateLoader } from '@features/auth/ui/privateLoader';

import companyStore from '@entities/companies/model/company.store.ts';
import { checkDetailsLoader } from '@entities/entity/api/checkDetailsLoader.ts';

export const companyDetailsLoader = async ({ params }: { params: { id: string } }) => {
  await privateLoader();
  await checkDetailsLoader(companyStore.list, params.id, 'companies');
  await companyStore.getById(params.id);

  return null;
};
