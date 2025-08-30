import type { ContactRequestData, IContact } from '@entities/contacts/model';

import { client } from '@shared/api/client.ts';

const endpoint = 'contacts/16';

export const fetchGetContact = () => {
  return client.get<IContact>(endpoint);
};

export const fetchUpdateContact = (data: ContactRequestData) => {
  return client.patch<IContact>(endpoint, data);
};
