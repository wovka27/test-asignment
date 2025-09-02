import { fieldsConfig } from '@features/settings-subscription-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-subscription-form/model/schema';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const SettingsSubscriptionForm: React.FC<
  EntityComponentFormPropsMap['settingsSubscription']
> = ({ initialState, setState }) => {
  return (
    <EntityDetailsForm
      defaultValues={initialState}
      onSubmit={(v) => {
        console.log(v);
      }}
      titleText={'Subscription'}
      fields={fieldsConfig}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
};
