import { memo, useMemo } from 'react';

import clsx from 'clsx';
import { useNavigation } from 'react-router-dom';

import { useCurrentRoute } from '@app/providers/router/lib/hooks/useCurrentRoute.ts';

import { defaultMenuItems } from '@widgets/AsideMenu/ui/MenuList/config/menuItemList.ts';
import type { MenuItemProps } from '@widgets/AsideMenu/ui/MenuList/model';
import type { MenuListProps } from '@widgets/AsideMenu/ui/MenuList/model/menuListProps.ts';

import LogoutButton from '@features/auth/ui/logout-button';

import Button from '@shared/ui/Button';

export const MenuList: MenuListProps = ({ data }) => {
  const route = useCurrentRoute<object, { menuParent: string }>();
  const { location, state } = useNavigation();

  const loadingPath = state === 'loading' ? location?.pathname : null;

  const list: typeof data = useMemo(() => [...data, ...defaultMenuItems], [data]);

  return (
    <ul className="aside-menu__list">
      {list.map((item, index) => {
        return !item.to && !item.iconName ? (
          <li key={index} className="aside-menu__item aside-menu__item--empty"></li>
        ) : (
          <Item
            key={index}
            {...item}
            isSelected={route?.handle.menuParent === item.to}
            isLoading={loadingPath === item.to}
          />
        );
      })}
      <LogoutButton />
    </ul>
  );
};

const Item: MenuItemProps = memo(({ to, iconName, isSelected, isLoading }) => {
  return (
    <li className="aside-menu__item">
      <Button
        variant="filled-icon"
        to={to}
        loading={isLoading}
        icon={iconName}
        className={clsx({ 'is-selected': isSelected })}
      />
    </li>
  );
});
