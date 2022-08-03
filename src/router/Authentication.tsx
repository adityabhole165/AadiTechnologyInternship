import { Suspense, lazy, Component } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards
//const SchoolList = Loader(lazy(() => import('src/RITeSchool/authentication/schoolList/schoolList')));
const SchoolNotice = Loader(lazy(() => import('src/components/Authentication/SchoolNotice/LoginSchoolNotice')));
const ViewSchoolNotice = Loader(lazy(() => import('src/components/Authentication/SchoolNotice/LoginViewSchoolNotice')));

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
    element: <SchoolNotice />
  },
  {
    path: 'LoginViewSchoolNotice/:ID',
    element: <ViewSchoolNotice />
  }

];

export default AuthenticationRoute;
