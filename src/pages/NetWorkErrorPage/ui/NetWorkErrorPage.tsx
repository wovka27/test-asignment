import { useLocation } from 'react-router-dom';

import Button from '@shared/ui/Button';

import './network-error-page.scss';

export const NetWorkErrorPage = () => {
  const { reload } = useLocation();
  return (
    <section className="jnetwork-error-page">
      <h1 className="jnetwork-error-page__title">Network Error</h1>
      <h2 className="jnetwork-error-page__subtitle">Ups</h2>
      <p className="jnetwork-error-page__desc">
        It&nbsp;looks like you&rsquo;ve hit a&nbsp;dead end. Back to&nbsp;the main page?
      </p>
      <Button variant="filled" size="lg" onClick={reload}>
        Reload Page
      </Button>
    </section>
  );
};
