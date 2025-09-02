import { observer } from 'mobx-react';

import type { ISettingsApi } from '@pages/SettingsPage/model/types.ts';

import EntityDetails from '@widgets/EntityDetails';

import { useDetailsData } from '@entities/entityDetails/lib/hooks';
import { settingsStore } from '@entities/settings/model/settings.store.ts';

export const SettingsPage: React.FC = observer(() => {
  const { data } = useDetailsData<ISettingsApi>(
    () => {
      const { preferences, notifications, security, subscription } = settingsStore.data;
      return {
        'Subscription|settingsSubscription': {
          'Plan:': subscription.plan,
          'Status:': subscription.status,
          'Renewal date:': ({ toDate }) => toDate(subscription.renewal_date),
        },
        'Security|settingsSecurity': {
          'Two-factor authentication:': security.two_factor_enabled,
          'Last password change:': ({ toDate }) => toDate(security.last_password_change),
          'Login alerts:': security.login_alerts,
        },
        'Notifications|settingsNotification': {
          'Email notifications:': notifications.email_notifications,
          'SMS notifications:': notifications.sms_notifications,
          'Push notifications:': notifications.push_notifications,
        },
        'Preferences|settingsPreferences': {
          'Language:': preferences.language,
          'Time zone:': preferences.time_zone,
          'Theme:': preferences.theme,
        },
      };
    },
    () => {
      return {
        settingsSubscription: settingsStore.data.subscription,
        settingsSecurity: settingsStore.data.security,
        settingsNotification: settingsStore.data.notifications,
        settingsPreferences: settingsStore.data.preferences,
      };
    }
  );

  return <EntityDetails isHeader={false} data={data} />;
});
