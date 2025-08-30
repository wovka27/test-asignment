import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from '@app/providers/router/routes';

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
