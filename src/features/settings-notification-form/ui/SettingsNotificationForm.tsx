import { observer } from 'mobx-react';

import { fieldsConfig } from '@features/settings-notification-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-notification-form/model/schema';
import type { FormValues } from '@features/settings-subscription-form/model/schema.ts';

import type { EntityComponentFormPropsMap } from '@entities/entity/model/types.ts';
import settingsStore from '@entities/settings/model/settings.store.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const SettingsNotificationForm: React.FC<
  EntityComponentFormPropsMap['settingsNotification']
> = observer(({ initialState, setState }) => {
  return (
    <EntityDetailsForm<FormValues>
      defaultValues={initialState}
      onSubmit={(v) => settingsStore.updateSettings('notifications', v)}
      titleText={'Notifications'}
      fields={fieldsConfig}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
});
