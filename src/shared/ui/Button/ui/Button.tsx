import clsx from 'clsx';
import { Link } from 'react-router-dom';

import type { AsAnchor, AsButton, AsLink, ButtonProps, CommonProps } from '@shared/ui/Button/model';
import Icon from '@shared/ui/Icon';

import './button.scss';

export const Button: ButtonProps = (props) => {
  const {
    variant = 'filled',
    size = 'md',
    icon,
    children,
    loading = false,
    disabled = false,
    className = '',
    ...rest
  } = props;

  const classes = clsx(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading && 'is-loading',
    disabled && 'is-disabled',
    className
  );

  const content = (
    <>
      {loading && <span className="btn__spinner" />}
      {icon && !loading && (
        <span className="btn__icon">
          <Icon width={16} height={16} name={icon}></Icon>
        </span>
      )}
      {children && <span className="btn__label">{children}</span>}
    </>
  );

  // Router Link
  if ('to' in props && props.to !== undefined) {
    const { onClick, to, ref, ...linkRest } = rest as AsLink;
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || loading) e.preventDefault();
      onClick?.(e);
    };

    return (
      <Link
        {...(linkRest as Omit<AsLink, keyof CommonProps>)}
        to={to}
        className={classes}
        aria-disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : undefined}
        onClick={handleClick}
        ref={ref}
      >
        {content}
      </Link>
    );
  }

  // External anchor
  if ('href' in props && props.href !== undefined) {
    const { onClick, href, ref, ...aRest } = rest as AsAnchor;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || loading) e.preventDefault();
      onClick?.(e);
    };

    return (
      <a
        {...(aRest as Omit<AsAnchor, keyof CommonProps>)}
        href={href}
        className={classes}
        aria-disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : undefined}
        onClick={handleClick}
        ref={ref}
      >
        {content}
      </a>
    );
  }

  // Native button
  const { type, ref, ...btnRest } = rest as AsButton;
  return (
    <button
      type={type ?? 'button'}
      className={classes}
      disabled={disabled || loading}
      ref={ref}
      {...(btnRest as Omit<AsButton, keyof CommonProps>)}
    >
      {content}
    </button>
  );
};
