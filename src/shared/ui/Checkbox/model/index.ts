export interface ICheckboxProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  label?: string;
  onChange?: (v: boolean) => void;
}

export type CheckboxProps = React.FC<ICheckboxProps>;
