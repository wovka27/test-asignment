import type { ICheckboxProps } from '@shared/ui/Checkbox/model';
import type { IContentInfoItem } from '@shared/ui/ContentInfoItem/model';
import type { Input } from '@shared/ui/Input/model';
import type { SelectItemProps } from '@shared/ui/Select/model';

export interface IFormFieldGenerator {
  data: FormField[];
}

export type FormField =
  | IFormFieldGroup
  | IFormFieldInput
  | IFormFieldTextarea
  | IFormFieldInputDate
  | IFormFieldInputDateTime
  | IFormFieldCheckbox
  | IFormFieldSelect;

export interface IFieldBase {
  name: string;
}

export interface IFormFieldProps<T> {
  props?: T;
}

export interface IFormFieldInput extends IContentInfoItem, IFieldBase, IFormFieldProps<Input> {
  type: 'input';
}

export interface IFormFieldTextarea extends IContentInfoItem, IFieldBase, IFormFieldProps<Input> {
  type: 'textarea';
}

export interface IFormFieldInputDate extends IContentInfoItem, IFieldBase, IFormFieldProps<Input> {
  type: 'date';
}

export interface IFormFieldInputDateTime
  extends IContentInfoItem,
    IFieldBase,
    IFormFieldProps<Input> {
  type: 'datetime';
}

export interface IFormFieldCheckbox
  extends IContentInfoItem,
    IFieldBase,
    IFormFieldProps<ICheckboxProps> {
  type: 'checkbox';
}

export interface IFormFieldSelect extends IContentInfoItem, IFieldBase, IFormFieldProps<unknown> {
  type: 'select';
  options: (SelectItemProps & { label: string })[];
}

export interface IFormFieldGroup {
  type: 'group';
  children: FormField[];
}

export type FormFieldGeneratorType = React.FC<IFormFieldGenerator>;
