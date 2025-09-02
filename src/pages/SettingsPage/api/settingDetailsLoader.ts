import type { ISettingsApi } from '@pages/SettingsPage/model/types.ts';

import { privateLoader } from '@features/auth/ui/privateLoader';

import type { IEntityDetailsLoaderResponse } from '@entities/entityDetails/model/types.ts';
import { settingsStore } from '@entities/settings/model/settings.store.ts';

export const settingDetailsLoader = async (): Promise<
  IEntityDetailsLoaderResponse<ISettingsApi>
> => {
  await privateLoader();

  settingsStore.setData(data);

  return {
    payload: {
      details: data,
    },
  };
};

const data = {
  subscription: {
    plan: 'premium',
    status: 'No',
    renewal_date: '2025-12-01',
  },
  security: {
    two_factor_enabled: 'No',
    last_password_change: '2025-08-15',
    login_alerts: 'No',
  },
  notifications: {
    email_notifications: 'No',
    sms_notifications: 'No',
    push_notifications: 'No',
  },
  preferences: {
    language: 'en',
    time_zone: 'Europe/Moscow',
    theme: 'light',
  },
};
