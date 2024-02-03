import { Suspense } from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import AuthenticationRoutes from 'src/router/Authentication';
import WebRoutes from './webTeacher';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const routerWeb: PartialRouteObject[] = [
  {
    path: '/',
    children: AuthenticationRoutes
  },

  // ExtendedSidebarLayout

  {
    path: 'extended-sidebar',
    element: <ExtendedSidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/Authentication" replace />
      },

      {
        path: '/webTeacher',
        children: WebRoutes
      }
    ]
  }
];

export default routerWeb;
