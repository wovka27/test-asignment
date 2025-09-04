import type { RouteObject } from 'react-router-dom';

import contractStore from '@entities/contracts/model/contract.store.ts';
import { checkDetailsLoader } from '@entities/entity/api/checkDetailsLoader.ts';

export const contractDetailsLoader: RouteObject['loader'] = async ({ params }) => {
  await checkDetailsLoader(contractStore.list, params.id!, 'contractors');
  await contractStore.getById(params.id!);

  return null;
};
