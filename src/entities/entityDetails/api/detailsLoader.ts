import companyStore from '@entities/companies/model/company.store.ts';

export const detailsLoader = async ({ params }: { params: { id: string } }) => {
  await companyStore.getById(params.id);

  return null;
};
