import { fieldsConfig } from '@features/settings-preferences-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-preferences-form/model/schema';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';
import SettingsService from '@entities/settings/api/settings.service.ts';

export const SettingsPreferencesForm: React.FC<
  EntityComponentFormPropsMap['settingsPreferences']
> = ({ initialState, setState }) => {
  return (
    <EntityDetailsForm
      defaultValues={initialState}
      onSubmit={(v) => SettingsService.formAction('preferences', v)}
      titleText={'Preferences'}
      fields={fieldsConfig}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
};
