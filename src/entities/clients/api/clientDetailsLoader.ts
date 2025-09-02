import clientStore from '@entities/clients/model/clientStore.ts';
import { checkDetailsLoader } from '@entities/entity/api/checkDetailsLoader.ts';

export const clientDetailsLoader = async ({ params }: { params: { id: string } }) => {
  await checkDetailsLoader(clientStore.list, params.id, 'clients');
  await clientStore.getById(params.id);

  return null;
};
