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
    status: true,
    renewal_date: '2025-12-01T00:00:00Z',
  },
  security: {
    two_factor_enabled: true,
    last_password_change: '2025-08-15T10:45:00Z',
    login_alerts: true,
  },
  notifications: {
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
  },
  preferences: {
    language: 'en',
    time_zone: 'Europe/Moscow',
    theme: 'light',
  },
};
