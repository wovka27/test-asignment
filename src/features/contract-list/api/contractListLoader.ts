import contractStore from '@entities/contracts/model/contract.store.ts';

export const contractListLoader = async () => {
  await contractStore.getList();

  return null;
};
