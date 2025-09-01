import { fetchUpdateCompany } from '@entities/companies/api/index.ts';
import type { ICompany } from '@entities/companies/model';
import { companyDetailsStore } from '@entities/companies/model/companyDetalis.store.ts';

export default class CompaniesService {
  public static async formAction(state: ICompany) {
    const response = await fetchUpdateCompany(state);

    companyDetailsStore.setData(response.data);
    return response.data;
  }
}
