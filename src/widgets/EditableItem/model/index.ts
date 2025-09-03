import type { IContentRow } from '@features/content-block/model';

import type { ICompany } from '@entities/companies/model';
import type EntityStore from '@entities/entity/model/entity.store.ts';

export interface IEntityDetails {
  data: IContentRow[];
  isHeader?: boolean;
  headerTitle?: string;
  headerOnEdit?: (...args: unknown[]) => void;
  headerOnRemove?: () => void;
  hideActions?: boolean;
  photosData?: ICompany['photos'];
  photosOnRemove?: <T>(value: T) => void | Promise<void>;
  photosOnUpload?: (formData: FormData) => void;
  store?: InstanceType<typeof EntityStore>;
}

export type EntityDetailsProps = React.FC<IEntityDetails>;
