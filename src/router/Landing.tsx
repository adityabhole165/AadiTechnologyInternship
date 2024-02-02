import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards
const Landing = Loader(lazy(() => import('src/components/Dashboard/index')));

const landingRoutes = [
  {
    path: '/',
    element: <Navigate to="Landing" replace />
  },

  {
    path: 'Landing',
    element: <Landing />
  }
];

export default landingRoutes;
