import type { InputHTMLAttributes, Ref } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export type Input = InputHTMLAttributes<HTMLInputElement> & {
  size?: InputSize;
  label?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
};

export type InputProps = React.FC<Input>;
