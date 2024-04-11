import { Suspense, lazy } from 'react';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

const SchoolConfiguration = Loader(lazy(() => import('src/components/SchoolConfiguration')));
const Holidays = Loader(lazy(() => import('src/components/SchoolConfiguration/Holidays')));

const adminRoutes = [
    {
        path: 'SchoolConfiguration',
        element: <SchoolConfiguration />
    },
    {
        path: 'SchoolConfiguration/Holidays',
        element: <Holidays />
    },
];

export default adminRoutes;
