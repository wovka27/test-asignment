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
  type = 'text',
  onChange,
  ...props
}) => {
  const classes = clsx('input__field', `input--${size}`, { 'input__field--error': !!error });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    if (type === 'date') {
      const isoValue = rawValue ? new Date(rawValue).toISOString().split('T')[0] : '';
      onChange?.(isoValue);
    } else {
      onChange?.(rawValue);
    }
  };
  return (
    <label className={`input ${className}`}>
      {label && <span className="input__label">{label}</span>}
      <input
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-disabled={disabled}
        aria-errormessage={error}
        aria-required={required}
        aria-label={label}
        value={props.value}
        defaultValue={props.defaultValue}
        {...props}
      />
      {error && <span className="input__error">{error}</span>}
    </label>
  );
};
