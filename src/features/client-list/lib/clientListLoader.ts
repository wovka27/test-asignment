import clientStore from '@entities/clients/model/clientStore.ts';

export const clientListLoader = async () => {
  await clientStore.getList();

  return null;
};
