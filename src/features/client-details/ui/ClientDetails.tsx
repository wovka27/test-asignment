import { observer } from 'mobx-react';

import { EntityDetails } from '@features/entity-details/ui/EntityDetalis.tsx';

import clientStore from '@entities/clients/model/clientStore.ts';

export const ClientDetails = observer(() => {
  return (
    <>
      <EntityDetails store={clientStore} />
    </>
  );
});
