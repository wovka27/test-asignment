import type { CompanyRequestData, ICompany } from '@entities/companies/model';

import { client } from '@shared/api/client.ts';

const getEndpoint = (id: string) => `/companies/${id}`;

export const fetchGetCompany = (id: string) => {
  return client.get<ICompany>(getEndpoint(id));
};

export const fetchUpdateCompany = (id: string, data: CompanyRequestData) => {
  return client.patch<ICompany>(getEndpoint(id), data);
};

export const fetchDeleteCompany = (id: string) => {
  return client.delete(getEndpoint(id));
};

export const fetchAddCompanyImage = (id: string, data: FormData) => {
  return client.post<ICompany['photos']>(`${getEndpoint(id)}/image`, data);
};
