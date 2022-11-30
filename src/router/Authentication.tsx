import { Suspense, lazy, Component } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards
//const SchoolList = Loader(lazy(() => import('src/RITeSchool/authentication/schoolList/schoolList')));
const Schoolnotice = Loader(lazy(() => import('src/components/SchoolNotice/Schoolnotice')));
const ForgotPassword = Loader(lazy(() => import('src/components/Authentication/Login/ForgotPassword')));
const ViewSchoolNotice = Loader(lazy(() => import('src/components/SchoolNotice/Viewschoolnotice')));

const SchoolList = Loader(lazy(() => import('src/components/Authentication/Login/Login')));

const AuthenticationRoute = [
  {
    path: '/',
    element: <Navigate to="schoolList" replace />
  },
  {
    path: 'schoolList',
    element: <SchoolList />
  },
  {
    path: 'schoolNotice',
    element: <Schoolnotice />
  },
  {
    path: 'forgotPassword',
    element: <ForgotPassword />
  },
  {
    path: 'ViewSchoolNotice/:ID',
    element: <ViewSchoolNotice />
  }

];

export default AuthenticationRoute;
