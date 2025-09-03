import type { IconNameType } from '@shared/ui/Icon/model';

export interface IMenuList {
  data: IMenuListItem[];
}

export interface IMenuListItem {
  iconName?: IconNameType;
  to: string;
  isLoading?: boolean;
}

export type EntityType = 'organization' | 'contractor' | 'client';

export type MenuItemProps = React.FC<IMenuListItem & { isSelected: boolean }>;
