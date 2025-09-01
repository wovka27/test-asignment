import type { FormProps } from '@shared/ui/Form/model/types.ts';
import type { FormField } from '@shared/ui/FormFieldGenerator/model';
import type { ActionType } from '@shared/ui/SectionContainer/model';

export type EntityDetailsFormProps<T> = Omit<FormProps<T>, 'children'> & {
  titleText: string;
  ariaLabelledby: string;
  fields: FormField[];
  actions?: ActionType[];
};
