import { observer } from 'mobx-react';

import EditableItem from '@widgets/EditableItem';

import { detailsDataTransformer } from '@entities/entity/lib/helpers';
import settingsStore from '@entities/settings/model/settings.store.ts';

export const SettingsPage: React.FC = observer(() => {
  const { data } = detailsDataTransformer(
    {
      'Subscription|settingsSubscription': {
        'Plan:': settingsStore.data?.subscription.plan || '',
        'Status:': settingsStore.data?.subscription.status || '',
        'Renewal date:': ({ toDate }) =>
          toDate(settingsStore.data?.subscription.renewal_date || ''),
      },
      'Security|settingsSecurity': {
        'Two-factor authentication:': settingsStore.data?.security.two_factor_enabled || '',
        'Last password change:': ({ toDate }) =>
          toDate(settingsStore.data?.security.last_password_change || ''),
        'Login alerts:': settingsStore.data?.security.login_alerts || '',
      },
      'Notifications|settingsNotification': {
        'Email notifications:': settingsStore.data?.notifications.email_notifications || '',
        'SMS notifications:': settingsStore.data?.notifications.sms_notifications || '',
        'Push notifications:': settingsStore.data?.notifications.push_notifications || '',
      },
      'Preferences|settingsPreferences': {
        'Language:': settingsStore.data?.preferences.language || '',
        'Time zone:': settingsStore.data?.preferences.time_zone || '',
        'Theme:': settingsStore.data?.preferences.theme || '',
      },
    },
    {
      settingsSubscription: { ...settingsStore.data?.subscription },
      settingsSecurity: { ...settingsStore.data?.security },
      settingsNotification: { ...settingsStore.data?.notifications },
      settingsPreferences: { ...settingsStore.data?.preferences },
    }
  );

  return <EditableItem isHeader={false} data={data} />;
});
