import React from 'react';

import type { IconNameType } from '@shared/ui/Icon/model';

export type ActionType = {
  title: string;
  type?: React.HTMLProps<HTMLButtonElement>['type'];
  icon: IconNameType;
  onClick?: () => void | Promise<void>;
};

type ISectionContainer = React.PropsWithChildren & React.HTMLProps<HTMLDivElement>;

export type SectionContainerProps = React.FC<ISectionContainer> & {
  Body: SectionContainerBodyProps;
  Actions: SectionContainerActionsProps;
  Header: SectionContainerHeaderProps;
};

export type SectionContainerBodyProps = React.FC<React.PropsWithChildren>;
export type SectionContainerActionsProps = React.FC<{ data?: ActionType[] }>;
export type SectionContainerHeaderProps = React.FC<
  React.PropsWithChildren<{ ariaLabelledby?: string; titleText: string }>
>;
