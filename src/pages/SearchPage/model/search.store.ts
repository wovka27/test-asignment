import { makeAutoObservable } from 'mobx';

import clientStore from '@entities/clients/model/clientStore.ts';
import type { ICompany } from '@entities/companies/model';
import companyStore from '@entities/companies/model/company.store.ts';
import contractStore from '@entities/contracts/model/contract.store.ts';

class SearchPage {
  list: ICompany[] = [];
  filteredLIst: ICompany[] = [];

  constructor() {
    makeAutoObservable(this);
    console.log(this.list);
  }

  getData = async () => {
    await Promise.all([companyStore.getList(), contractStore.getList(), clientStore.getList()]);
    this.setList([
      ...companyStore.list.map((item) => ({ ...item, category: 'companies' })),
      ...contractStore.list.map((item) => ({ ...item, category: 'contractors' })),
      ...clientStore.list.map((item) => ({ ...item, category: 'clients' })),
    ]);
    this.setFilteredList(this.list);
  };

  setList = (data: ICompany[]) => {
    this.list = data;
  };

  setFilteredList = (data: ICompany[]) => {
    this.filteredLIst = data;
  };

  filterByName = ({ search }: { search: string }) => {
    this.filteredLIst = searchFilter<ICompany>(this.list, search);
  };
}

const searchStore = new SearchPage();

export default searchStore;

function searchFilter<T>(arr: T[], query: string, filters = {}) {
  return arr.filter((item) => {
    const matchesQuery = query
      ? Object.values(item).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      : true;

    const matchesFilters = Object.entries(filters).every(
      ([key, val]) => String(item[key]).toLowerCase() === String(val).toLowerCase()
    );

    return matchesQuery && matchesFilters;
  });
}
