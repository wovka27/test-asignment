import Button from '@shared/ui/Button';

import './not-found-page.scss';

export const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <h2 className="not-found-page__subtitle">Not found</h2>
      <p className="not-found-page__desc">
        It&nbsp;looks like you&rsquo;ve hit a&nbsp;dead end. Back to&nbsp;the main page?
      </p>
      <Button variant="filled" size="lg" to="/">
        Back
      </Button>
    </section>
  );
};
