import type { CompanyRequestData, ICompany, ICompanyImage } from '@entities/companies/model';
import mock_companies from '@entities/companies/model/mocks/mock_companies.json';



import { client } from '@shared/api/client.ts';





const endpoint = 'companies/';

export const fetchGetCompanies = async (): Promise<ICompany[]> => {
  return mock_companies;
};

export const fetchGetCompany = (id: string = '12') => {
  return client.get<ICompany>(endpoint + id);
};

export const fetchUpdateCompany = (id: string = '12', data: Partial<CompanyRequestData>) => {
  return client.patch<ICompany>(endpoint + id, data);
};

export const fetchDeleteCompany = (id: string = '12') => {
  return client.delete(endpoint + id);
};

export const fetchAddCompanyImage = (id: string = '12', data: FormData) => {
  return client.post<ICompanyImage>(`${endpoint + id}/image`, data, {
    responseType: 'formdata',
  });
};

export const fetchDeleteCompanyImage = (id: string = '12', name: string) => {
  return client.delete(`${endpoint + id}/image/${name}`);
};
