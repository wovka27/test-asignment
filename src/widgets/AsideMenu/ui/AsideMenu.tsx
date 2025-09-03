import clsx from 'clsx';
import { Link, useNavigation } from 'react-router-dom';



import { useCurrentRoute } from '@app/providers/router/lib/hooks/useCurrentRoute.ts';



import { menuItems } from '@widgets/AsideMenu/ui/MenuList/config/menuItemList.ts';
import { MenuList } from '@widgets/AsideMenu/ui/MenuList/ui/MenuList.tsx';



import Button from '@shared/ui/Button';
import Icon from '@shared/ui/Icon';
import type { IconNameType } from '@shared/ui/Icon/model';



import './aside-menu.scss';





type EntityType = 'organization' | 'contractor' | 'client';

export const AsideMenu: React.FC = () => {
  const route = useCurrentRoute<object, { hideMenu: boolean; entity_type: EntityType }>();
  const { location, state } = useNavigation();

  const loadingPath = state === 'loading' ? location?.pathname : null;
  const hidden = route?.handle.hideMenu;
  const isCurrentRouteEntityType = route?.handle.entity_type;


  const btnList: { text: string; icon: IconNameType; to: string; entity_type: EntityType }[] = [
    {
      text: 'Organizations',
      icon: 'company',
      to: 'companies',
      entity_type: 'organization',
    },
    {
      text: 'Contractors',
      icon: 'contractor',
      to: 'contractors',
      entity_type: 'contractor',
    },
    { text: 'Clients', icon: 'account', to: 'clients', entity_type: 'client' },
  ];

  return (
    <aside className="aside-menu">
      <div className="aside-menu__panel">
        <div className="aside-menu__logo">
          <Link to="/">
            <Icon name="logo" />
          </Link>
        </div>
        <MenuList data={menuItems} />
      </div>
      <div className={clsx('aside-menu__content', { hidden })}>
        <div className="aside-menu__content-inner">
          <div className="aside-menu__content-header">
            <h2 className="aside-menu__content-header__title">Oak Tree Cemetery</h2>
            <h3 className="aside-menu__content-header__subtitle">Process Manager</h3>
          </div>
          <div className="aside-menu__content-btns">
            {btnList.map(({ text, icon, to, entity_type }) => (
              <Button
                key={text}
                to={to}
                size="lg"
                icon={icon}
                variant={isCurrentRouteEntityType === entity_type ? 'filled' : 'outline'}
                loading={loadingPath?.includes(to)}
              >
                {text}
              </Button>
            ))}
          </div>
          <div className="aside-menu__content-footer">
            <p>All Funeral Services &copy; 2015&ndash;{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
