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
const NavMenuPage = Loader(
  lazy(() => import('src/components/NavMenuPages/NavMenuPage'))
);
const NavContent = Loader(
  lazy(() => import('src/components/NavbarMenu/NavContent'))
);

const DashBoard = Loader(lazy(() => import('src/componentsWeb/DashBoard/DashBoard')));
const landingRoutes = [
  {
    path: '/',
    element: <Navigate to="Landing" replace />
  },

  {
    path: 'Landing',
    element: <Landing />
  },
  {
    path: 'NavMenuPage',
    element: <NavMenuPage />
  },
  {
    path: 'NavContent',
    element: <NavContent />
  },
];

export default landingRoutes;
