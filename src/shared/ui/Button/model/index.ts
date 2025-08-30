import React, { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { type LinkProps as RouterLinkProps } from 'react-router-dom';

import type { IconNameType } from '@shared/ui/Icon/model';

export type ButtonVariant = 'filled' | 'outline' | 'flat' | 'icon' | 'filled-icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconNameType;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
};

export type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: never;
    href?: HTMLAnchorElement['href'];
    ref?: React.Ref<HTMLButtonElement>;
  };

export type AsLink = CommonProps &
  Omit<RouterLinkProps, 'className' | 'children'> & {
    to: RouterLinkProps['to'];
    href?: HTMLAnchorElement['href'];
    ref?: React.Ref<HTMLAnchorElement>;
  };

export type AsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: HTMLAnchorElement['href'];
    to?: RouterLinkProps['to'];
    ref?: React.Ref<HTMLAnchorElement>;
  };

export type ButtonProps = React.FC<AsButton | AsLink | AsAnchor>;
