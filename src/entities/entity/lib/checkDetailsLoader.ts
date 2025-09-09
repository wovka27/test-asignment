import { redirect } from 'react-router-dom';

import type EntityStore from '@entities/entity/model/entity.store.ts';

export const checkDetailsLoader = async <T extends InstanceType<typeof EntityStore>['list']>(
  list: T,
  id: string,
  url: string
) => {
  const item = list.find((item) => item.id === id);

  if (!item) return redirect(url);

  return null;
};
