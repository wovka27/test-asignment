import BaseService from '@entities/base/api/BaseService.ts';
import { fetchUpdateCompany } from '@entities/companies/api/index.ts';
import type { ICompany } from '@entities/companies/model';
import { companyDetailsStore } from '@entities/companies/model/companyDetalis.store.ts';

import { formDataToObject } from '@shared/lib/helpers/formDataToObject.ts';

class CompaniesService extends BaseService<ICompany> {
  public async formAction(state: ICompany, payload: FormData) {
    const data = formDataToObject(payload);
    const response = await fetchUpdateCompany({
      name: data.name,
      businessEntity: data.businessEntity,
      type: data.type,
      contract: {
        issue_date: data.issue_date,
        no: data.no,
      },
    });

    companyDetailsStore.setData(response.data);
    companyDetailsStore.setInitialFormState({
      issue_date: response.data.contract.issue_date,
      no: response.data.contract.no,
      businessEntity: response.data.businessEntity,
      type: response.data.type,
    });
    return response.data;
  }
}

const companiesService = new CompaniesService();

export default companiesService;
