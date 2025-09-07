import { Toaster } from 'react-hot-toast';
import { Outlet, useNavigation } from 'react-router-dom';

import AsideMenu from '@widgets/AsideMenu';

import './main-layout.scss';

export const MainLayout = () => {
  const { state } = useNavigation();
  return (
    <div className="main-layout">
      <AsideMenu />
      <main className="main-layout__content">
        <div className="main-layout__inner">
          <Outlet />
        </div>
      </main>
      {state === 'loading' ? <div className="main-layout__loader loader"></div> : null}
      <Toaster />
    </div>
  );
};
