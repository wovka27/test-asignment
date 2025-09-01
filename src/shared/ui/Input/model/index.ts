import type { InputHTMLAttributes, Ref } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export type Input = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  size?: InputSize;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
};

export type InputProps = React.FC<Input>;
