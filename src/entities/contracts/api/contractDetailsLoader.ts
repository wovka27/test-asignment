import contractStore from '@entities/contracts/model/contract.store.ts';

export const contractDetailsLoader = async ({ params }: { params: { id: string } }) => {
  await contractStore.getById(params.id);

  return null;
};
