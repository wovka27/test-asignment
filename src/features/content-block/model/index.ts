import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

export interface IContentRow {
  titleText: string;
  hideActions?: boolean;
  onEdit?: (...args: unknown[]) => void;
  componentFormRegistryKey?: keyof EntityComponentFormPropsMap;
  EntityForm?: React.ReactNode;
  initialState?: unknown;
  data: { label: string; value: string }[];
}

export type ContentRowProps = React.FC<IContentRow>;
