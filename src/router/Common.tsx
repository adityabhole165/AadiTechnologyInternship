import { Suspense, lazy } from 'react';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// const Holidays1 = Loader(lazy(() => import('src/components/Holidays/Holidays')));

// const Holidays = Loader(lazy(() => import('src/components/SchoolConfiguration/Holidays/index')));

const Schoolnotice = Loader(
  lazy(() => import('src/components/SchoolNotice/Schoolnotice'))
);
const Support = Loader(
  lazy(() => import('src/components/Support/Support1'))
);
const ViewSchoolNotice = Loader(
  lazy(() => import('src/components/SchoolNotice/Viewschoolnotice'))
);
const ChangePassword = Loader(
  lazy(() => import('src/components/ChangePassword/changePassword'))
);
const SiblingLogin = Loader(
  lazy(() => import('src/components/SiblingLogin/SiblingLogin'))
);
const Comments = Loader(
  lazy(() => import('src/components/VideoGallery/Comments'))
);
const Albums = Loader(lazy(() => import('src/components/PhotoGallery/Albums')));
const Photos = Loader(lazy(() => import('src/components/PhotoGallery/photos')));
const Videoview = Loader(
  lazy(() => import('src/components/VideoGallery/videoview'))
);
const VideoGallery = Loader(
  lazy(() => import('src/components/VideoGallery/Video'))
);
const Pta = Loader(lazy(() => import('src/components/PTA/PTA')));
const AnnualPlanner = Loader(
  lazy(() => import('src/components/AnnualPlannerNew/AnnualPlannerBase'))
);
const ViewEvent = Loader(
  lazy(() => import('src/components/AnnualPlanner/ViewEvent'))
);
const StaffBirthday = Loader(
  lazy(() => import('src/components/StaffBirthday/StaffBirthday'))
);
const VideoGallery2 = Loader(
  lazy(() => import('src/components/VideoGallery2/VideoAlbum'))
);
const UpcomingEvent = Loader(
  lazy(() => import('src/components/AnnualPlanner/UpcomingEvent'))
);
const EventOverview = Loader(
  lazy(() => import('src/components/AnnualPlanner/EventOverview'))
);
const EventManagement = Loader(
  lazy(() => import('src/components/EventManagementNew/EventManagement'))
);



const List = Loader(
  lazy(() => import('src/components/InvestmentDeclaration/List'))
)

const commonRoutes = [
  {
    path: 'pta',
    element: <Pta />
  },
  {
    path: 'ChangePassword',
    element: <ChangePassword />
  },
  {
    path: 'SiblingLogin',
    element: <SiblingLogin />
  },
  // {
  //     path: 'VideoGallery',
  //     element: <VideoGallery />
  // },
  {
    path: 'VideoGallery/VideoAlbum',
    element: <VideoGallery2 />
  },
  {
    path: 'Comments/:VideoID/:FromRoute',
    element: <Comments />
  },
  {
    path: 'videoview/:VideoUrl/:VideoID',
    element: <Videoview />
  },
  {
    path: 'PhotoGallery',
    element: <Albums />
  },
  {
    path: 'PhotoGallery/:Month/:Year',
    element: <Albums />
  },
  {
    path: 'Photos/:imgId/:FromRoute/:Month/:Year',
    element: <Photos />
  },
  ,
  {
    path: 'schoolnotice',
    element: <Schoolnotice />
  },
  {
    path: 'ViewSchoolNotice/:ID',
    element: <ViewSchoolNotice />
  },
  // {
  //   path: 'Holidays1',
  //   element: <Holidays1 />
  // },
  // {
  //   path: 'Holidays',
  //   element: <Holidays />
  // },
  {
    path: 'EventOverview',
    element: <EventOverview />
  },
  {
    path: 'AnnualPlanner',
    element: <AnnualPlanner />
  },
  {
    path: 'AnnualPlanner/:selectedDate/:standardId/:divisionId',
    element: <AnnualPlanner />
  },
  {
    path: 'EventOverview/UpcomingEvent',
    element: <UpcomingEvent />
  },

  {
    path: 'EventOverview/:DateFrommon/:DateFromyear/:Pholiday/:Pevent/:Pexam',
    element: <UpcomingEvent />
  },
  {
    path: 'viewevent/:Id/:AssigMonth/:AssigYear',
    element: <ViewEvent />
  },
  {
    path: 'viewevent/:Id/:DateFrommon/:DateFromyear/:holiday/:event/:exam',
    element: <ViewEvent />
  },
  {
    path: 'viewevent/:Id',
    element: <ViewEvent />
  },
  {
    path: 'StaffBirthday',
    element: <StaffBirthday />
  },


  {
    path: 'List',
    element: <List />
  },

  {
    path: 'EventManagementForm/:SelectedDate/:StandardId/:DivisionId',
    element: <EventManagement />
  },
  {
    path: 'Support',
    element: <Support />
  },

];

export default commonRoutes;
