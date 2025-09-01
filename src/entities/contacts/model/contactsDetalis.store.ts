import type { IContact, IContactFormData } from '@entities/contacts/model/index.ts';
import EntityDetailsStore from '@entities/entityDetails/model/EntityDetails.store.ts';

export const contactsDetailsStore = new EntityDetailsStore<
  IContact & Pick<IContactFormData, 'fullName'>
>({
  email: '',
  fullName: '',
  phone: '',
  firstname: '',
  lastname: '',
});
