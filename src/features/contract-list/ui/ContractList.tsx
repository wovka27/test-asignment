import { observer } from 'mobx-react';

import EntityList from '@features/entity-list';

import contractStore from '@entities/contracts/model/contract.store.ts';

export const ContractList = observer(() => {
  return (
    <>
      <EntityList list={contractStore.list} />
    </>
  );
});
