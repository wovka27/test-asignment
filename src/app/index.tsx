import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import ModalProvider from '@app/providers/modal/ui/ModalProvider.tsx';
import { AppRouter } from '@app/providers/router';

import './assets/styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <AppRouter />
    </ModalProvider>
  </StrictMode>
);
