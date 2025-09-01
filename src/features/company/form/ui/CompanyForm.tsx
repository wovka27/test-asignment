import { formFieldConfigResolver } from '@features/company/form/config/formFieldConfigResolver';

import companiesService from '@entities/companies/api/Companies.service.ts';
import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types';

import Form from '@shared/ui/Form';

export const CompanyForm: React.FC<EntityComponentFormPropsMap['company']> = ({
  initialState,
  setState,
}) => {
  return (
    <Form
      title="Company"
      initialState={initialState}
      fieldsConfig={formFieldConfigResolver}
      formAction={companiesService.formAction}
      setState={setState}
    />
  );
};
