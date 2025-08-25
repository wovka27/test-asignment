import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { authorizedRoutes } from '@app/providers/router/routes/authorized-routes';
import { unauthorizedRoutes } from '@app/providers/router/routes/unauthorized-routes';

const router = createBrowserRouter([...authorizedRoutes, ...unauthorizedRoutes]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
