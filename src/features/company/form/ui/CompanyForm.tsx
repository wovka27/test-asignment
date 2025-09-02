import { fields } from '@features/company/form/config/formFieldsConfig.ts';
import { type FormValues, schema } from '@features/company/form/model/schema.ts';

import CompaniesService from '@entities/companies/api/Companies.service.ts';
import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const CompanyForm: React.FC<EntityComponentFormPropsMap['company']> = ({
  initialState,
  setState,
}) => {
  return (
    <EntityDetailsForm<FormValues>
      defaultValues={initialState}
      onSubmit={CompaniesService.formAction}
      titleText={'Company'}
      fields={fields}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
};
