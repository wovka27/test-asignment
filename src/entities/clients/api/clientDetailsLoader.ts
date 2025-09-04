import type { RouteObject } from 'react-router-dom';

import clientStore from '@entities/clients/model/clientStore.ts';
import { checkDetailsLoader } from '@entities/entity/api/checkDetailsLoader.ts';

export const clientDetailsLoader: RouteObject['loader'] = async ({ params }) => {
  await checkDetailsLoader(clientStore.list, params.id!, 'clients');
  await clientStore.getById(params.id!);

  return null;
};
