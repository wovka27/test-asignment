import type { ContactRequestData, IContact } from '@entities/contacts/model';

import { client } from '@shared/api/client.ts';

const getEndpoint = (id: string) => `/contacts/${id}`;

export const fetchGetContact = (id: string) => {
  return client.get<IContact>(getEndpoint(id));
};

export const fetchUpdateContact = (id: string, data: ContactRequestData) => {
  return client.patch<IContact>(getEndpoint(id), data);
};
