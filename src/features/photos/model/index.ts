import type { AxiosResponse } from 'axios';

import type { ICompany } from '@entities/companies/model';

type Photos = {
  title: string;
  onUpload: (formData: FormData) => Promise<AxiosResponse<ICompany['photos'][number]>>;
  data: ICompany['photos'];
  onRemove: <T>(value: T) => void;
};

export type PhotosProps = React.FC<Photos>;
