import { AxiosError } from 'axios';

import BaseService from '@entities/base/api/BaseService.ts';
import { fetchUpdateContact } from '@entities/contacts/api/index.ts';
import type { IContact, IContactFormData } from '@entities/contacts/model';
import { contactsDetailsStore } from '@entities/contacts/model/contactsDetalis.store.ts';

import { formDataToObject } from '@shared/lib/helpers/formDataToObject.ts';

class ContactsService extends BaseService<Omit<IContact, 'id' | 'createdAt' | 'updatedAt'>> {
  async formAction(state, payload) {
    const data = formDataToObject<IContactFormData>(payload);
    const [firstname, lastname] = data.person.split(' ').slice(0, 2);

    try {
      const response = await fetchUpdateContact({
        phone: data.phone,
        email: data.email,
        firstname,
        lastname,
      });

      contactsDetailsStore.setData(response.data);
      contactsDetailsStore.setInitialFormState({
        phone: response.data.phone,
        email: response.data.email,
        person: response.data.firstname + ' ' + response.data.lastname,
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }

      return state;
    }
  }
}

const contactService = new ContactsService();

export default contactService;
