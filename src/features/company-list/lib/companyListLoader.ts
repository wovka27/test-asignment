import companyStore from '@entities/companies/model/company.store.ts';

export const companyListLoader = async () => {
  await companyStore.getList();

  return null;
};
