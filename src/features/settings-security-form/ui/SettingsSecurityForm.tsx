import { fieldsConfig } from '@features/settings-security-form/config/fieldsConfig.ts';
import { schema } from '@features/settings-security-form/model/schema';

import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';
import SettingsService from '@entities/settings/api/settings.service.ts';

export const SettingsSecurityForm: React.FC<EntityComponentFormPropsMap['settingsSecurity']> = ({
  initialState,
  setState,
}) => {
  return (
    <EntityDetailsForm
      defaultValues={initialState}
      onSubmit={(v) => SettingsService.formAction('security', v)}
      titleText={'Security'}
      fields={fieldsConfig}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
};
