import { privateLoader } from '@features/auth/ui/privateLoader';

import contractStore from '@entities/contracts/model/contract.store.ts';
import { checkDetailsLoader } from '@entities/entity/api/checkDetailsLoader.ts';

export const contractDetailsLoader = async ({ params }: { params: { id: string } }) => {
  await privateLoader();
  await checkDetailsLoader(contractStore.list, params.id, 'contractors');
  await contractStore.getById(params.id);

  return null;
};
