import { fieldsConfig } from '@features/settings-notification-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-notification-form/model/schema';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';
import { settingsStore } from '@entities/settings/model/settings.store.ts';
import type { FormValues } from '@features/settings-subscription-form/model/schema.ts';

export const SettingsNotificationForm: React.FC<
  EntityComponentFormPropsMap['settingsNotification']
> = ({ initialState, setState }) => {
  return (
    <EntityDetailsForm<FormValues>
      defaultValues={initialState}
      onSubmit={() => {}}
      titleText={'Notification'}
      fields={fieldsConfig}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
      syncValues={(values) => {
        settingsStore.setData(values)
      }}
    />
  );
};
