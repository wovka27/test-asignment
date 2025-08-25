import type { ButtonProps } from '@shared/ui/Button/model';
import Icon from '@shared/ui/Icon';

import './button.scss';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    isLoading && 'button--loading',
    disabled && 'button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="button__loader" />}
      {icon && (
        <span className="button__icon button__icon">
          <Icon name={icon} />
        </span>
      )}
      <span className="button__content">{children}</span>
    </button>
  );
};
