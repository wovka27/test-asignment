import type { FormField } from '@shared/ui/FormFieldGenerator/model';
import { boolOptions } from '@pages/SettingsPage/constants/boolOptions.ts';

export const fieldsConfig: FormField[] = [
  {
    type: 'select',
    options: boolOptions,
    name: 'email_notifications',
    label: 'Email notifications:',
  },
  {
    type: 'select',
    options: boolOptions,
    name: 'sms_notifications',
    label: 'SMS notifications:',
  },
  {
    type: 'select',
    options: boolOptions,
    name: 'push_notifications',
    label: 'Push notifications:',
  },
];
