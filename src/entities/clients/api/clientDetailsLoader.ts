import clientStore from '@entities/clients/model/clientStore.ts';

export const clientDetailsLoader = async ({ params }: { params: { id: string } }) => {
  await clientStore.getById(params.id);

  return null;
};
