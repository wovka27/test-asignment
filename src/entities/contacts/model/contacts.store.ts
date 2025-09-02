import { makeAutoObservable } from 'mobx';

import companyStore from '@entities/companies/model/company.store.ts';
import { fetchGetContact, fetchUpdateContact } from '@entities/contacts/api';
import type {
  ContactRequestData,
  IContact,
  IContactFormData,
} from '@entities/contacts/model/index.ts';

class ContactsStore {
  data: IContactFormData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setData = (data: IContactFormData) => {
    this.data = data;
  };

  getById = async (id: string) => {
    if (this.data && this.data.id === id) return;

    const response = await fetchGetContact(id);

    if (!response.data) return;

    this.setData({
      id: response.data.id,
      fullName: response.data.firstname + ' ' + response.data.lastname,
      email: response.data.email,
      phone: response.data.phone,
    });
  };

  updateById = async (data: IContactFormData) => {
    const [firstname, lastname] = data.fullName.split(' ');

    const requestData: ContactRequestData = {
      firstname,
      lastname,
      phone: data.phone,
      email: data.email,
    };

    const response = await fetchUpdateContact(companyStore.details!.contactId, requestData);

    if (!response.data) return;

    this.setData({
      id: response.data.id,
      fullName: response.data.firstname + ' ' + response.data.lastname,
      email: response.data.email,
      phone: response.data.phone,
    });
  };
}

const contactsStore = new ContactsStore();

export default contactsStore;
