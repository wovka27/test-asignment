import CompanyForm from '@features/company/form';
import ContactsForm from '@features/contacts-form';

import type { EntityComponentFormRegistry } from '@entities/entityDetails/model/types.ts';

export const entityComponentFormRegistry: EntityComponentFormRegistry = {
  contacts: ContactsForm,
  company: CompanyForm,
};
