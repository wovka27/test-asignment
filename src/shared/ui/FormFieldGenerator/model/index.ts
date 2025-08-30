import type { ICheckboxProps } from '@shared/ui/Checkbox/model';
import type { IContentInfoItem } from '@shared/ui/ContentInfoItem/model';
import type { Input } from '@shared/ui/Input/model';
import type { SelectItemProps, SelectType } from '@shared/ui/Select/model';

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

export interface IFormFieldInput extends IContentInfoItem, IFieldBase {
  type: 'input';
  props: Input;
}

export interface IFormFieldTextarea extends IContentInfoItem, IFieldBase {
  type: 'textarea';
  props: Input;
}

export interface IFormFieldInputDate extends IContentInfoItem, IFieldBase {
  type: 'date';
  props: Input;
}

export interface IFormFieldInputDateTime extends IContentInfoItem, IFieldBase {
  type: 'datetime';
  props: Input;
}

export interface IFormFieldCheckbox extends IContentInfoItem, IFieldBase {
  type: 'checkbox';
  props: ICheckboxProps;
}

export interface IFormFieldSelect extends IContentInfoItem, IFieldBase {
  type: 'select';
  props: SelectType;
  options: (SelectItemProps & { label: string })[];
}

export interface IFormFieldGroup {
  type: 'group';
  children: FormField[];
}

export type FormFieldGeneratorType = React.FC<IFormFieldGenerator>;
export type FormFieldItemProps = React.FC<FormField>;
