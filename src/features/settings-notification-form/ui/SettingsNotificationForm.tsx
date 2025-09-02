import { fieldsConfig } from '@features/settings-notification-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-notification-form/model/schema';
import type { FormValues } from '@features/settings-subscription-form/model/schema.ts';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';
import SettingsService from '@entities/settings/api/settings.service.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const SettingsNotificationForm: React.FC<
  EntityComponentFormPropsMap['settingsNotification']
> = ({ initialState, setState }) => {
  return (
    <EntityDetailsForm<FormValues>
      defaultValues={initialState}
      onSubmit={(v) => SettingsService.formAction('notifications', v)}
      titleText={'Notifications'}
      fields={fieldsConfig}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
};
