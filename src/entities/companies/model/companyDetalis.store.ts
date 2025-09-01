import type { ICompany } from '@entities/companies/model/index.ts';
import EntityDetailsStore from '@entities/entityDetails/model/EntityDetails.store.ts';

export const companyDetailsStore = new EntityDetailsStore<ICompany>({
  type: [],
  contract: {
    no: '',
    issue_date: '',
  },
  name: '',
  businessEntity: '',
  photos: [],
  status: '',
  shortName: '',
  contactId: '',
});
