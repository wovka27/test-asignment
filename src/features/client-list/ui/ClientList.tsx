import { observer } from 'mobx-react';

import EntityList from '@features/entity-list';

import clientStore from '@entities/clients/model/clientStore.ts';

export const ClientList = observer(() => {
  return (
    <>
      <EntityList list={clientStore.list} />
    </>
  );
});
