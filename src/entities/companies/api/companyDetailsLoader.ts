import companyStore from '@entities/companies/model/company.store.ts';

export const companyDetailsLoader = async ({ params }: { params: { id: string } }) => {
  await companyStore.getById(params.id);

  return null;
};
