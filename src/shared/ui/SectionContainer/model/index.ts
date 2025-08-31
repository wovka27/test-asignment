import React from 'react';

import type { IconNameType } from '@shared/ui/Icon/model';

export type ActionType = {
  title: string;
  type?: React.HTMLProps<HTMLButtonElement>['type'];
  icon: IconNameType;
  onClick?: () => void | Promise<void>;
};

type ISectionContainer = React.PropsWithChildren &
  React.HTMLProps<HTMLDivElement> & {
    titleText?: string;
    actions?: ActionType[];
    isForm?: boolean;
  };

export type SectionContainerProps = React.FC<ISectionContainer>;
