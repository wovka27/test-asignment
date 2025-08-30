import type { IMenuListItem } from '@widgets/AsideMenu/ui/MenuList/model';

export const menuItems: IMenuListItem[] = [
  { to: '/companies', iconName: 'company' },
  { to: '/search', iconName: 'search' },
];

export const defaultMenuItems: IMenuListItem[] = [
  { to: '' },
  { to: '/settings', iconName: 'settings' },
];
