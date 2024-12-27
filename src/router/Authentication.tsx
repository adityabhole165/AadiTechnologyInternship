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
//const SchoolList = Loader(lazy(() => import('src/RITeSchool/authentication/schoolList/schoolList')));
const NewRelease = Loader(
  lazy(() => import('src/components/Authentication/NewRelease/NewRelease'))
);
const UpgradeApp = Loader(
  lazy(() => import('src/components/Authentication/NewRelease/UpgradeApp'))
);
const Schoolnotice = Loader(
  lazy(() => import('src/components/SchoolNotice/Schoolnotice'))
);
const ForgotPassword = Loader(
  lazy(() => import('src/components/Authentication/Login/ForgotPassword'))
);
const ViewSchoolNotice = Loader(
  lazy(() => import('src/components/SchoolNotice/Viewschoolnotice'))
);
const TermAndCondition = Loader(
  lazy(
    () =>
      import('src/components/Authentication/TermAndConditions/TermAndCondition')
  )
);
const ChangePassword = Loader(
  lazy(() => import('src/components/ChangePassword/changePassword'))
);

const SchoolList = Loader(
  lazy(() => import('src/components/Authentication/Login/Login'))
);

const NoPage = Loader(
  lazy(() => import('src/components/NoPageError/NoPage'))
);
const AppRating = Loader(
  lazy(() => import('src/components/AppRating/AppRating'))
)

const Sessionlogout = Loader(
  lazy(() => import('src/components/Authentication/Login/Sessionlogout'))
);
const AuthenticationRoute = [
  {
    path: '/',
    element: <Navigate to="schoolList" replace />
  },
  {
    path: '*',
    element: <NoPage />
  },
  {
    path: 'AppRating',
    element: <AppRating />
  },
  {
    path: 'NewRelease',
    element: <NewRelease />
  },
  {
    path: 'UpgradeApp',
    element: <UpgradeApp />
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
  },

  {
    path: 'ChangePassword',
    element: <ChangePassword />
  },

  {
    path: 'TermAndCondition',
    element: <TermAndCondition />
  },

  {
    path: 'Sessionlogout',
    element: <Sessionlogout />
  },

];

export default AuthenticationRoute;
