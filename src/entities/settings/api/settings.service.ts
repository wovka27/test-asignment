import type { ISettingsApi } from '@pages/SettingsPage/model/types.ts';

import { settingsStore } from '@entities/settings/model/settings.store.ts';

export default class SettingsService {
  static formAction(key: keyof ISettingsApi, values: ISettingsApi[typeof key]) {
    settingsStore.setData({ ...settingsStore.data, [key]: values });
  }
}
