import { type SelectHTMLAttributes } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectType = SelectHTMLAttributes<HTMLSelectElement> & {
  size?: SelectSize;
  label?: string;
  error?: string;
  ref?: React.Ref<HTMLSelectElement>;
};

export interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export type SelectProps = React.FC<SelectType>;
