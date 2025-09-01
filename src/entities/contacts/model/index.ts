import type { IBaseEntity } from '@entities/base/model';

export interface IContact extends Omit<IBaseEntity, 'name'> {
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
}

export interface IContactFormData {
  person: string;
  phone: string;
  email: string;
}

export type ContactRequestData = Partial<
  Pick<IContact, 'firstname' | 'lastname' | 'phone' | 'email'>
>;
