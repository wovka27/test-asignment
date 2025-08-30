import clsx from 'clsx';

import type { CheckboxProps } from '@shared/ui/Checkbox/model';

import './checkbox.scss';

export const Checkbox: CheckboxProps = ({
  disabled,
  onChange,
  checked,
  label,
  className,
  ...rest
}) => {
  const toggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={clsx('checkbox', { checked, disabled }, className)}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <input
        tabIndex={-1}
        style={{ display: 'none' }}
        checked={checked}
        disabled={disabled}
        type="checkbox"
        {...rest}
      />
      <div className="checkbox__box">{checked && <span className="checkmark">✓</span>}</div>
      {label && <span className="checkbox__label">{label}</span>}
    </div>
  );
};
