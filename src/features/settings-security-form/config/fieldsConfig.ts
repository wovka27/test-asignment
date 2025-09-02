import { boolOptions } from '@pages/SettingsPage/constants/boolOptions.ts';

import type { FormField } from '@shared/ui/FormFieldGenerator/model';

export const fieldsConfig: FormField[] = [
  {
    type: 'select',
    options: boolOptions,
    name: 'two_factor_enabled',
    label: 'Two-factor authentication:',
  },
  {
    type: 'date',
    name: 'last_password_change',
    label: 'Last password change:',
  },
  {
    type: 'select',
    options: boolOptions,
    name: 'login_alerts',
    label: 'Login alerts:',
  },
];
