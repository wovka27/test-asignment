import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ModalProvider from '@app/providers/modal/ui/ModalProvider.tsx';
import routes from '@app/providers/router/routes';

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
};
