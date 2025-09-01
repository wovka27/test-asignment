import { AxiosError } from 'axios';

import { fetchUpdateContact } from '@entities/contacts/api/index.ts';
import type { IContact } from '@entities/contacts/model';
import { contactsDetailsStore } from '@entities/contacts/model/contactsDetalis.store.ts';

export default class ContactsService {
  public static async formAction(
    value: Omit<IContact, 'id' | 'createdAt' | 'updatedAt'> & { fullName: string }
  ) {
    const [firstname, lastname] = (value.fullName || '').trim().split(' ');
    try {
      const response = await fetchUpdateContact({
        phone: value.phone,
        email: value.email,
        firstname,
        lastname,
      });

      contactsDetailsStore.setData({
        ...response.data,
        fullName: `${response.data.firstname} ${response.data.lastname}`,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    }
  }
}
