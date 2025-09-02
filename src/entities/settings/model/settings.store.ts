import type { ISettingsApi } from '@pages/SettingsPage/model/types.ts';

import EntityDetailsStore from '@entities/entityDetails/model/EntityDetails.store.ts';

export const settingsStore = new EntityDetailsStore<ISettingsApi>({
  subscription: {
    status: false,
    plan: '',
    renewal_date: '',
  },
  preferences: {
    theme: '',
    time_zone: '',
    language: '',
  },
  notifications: {
    email_notifications: false,
    push_notifications: false,
    sms_notifications: false,
  },
  security: {
    login_alerts: false,
    last_password_change: '',
    two_factor_enabled: false,
  },
});
