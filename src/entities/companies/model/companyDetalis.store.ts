import type { ICompany, ICompanyFormData } from '@entities/companies/model/index.ts';
import EntityDetailsStore from '@entities/entityDetails/model/EntityDetails.store.ts';

export const companyDetailsStore = new EntityDetailsStore<ICompany, ICompanyFormData>();
