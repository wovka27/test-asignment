import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

import { defaultMenuItems } from '@widgets/AsideMenu/ui/MenuList/config/menuItemList.ts';
import type { MenuItemProps } from '@widgets/AsideMenu/ui/MenuList/model';
import type { MenuListProps } from '@widgets/AsideMenu/ui/MenuList/model/menuListProps.ts';

import LogoutButton from '@features/auth/ui/logout-button';

import Button from '@shared/ui/Button';

export const MenuList: MenuListProps = ({ data }) => {
  const { pathname } = useLocation();

  const list: typeof data = [...data, ...defaultMenuItems];

  return (
    <ul className="aside-menu__list">
      {list.map((item, index) =>
        !item.to && !item.iconName ? (
          <li key={index} className="aside-menu__item aside-menu__item--empty"></li>
        ) : (
          <Item key={index} {...item} isSelected={pathname.startsWith(item.to)} />
        )
      )}
      <LogoutButton />
    </ul>
  );
};

const Item: MenuItemProps = ({ to, iconName, isSelected }) => {
  return (
    <li className="aside-menu__item">
      <Button
        variant="filled-icon"
        to={to}
        icon={iconName}
        className={clsx({ 'is-selected': isSelected })}
      />
    </li>
  );
};
