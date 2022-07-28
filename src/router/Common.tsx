import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';


const Loader = (Component) => (props) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

const Holidays = Loader(lazy(() => import('src/Component/Common/Holidays/Holidays')));
const Schoolnotice = Loader(lazy(() => import('src/Component/Common/SchoolNotice/Schoolnotice')));
const ViewSchoolNotice = Loader(lazy(() => import('src/Component/Common/SchoolNotice/Viewschoolnotice')));
const ChangePassword = Loader(lazy(() => import('src/Component/Common/ChangePassword/changePassword')))
const Comments = Loader(lazy(() => import('src/Component/Common/VideoGallery/Comments')))
const Albums = Loader(lazy(() => import('src/Component/Common/PhotoGallery/Albums')))
const Photos = Loader(lazy(() => import('src/Component/Common/PhotoGallery/photos')))
const Videoview = Loader(lazy(() => import('src/Component/Common/VideoGallery/videoview')))
const VideoGallery = Loader(lazy(() => import('src/Component/Common/VideoGallery/Video')))
const Pta = Loader(lazy(() => import('src/Component/Common/PTA/PTA')))
const EventOverview = Loader(lazy(() => import('src/Component/Common/AnnualPlanner/EventOverview')));
const ViewEvent = Loader(lazy(() => import('src/Component/Common/AnnualPlanner/ViewEvent')));
const StaffBirthday = Loader(lazy(() => import('src/Component/Common/StaffBirthday/StaffBirthday')));

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
        path: 'VideoGallery',
        element: <VideoGallery />
    },

    {
        path: 'Comments/:VideoID',
        element: <Comments />
    },
    {
        path: 'videoview/:VideoUrl',
        element: <Videoview />
    },
    {
        path: 'PhotoGallery',
        element: <Albums />
    },
    {
        path: 'Photos/:imgId',
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
        path: 'EventOverview',
        element: <EventOverview />
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
