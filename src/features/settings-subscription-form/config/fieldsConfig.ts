import { boolOptions } from '@pages/SettingsPage/constants/boolOptions.ts';
import { planOptions } from '@pages/SettingsPage/constants/planOptions.ts';

import type { FormField } from '@shared/ui/FormFieldGenerator/model';

export const fieldsConfig: FormField[] = [
  {
    type: 'select',
    options: planOptions,
    name: 'plan',
    label: 'Plan:',
  },
  {
    type: 'select',
    options: boolOptions,
    name: 'status',
    label: 'Status:',
  },
  {
    type: 'date',
    name: 'renewal_date',
    label: 'Renewal date:',
  },
];
