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

  addListItem = (item: ICompany) => {
    this.list.push(item);
  };

  deleteListItem = (index: number) => {
    this.list = this.list.filter((_, idx) => idx !== index);
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

    this.setDetails({
      ...item,
      contract: { ...item.contract, issue_date: item.contract.issue_date.split('T')[0] },
    });
    await contactsStore.getById(item.contactId);
  };

  updateById = async (id: string, data: ICompany) => {
    const idx = this.list.findIndex((i) => i.id === id);
    if (id === DETAIL_ENTITY_ID) {
      const response = await fetchUpdateCompany(id, data);

      if (!response.data) return;

      this.setDetails(response.data);
      this.setList(
        this.list.map((i, index) => {
          if (idx === index) {
            return { ...i, ...data };
          }

          return i;
        })
      );
      return;
    }

    this.setDetails({ ...this.details, ...data });

    this.setList(
      this.list.map((i, index) => {
        if (idx === index) {
          return { ...i, ...data };
        }

        return i;
      })
    );
  };

  deleteById = async (id: string) => {
    const index = this.list.findIndex((i) => i.id === id);

    if (index === undefined) return;

    fetchDeleteCompany(DETAIL_ENTITY_ID).then(() => {
      this.setDetails(null);
      this.deleteListItem(index);
    });
  };

  deleteImage = (name: string) => {
    const index = this.list.findIndex((i) => i.id === this.details!.id!);

    if (index !== undefined) {
      fetchDeleteCompanyImage(DETAIL_ENTITY_ID, name).then(() => {
        this.setDetails({
          ...this.details!,
          photos: this.details!.photos.filter((i) => i.name !== name),
        });
        this.setList([
          ...this.list,
          { ...this.list[index], photos: this.list[index].photos.filter((i) => i.name !== name) },
        ]);
      });
    }
  };

  addImage = async (formData: FormData) => {
    const index = this.list.findIndex((i) => i.id === this.details!.id!);

    if (index !== -1) {
      fetchAddCompanyImage(DETAIL_ENTITY_ID, formData).then(({ data }) => {
        this.setDetails({ ...this.details!, photos: [...this.details!.photos, JSON.parse(data)] });
        const filtered = this.list.filter((i) => i.id !== this.list[index].id);
        this.setList([
          ...filtered,
          { ...this.list[index], photos: [...this.list[index].photos, JSON.parse(data)] },
        ]);
      });
    }
  };

  get images() {
    return this.details?.photos || [];
  }
}
