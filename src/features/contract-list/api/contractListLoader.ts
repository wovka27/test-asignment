import type { RouteObject } from 'react-router-dom';

import contractStore from '@entities/contracts/model/contract.store.ts';

export const contractListLoader: RouteObject['loader'] = async () => {
  await contractStore.getList();

  return null;
};
