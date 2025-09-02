import { makeAutoObservable } from 'mobx';

import type { ISettingsApi } from '@pages/SettingsPage/model/types.ts';

import { fetchGetSettings } from '@entities/settings/api/getData.ts';

class SettingsStore {
  data: ISettingsApi | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getSettings = async () => {
    if (this.data) return;
    const response = await fetchGetSettings();

    this.data = response;
  };

  updateSettings = <K extends keyof ISettingsApi>(key: K, data: ISettingsApi[K]) => {
    if (!this.data) return;

    this.data[key] = data;
  };
}

const settingsStore = new SettingsStore();

export default settingsStore;
