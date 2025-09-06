import CompanyForm from '@features/company/form';
import ContactsForm from '@features/contacts-form';
import SettingsNotificationForm from '@features/settings-notification-form';
import SettingsPreferencesForm from '@features/settings-preferences-form';
import SettingsSecurityForm from '@features/settings-security-form';
import SettingsSubscriptionForm from '@features/settings-subscription-form';

import type { EntityComponentFormRegistry } from '@entities/entity/model/types.ts';

export const entityComponentFormRegistry: EntityComponentFormRegistry = {
  contacts: ContactsForm,
  company: CompanyForm,
  settingsSubscription: SettingsSubscriptionForm,
  settingsNotification: SettingsNotificationForm,
  settingsPreferences: SettingsPreferencesForm,
  settingsSecurity: SettingsSecurityForm,
};
