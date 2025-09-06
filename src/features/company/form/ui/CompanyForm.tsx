import { useCurrentRoute } from '@app/providers/router/lib/hooks/useCurrentRoute.ts';

import { fields } from '@features/company/form/config/formFieldsConfig.ts';
import { type FormValues, schema } from '@features/company/form/model/schema.ts';

import clientStore from '@entities/clients/model/clientStore.ts';
import companyStore from '@entities/companies/model/company.store.ts';
import contractStore from '@entities/contracts/model/contract.store.ts';
import type EntityStore from '@entities/entity/model/entity.store.ts';
import type { EntityComponentFormPropsMap } from '@entities/entity/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

const titleMap: Record<string, string> = {
  companies: 'Company',
  contractors: 'Contractor',
  clients: 'Client',
};

export const CompanyForm: React.FC<EntityComponentFormPropsMap['company']> = ({
  initialState,
  setState,
}) => {
  const route = useCurrentRoute<{ id: string }, object>();

  const key = route!.pathname.split('/')[1];

  const storeMap: Record<string, InstanceType<typeof EntityStore>> = {
    companies: companyStore,
    contractors: contractStore,
    clients: clientStore,
  };

  return (
    <EntityDetailsForm<FormValues>
      defaultValues={initialState}
      onSubmit={(v) => storeMap[key].updateById(route!.params.id!, v)}
      titleText={titleMap[key]}
      fields={fields}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
};
