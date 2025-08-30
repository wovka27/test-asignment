import type { IContact } from '@entities/contacts/model';

export interface IEntityDetailsLoaderResponse<T> {
  payload: IEntityDetailsLoaderPayload<T>;
}
export interface IEntityDetailsLoaderPayload<T> {
  details: T;
  contacts: IContact;
}
