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
          'Status:': ({ toYesNo }) => toYesNo(subscription.status),
          'Renewal date:': ({ toDate }) => toDate(subscription.renewal_date),
        },
        'Security|settingsSecurity': {
          'Two-factor authentication:': ({ toYesNo }) => toYesNo(security.two_factor_enabled),
          'Last password change:': ({ toDate }) => toDate(security.last_password_change),
          'Login alerts:': ({ toYesNo }) => toYesNo(security.login_alerts),
        },
        'Notifications|settingsNotification': {
          'Email notifications:': ({ toYesNo }) => toYesNo(notifications.email_notifications),
          'SMS notifications:': ({ toYesNo }) => toYesNo(notifications.sms_notifications),
          'Push notifications:': ({ toYesNo }) => toYesNo(notifications.push_notifications),
        },
        'Preferences|settingsPreferences': {
          'Language:': preferences.language,
          'Time zone:': preferences.time_zone,
          'Theme:': preferences.theme,
        },
      };
    },
    (payload) => {
      return {
        settingsSubscription: payload.details.subscription,
        settingsSecurity: payload.details.security,
        settingsNotification: payload.details.notifications,
        settingsPreferences: payload.details.preferences,
      };
    }
  );

  return <EntityDetails isHeader={false} data={data} />;
});
