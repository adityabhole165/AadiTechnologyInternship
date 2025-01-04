import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import AuthenticationRoutes from 'src/router/Authentication';
import adminRoutes from './adminRoutes';
import commonRoutes from './Common';
import landingRoutes from './Landing';
import messageCenterRoutes from './MessageCenter';
import PrivateRoute from './PrivateRoute';
import smsCenterRoutes from './SmsCenter';
import studentRoutes from './Student';
import teacherRoutes from './Teacher';

const router: PartialRouteObject[] = [
    {
        path: '/',
        children: AuthenticationRoutes,
    },
    {
        path: 'RITeSchool',
        element: <ExtendedSidebarLayout />,
        children: [
            { path: '/', element: <Navigate to="/Authentication" replace /> },
            {
                path: '/landing',
                element: <PrivateRoute />,
                children: landingRoutes,
            },
            {
                path: '/Student',
                element: <PrivateRoute />,
                children: studentRoutes,
            },
            {
                path: '/Authentication',
                children: AuthenticationRoutes,
            },
            {
                path: '/MessageCenter',
                element: <PrivateRoute />,
                children: messageCenterRoutes,
            },
            {
                path: '/SMSCenter',
                element: <PrivateRoute />,
                children: smsCenterRoutes,
            },
            {
                path: '/Teacher',
                element: <PrivateRoute />,
                children: teacherRoutes,
            },
            {
                path: '/Common',
                element: <PrivateRoute />,
                children: commonRoutes,
            },
            {
                path: '/Admin',
                element: <PrivateRoute />,
                children: adminRoutes,
            },
        ],
    },
];

export default router;





// import { PartialRouteObject } from 'react-router';
// import { Navigate } from 'react-router-dom';
// import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
// import AuthenticationRoutes from 'src/router/Authentication';
// import commonRoutes from './Common';
// import landingRoutes from './Landing';
// import messageCenterRoutes from './MessageCenter';
// import smsCenterRoutes from './SmsCenter';
// import studentRoutes from './Student';
// import teacherRoutes from './Teacher';
// import adminRoutes from './adminRoutes';

// const router: PartialRouteObject[] = [
//   {
//     path: '/',
//     children: AuthenticationRoutes
//   },

//   // ExtendedSidebarLayout

//   {
//     path: 'RITeSchool',
//     element: <ExtendedSidebarLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Navigate to="/Authentication" replace />
//       },
//       {
//         path: '/landing',
//         children: landingRoutes
//       },
//       {
//         path: '/Student',
//         children: studentRoutes
//       },
//       {
//         path: '/Authentication',
//         children: AuthenticationRoutes
//       },
//       {
//         path: '/MessageCenter',
//         children: messageCenterRoutes
//       },
//       {
//         path: '/SMSCenter',
//         children: smsCenterRoutes
//       },
//       {
//         path: '/Teacher',
//         children: teacherRoutes
//       },
//       {
//         path: '/Common',
//         children: commonRoutes
//       },
//       {
//         path: '/Admin',
//         children: adminRoutes
//       }
//     ]
//   }
// ];

// export default router;

