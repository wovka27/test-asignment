import { fetchGetCompany } from '@entities/companies/api';
import { fetchGetContact } from '@entities/contacts/api';
import type { IEntityDetailsLoaderResponse } from '@entities/entityDetails/model/types.ts';

export const detailsLoader = async <T>(): Promise<IEntityDetailsLoaderResponse<T>> => {
  const response = await fetchGetCompany();
  const contacts = await fetchGetContact();

  return {
    payload: {
      details: response.data as T,
      contacts: contacts.data,
    },
  };
};
