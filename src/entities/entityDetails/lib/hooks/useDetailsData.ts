import { useLoaderData } from 'react-router-dom';

import { detailsDataTransformer } from '@entities/entityDetails/lib/helpers';
import type { IEntityDetailsLoaderResponse } from '@entities/entityDetails/model/types.ts';

export const useDetailsData = <T>(
  cb: (
    payload: IEntityDetailsLoaderResponse<T>['payload']
  ) => Parameters<typeof detailsDataTransformer>[number]
) => {
  const { payload } = useLoaderData<IEntityDetailsLoaderResponse<T>>();

  return { payload, ...detailsDataTransformer(cb(payload)) };
};
