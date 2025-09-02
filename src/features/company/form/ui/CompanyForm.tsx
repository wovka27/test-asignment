import { useCurrentRoute } from '@app/providers/router/lib/hooks/useCurrentRoute.ts';

import { fields } from '@features/company/form/config/formFieldsConfig.ts';
import { type FormValues, schema } from '@features/company/form/model/schema.ts';

import companyStore from '@entities/companies/model/company.store.ts';
import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const CompanyForm: React.FC<EntityComponentFormPropsMap['company']> = ({
  initialState,
  setState,
}) => {
  const route = useCurrentRoute<{ id: string }, object>();
  return (
    <EntityDetailsForm<FormValues>
      defaultValues={initialState}
      onSubmit={(v) => companyStore.updateById(route!.params.id, v)}
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
