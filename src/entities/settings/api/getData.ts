import type { ISettingsApi } from '@pages/SettingsPage/model/types.ts';

import settingsData from '@entities/settings/config/mocks/settingsData.json';

export const fetchGetSettings = async (): Promise<ISettingsApi> => {
  return settingsData as ISettingsApi;
};
