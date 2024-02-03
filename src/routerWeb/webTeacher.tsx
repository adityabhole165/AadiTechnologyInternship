import { Suspense, lazy } from 'react';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const DashBoard = Loader(
  lazy(() => import('src/componentsWeb/DashBoard/DashBoard'))
);
const SchoolWeb = Loader(
  lazy(() => import('src/componentsWeb/SchoolWeb/SchoolWeb'))
);
const WebRoutes = [
  {
    path: 'DashBoard',
    element: <DashBoard />
  },

  {
    path: 'SchoolWeb',
    element: <SchoolWeb />
  }
];

export default WebRoutes;
