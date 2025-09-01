import { useLoaderData } from 'react-router-dom';

import { detailsDataTransformer } from '@entities/entityDetails/lib/helpers';
import type { IEntityDetailsLoaderResponse } from '@entities/entityDetails/model/types.ts';

export const useDetailsData = <T>(
  cb: (
    payload: IEntityDetailsLoaderResponse<T>['payload']
  ) => Parameters<typeof detailsDataTransformer>[0],
  getInitialState?: (
    payload: IEntityDetailsLoaderResponse<T>['payload']
  ) => Record<string, Record<string, string | string[]>>
) => {
  const { payload } = useLoaderData<IEntityDetailsLoaderResponse<T>>();

  return { payload, ...detailsDataTransformer(cb(payload), getInitialState?.(payload)) };
};
