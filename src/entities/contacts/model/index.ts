import type { IBaseEntity } from '@entities/base/model';

export interface IContact extends Partial<Omit<IBaseEntity, 'name'>> {
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
}

export interface IContactFormData
  extends Pick<IBaseEntity, 'id'>,
    Pick<IContact, 'email' | 'phone'> {
  fullName: string;
}

export type ContactRequestData = Partial<
  Pick<IContact, 'firstname' | 'lastname' | 'phone' | 'email'>
>;
