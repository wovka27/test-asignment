import type { ICompany } from '@entities/companies/model';
import type { IContact } from '@entities/contacts/model';

export interface IEntityDetailsLoaderResponse<T> {
  payload: IEntityDetailsLoaderPayload<T>;
}
export interface IEntityDetailsLoaderPayload<T> {
  details: T;
  contacts: IContact;
}

type EntityComponentFormProps<T> = {
  setState: (v: boolean) => void;
  initialState: T;
};

export type EntityComponentFormPropsMap = {
  contacts: EntityComponentFormProps<IContact>;
  company: EntityComponentFormProps<ICompany>;
};

export type EntityComponentFormRegistry = {
  [K in keyof EntityComponentFormPropsMap]: React.FC<EntityComponentFormPropsMap[K]>;
};
