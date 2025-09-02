import type { IBaseEntity } from '@entities/base/model';

export interface ICompany extends Partial<IBaseEntity> {
  contactId: string;
  shortName: string;
  businessEntity: string;
  contract: ICompanyContract;
  type: string[];
  status: string;
  photos: ICompanyImage[];
}

export interface ICompanyFormData
  extends Pick<ICompany, 'type' | 'businessEntity'>,
    ICompanyContract {}

interface ICompanyContract {
  no: string;
  issue_date: Date | string;
}

export interface ICompanyImage extends Pick<IBaseEntity, 'name' | 'createdAt'> {
  filepath: string;
  thumbpath: string;
}

export type CompanyRequestData = Partial<
  Pick<ICompany, 'name' | 'shortName' | 'businessEntity' | 'contract' | 'type'>
>;
