import type { ContactRequestData, IContact } from '@entities/contacts/model';

import { client } from '@shared/api/client.ts';

const endpoint = 'contacts/';

export const fetchGetContact = (id: string) => {
  return client.get<IContact>(endpoint + id);
};

export const fetchUpdateContact = (id: string, data: ContactRequestData) => {
  return client.patch<IContact>(endpoint + id, data);
};
