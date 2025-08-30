import { Outlet } from 'react-router-dom';

import './auth-layout.scss';

export const AuthLayout = () => {
  return (
    <section className="auth-layout">
      <div className="auth-layout__logo">
        <img src="/favicon.ico" alt="logo" />
      </div>
      <Outlet />
    </section>
  );
};
