import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import VideoAlbum from 'src/components/VideoGallery2/VideoAlbum';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';


const Loader = (Component) => (props) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

const Holidays = Loader(lazy(() => import('src/components/Holidays/Holidays')));
const Schoolnotice = Loader(lazy(() => import('src/components/SchoolNotice/Schoolnotice')));
const ViewSchoolNotice = Loader(lazy(() => import('src/components/SchoolNotice/Viewschoolnotice')));
const ChangePassword = Loader(lazy(() => import('src/components/ChangePassword/changePassword')))
const SiblingLogin = Loader(lazy(() => import('src/components/SiblingLogin/SiblingLogin')))
const Comments = Loader(lazy(() => import('src/components/VideoGallery/Comments')))
const Albums = Loader(lazy(() => import('src/components/PhotoGallery/Albums')))
const Photos = Loader(lazy(() => import('src/components/PhotoGallery/photos')))
const Videoview = Loader(lazy(() => import('src/components/VideoGallery/videoview')))
const VideoGallery = Loader(lazy(() => import('src/components/VideoGallery/Video')))
const Pta = Loader(lazy(() => import('src/components/PTA/PTA')))
const EventOverview = Loader(lazy(() => import('src/components/AnnualPlanner/EventOverview')));
const ViewEvent = Loader(lazy(() => import('src/components/AnnualPlanner/ViewEvent')));
const StaffBirthday = Loader(lazy(() => import('src/components/StaffBirthday/StaffBirthday')));
const VideoGallery2 = Loader(lazy(() => import('src/components/VideoGallery2/VideoAlbum')))
const UpcomingEvent = Loader(lazy(()=> import('src/components/AnnualPlanner/UpcomingEvent')))
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
        element: <VideoGallery2/>
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
    {
        path: 'Holidays',
        element: <Holidays />
    },
    {
        path: 'EventOverview/:DateFrommon/:DateFromyear',
        element: <EventOverview />
    },
    {
        path: 'EventOverview',
        element: <EventOverview />
    },

    {
        path: 'EventOverview/UpcomingEvent',
        element: <UpcomingEvent/>
      },
      {
          path: 'viewevent/:Id/:AssigMonth/:AssigYear',
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
]

export default commonRoutes;
