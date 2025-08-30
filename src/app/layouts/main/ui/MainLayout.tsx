import { Outlet } from 'react-router-dom';

import AsideMenu from '@widgets/AsideMenu';

import './main-layout.scss';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <AsideMenu />
      <main className="main-layout__content">
        <div className="main-layout__inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
