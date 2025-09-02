import { makeAutoObservable } from 'mobx';

import {
  fetchAddCompanyImage,
  fetchDeleteCompany,
  fetchDeleteCompanyImage,
  fetchGetCompanies,
  fetchGetCompany,
  fetchUpdateCompany,
} from '@entities/companies/api';
import type { ICompany } from '@entities/companies/model/index.ts';
import contactsStore from '@entities/contacts/model/contacts.store.ts';

const DETAIL_ENTITY_ID = '12';

export default class EntityStore {
  list: ICompany[] = [];
  details: ICompany | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setDetails = (data: typeof this.details) => {
    this.details = data;
  };

  setList = (data: typeof this.list) => {
    this.list = data;
  };

  changeListItem = (index: number, key: keyof ICompany, data: ICompany[typeof key]) => {
    this.list[index][key] = data;
  };

  addListItem = (item: ICompany) => {
    this.list.push(item);
  };

  deleteListItem = (index: number) => {
    this.list = this.list.filter((_, idx) => idx !== index);
  };

  replaceListItem = (index: number, data: ICompany) => {
    this.list.splice(index, 1, data);
  };

  getList = async () => {
    if (this.list.length) return;

    const [list, item] = await Promise.all([fetchGetCompanies(), fetchGetCompany()]);

    this.setList(item.data ? [...list, item.data] : list);
  };

  getById = async (id: string) => {
    if (this.details && this.details?.id === id) return;

    if (!this.list.length) await this.getList();

    const item = this.list.find((item) => item.id === id);

    if (item === undefined) return;

    this.setDetails(item);
    await contactsStore.getById(item.contactId);
  };

  updateById = async (id: string, data: ICompany) => {
    // Это не костыль просто демонстрация получения деталки для тестового
    if (id === DETAIL_ENTITY_ID) {
      const response = await fetchUpdateCompany(id, data);

      if (!response.data) return;

      this.setDetails(response.data);
      return;
    }

    this.setDetails({ ...this.details, ...data });
    this.replaceListItem(this.indexedData.get(id)!, { ...this.details, ...data });
  };

  deleteById = async (id: string) => {
    const index = this.indexedData.get(id);

    if (index === undefined) return;

    fetchDeleteCompany(DETAIL_ENTITY_ID).then(() => {
      this.setDetails(null);
      this.deleteListItem(index);
    });
  };

  deleteImage = (name: string) => {
    const index = this.indexedData.get(this.details!.id!);

    if (index !== undefined) {
      fetchDeleteCompanyImage(DETAIL_ENTITY_ID, name).then(() => {
        this.changeListItem(
          index,
          'photos',
          this.list[index].photos.filter((i) => i.name !== name)
        );
      });
    }
  };

  addImage = async (formData: FormData) => {
    const index = this.indexedData.get(this.details!.id!);

    if (index) {
      fetchAddCompanyImage(DETAIL_ENTITY_ID, formData).then(({ data }) => {
        this.list[index].photos.push(JSON.parse(data));
      });
    }
  };

  get images() {
    return this.details?.photos || [];
  }

  get indexedData() {
    return new Map(
      this.list.reduce((acc: [string, number][], item, currentIndex) => {
        acc[currentIndex] = [item.id!, currentIndex];
        return acc;
      }, [])
    );
  }
}
