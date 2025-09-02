import { timezones } from '@pages/SettingsPage/constants/timezones.ts';

import type { FormField } from '@shared/ui/FormFieldGenerator/model';

export const fieldsConfig: FormField[] = [
  {
    type: 'input',
    name: 'language',
    label: 'Language:',
  },
  {
    type: 'select',
    options: timezones,
    name: 'time_zone',
    label: 'Time zone:',
  },
  {
    type: 'input',
    name: 'theme',
    label: 'Theme:',
  },
];
