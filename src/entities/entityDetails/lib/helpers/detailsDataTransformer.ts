import type { IContentRow } from '@features/content-block/model';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import { FormatHelper } from '@shared/lib/helpers';

type ObjType = Record<string, string | ((format: typeof FormatHelper) => string)>;

type DetailsDataTransformerType = (
  config: Record<string, ObjType>,
  formDataState?: Record<string, Record<string, string | string[]>>
) => {
  data: Omit<IContentRow, 'onEdit'>[];
};

export const detailsDataTransformer: DetailsDataTransformerType = (
  config,
  formDataState?: Record<string, Record<string, string | string[]>>
) => {
  return {
    data: Object.entries(config).map(([title, detailsData]) => {
      const [titleText, componentFormRegistryKey] = title.split('|') as [
        string,
        string | undefined,
      ];

      return {
        titleText,
        componentFormRegistryKey: isFormKey(componentFormRegistryKey)
          ? componentFormRegistryKey
          : undefined,
        data: toArrayOptions(detailsData),
        ...(formDataState &&
          componentFormRegistryKey && { initialState: formDataState[componentFormRegistryKey] }),
      };
    }),
  };
};

const toArrayOptions = (obj: ObjType): Array<{ value: string; label: string }> => {
  return Object.entries(obj).map(([key, value]) => ({
    label: key,
    value: typeof value === 'string' ? value : value(FormatHelper),
  }));
};

function isFormKey(key: string | undefined): key is keyof EntityComponentFormPropsMap {
  if (!key) return false;
  return key in ({} as EntityComponentFormPropsMap);
}
