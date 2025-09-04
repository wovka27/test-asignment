import { useNavigate } from 'react-router-dom';

import Button from '@shared/ui/Button';

import './network-error-page.scss';

export const NetWorkErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="network-error-page">
      <h2 className="network-error-page__title">Network Error</h2>
      <h3 className="network-error-page__subtitle">Ups</h3>
      <p className="network-error-page__desc">
        It&nbsp;looks like you&rsquo;ve hit a&nbsp;dead end. Back to&nbsp;the main page?
      </p>
      <Button variant="filled" size="lg" onClick={() => navigate('/')}>
        Reload Page
      </Button>
    </section>
  );
};
