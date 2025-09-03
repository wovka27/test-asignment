import searchStore from '@pages/SearchPage/model/search.store.ts';

export async function searchLoader() {
  await searchStore.getData();

  return null;
}
