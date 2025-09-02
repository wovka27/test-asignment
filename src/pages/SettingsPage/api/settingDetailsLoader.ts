import { privateLoader } from '@features/auth/ui/privateLoader';

import settingsStore from '@entities/settings/model/settings.store.ts';

export const settingDetailsLoader = async () => {
  await privateLoader();

  await settingsStore.getSettings();

  return null;
};
