import { fetchGetCompany } from '@entities/companies/api';
import { companyDetailsStore } from '@entities/companies/model/companyDetalis.store.ts';
import { fetchGetContact } from '@entities/contacts/api';
import { contactsDetailsStore } from '@entities/contacts/model/contactsDetalis.store.ts';
import type { IEntityDetailsLoaderResponse } from '@entities/entityDetails/model/types.ts';
import { FormatHelper } from '@shared/lib/helpers';

export const detailsLoader = async <T>(): Promise<IEntityDetailsLoaderResponse<T>> => {
  const response = await fetchGetCompany();
  const contacts = await fetchGetContact();

  companyDetailsStore.setData(response.data);
  contactsDetailsStore.setData(contacts.data);
  companyDetailsStore.setInitialFormState({
    type: response.data.type,
    issue_date: FormatHelper.toDate(response.data.contract.issue_date),
    no: response.data.contract.no,
    businessEntity: response.data.businessEntity,
  });
  contactsDetailsStore.setInitialFormState({
    person: contacts.data.firstname + ' ' + contacts.data.lastname,
    email: contacts.data.email,
    phone: contacts.data.phone,
  });
  return {
    payload: {
      details: response.data as T,
      contacts: contacts.data,
    },
  };
};
