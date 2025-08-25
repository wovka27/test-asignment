import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { AppRouter } from '@app/providers/router';

import './assets/styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
