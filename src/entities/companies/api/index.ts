import type { CompanyRequestData, ICompany } from '@entities/companies/model';
import mock_companies from '@entities/companies/model/mocks/mock_companies.json';

import { client } from '@shared/api/client.ts';

const endpoint = 'companies/12';

export const fetchGetCompanies = () => {
  return mock_companies;
};

export const fetchGetCompany = () => {
  return client.get<ICompany>(endpoint);
};

export const fetchUpdateCompany = (data: Partial<CompanyRequestData>) => {
  return client.patch<ICompany>(endpoint, data);
};

export const fetchDeleteCompany = () => {
  return client.delete(endpoint);
};

export const fetchAddCompanyImage = (data: FormData) => {
  return client.post<ICompany['photos']>(`${endpoint}/image`, data, { responseType: 'formdata' });
};

export const fetchDeleteCompanyImage = (name: string) => {
  return client.delete(`${endpoint}/image/${name}`);
};
