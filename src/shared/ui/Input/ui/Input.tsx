import clsx from 'clsx';

import type { InputProps } from '@shared/ui/Input/model';

import './input.scss';

export const Input: InputProps = ({
  size = 'md',
  label,
  error,
  className = '',
  ref,
  disabled,
  required,
  onChange,
  ...props
}) => {
  const classes = clsx('input__field', `input--${size}`, { 'input__field--error': !!error });
  return (
    <label className={`input ${className}`}>
      {label && <span className="input__label">{label}</span>}
      <input
        ref={ref}
        className={classes}
        disabled={disabled}
        required={required}
        onChange={(event) => onChange?.(event.target.value)}
        aria-invalid={!!error}
        aria-disabled={disabled}
        aria-errormessage={error}
        aria-required={required}
        aria-label={label}
        {...props}
      />
      {error && <span className="input__error">{error}</span>}
    </label>
  );
};
