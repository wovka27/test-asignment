import { fetchGetCompany } from '@entities/companies/api';
import { companyDetailsStore } from '@entities/companies/model/companyDetalis.store.ts';
import { fetchGetContact } from '@entities/contacts/api';
import { contactsDetailsStore } from '@entities/contacts/model/contactsDetalis.store.ts';
import type { IEntityDetailsLoaderResponse } from '@entities/entityDetails/model/types.ts';

export const detailsLoader = async <T>(): Promise<IEntityDetailsLoaderResponse<T>> => {
  const response = await fetchGetCompany();
  const contacts = await fetchGetContact();

  companyDetailsStore.setData(response.data);
  contactsDetailsStore.setData({
    ...contacts.data,
    fullName: `${contacts.data.firstname} ${contacts.data.lastname}`,
  });
  return {
    payload: {
      details: response.data as T,
      contacts: contacts.data,
    },
  };
};
