import { observer } from 'mobx-react';

import { EntityDetails } from '@features/entity-details/ui/EntityDetalis.tsx';

import contractStore from '@entities/contracts/model/contract.store.ts';

export const ContractDetails = observer(() => {
  return (
    <>
      <EntityDetails store={contractStore} />
    </>
  );
});
