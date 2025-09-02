import { observer } from 'mobx-react';

import { EntityDetails } from '@features/entity-details/ui/EntityDetalis.tsx';

import companyStore from '@entities/companies/model/company.store.ts';

export const CompanyDetails = observer(() => {
  return (
    <>
      <EntityDetails store={companyStore} />
    </>
  );
});
