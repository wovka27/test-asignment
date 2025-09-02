import { observer } from 'mobx-react';

import EntityList from '@features/entity-list';

import companyStore from '@entities/companies/model/company.store.ts';

export const CompanyList = observer(() => {
  return (
    <>
      <EntityList list={companyStore.list} />
    </>
  );
});
