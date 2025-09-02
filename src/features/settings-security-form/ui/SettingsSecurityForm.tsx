import { observer } from 'mobx-react';

import { fieldsConfig } from '@features/settings-security-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-security-form/model/schema';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';
import settingsStore from '@entities/settings/model/settings.store.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const SettingsSecurityForm: React.FC<EntityComponentFormPropsMap['settingsSecurity']> =
  observer(({ initialState, setState }) => {
    return (
      <EntityDetailsForm
        defaultValues={initialState}
        onSubmit={(v) => settingsStore.updateSettings('security', v)}
        titleText={'Security'}
        fields={fieldsConfig}
        schema={schema}
        actions={[
          { type: 'submit', icon: 'check', title: 'Save changes' },
          { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
        ]}
      />
    );
  });
