
import { Suspense, lazy } from 'react';
import PageHeader from 'src/components/CommonPageHead/PageHeader';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

const SchoolConfiguration = Loader(lazy(() => import('src/components/SchoolConfiguration')));
const Holidays = Loader(lazy(() => import('src/components/SchoolConfiguration/Holidays')));
const AddHoliday = Loader(lazy(() => import('src/components/SchoolConfiguration/Holidays/AddHoliday')));

const adminRoutes = [
    {
        path: 'SchoolConfiguration',
        element: <SchoolConfiguration />
    },
    {
        path: 'SchoolConfiguration/Holidays',
        element: <Holidays />
    },
    {
        path: 'SchoolConfiguration/AddHoliday',
        element: <AddHoliday />
    },
    {
        path: 'SchoolConfiguration/PageHeader',
        element: <PageHeader heading={''} />
    },
];

export default adminRoutes;
