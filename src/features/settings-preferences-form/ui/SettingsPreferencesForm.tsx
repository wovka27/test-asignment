import { observer } from 'mobx-react';

import { fieldsConfig } from '@features/settings-preferences-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-preferences-form/model/schema';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';
import settingsStore from '@entities/settings/model/settings.store.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const SettingsPreferencesForm: React.FC<EntityComponentFormPropsMap['settingsPreferences']> =
  observer(({ initialState, setState }) => {
    return (
      <EntityDetailsForm
        defaultValues={initialState}
        onSubmit={(v) => settingsStore.updateSettings('preferences', v)}
        titleText={'Preferences'}
        fields={fieldsConfig}
        schema={schema}
        actions={[
          { type: 'submit', icon: 'check', title: 'Save changes' },
          { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
        ]}
      />
    );
  });
