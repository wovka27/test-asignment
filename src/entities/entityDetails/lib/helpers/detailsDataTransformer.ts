import type { IContentRow } from '@features/content-block/model';

import { FormatHelper } from '@shared/lib/helpers';

type ObjType = Record<string, string | ((format: typeof FormatHelper) => string)>;

type DetailsDataTransformerType = (config: Record<string, ObjType>) => {
  data: Omit<IContentRow, 'onEdit'>[];
};

export const detailsDataTransformer: DetailsDataTransformerType = (config) => {
  return {
    data: Object.entries(config).map(([title, detailsData]) => ({
      titleText: title,
      data: toArrayOptions(detailsData),
    })),
  };
};

const toArrayOptions = (obj: ObjType): Array<{ value: string; label: string }> => {
  return Object.entries(obj).map(([key, value]) => ({
    label: key,
    value: typeof value === 'string' ? value : value(FormatHelper),
  }));
};
