import type { ICompany } from '@entities/companies/model';

type Photos = {
  title: string;
  onUpload: () => void;
  data: ICompany['photos'];
  onRemove: <T>(value: T) => void;
};

export type PhotosProps = React.FC<Photos>;
