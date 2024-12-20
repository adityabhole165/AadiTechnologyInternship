import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import AuthenticationRoutes from 'src/router/Authentication';
import commonRoutes from './Common';
import landingRoutes from './Landing';
import messageCenterRoutes from './MessageCenter';
import smsCenterRoutes from './SmsCenter';
import studentRoutes from './Student';
import teacherRoutes from './Teacher';
import adminRoutes from './adminRoutes';

const router: PartialRouteObject[] = [
  {
    path: '/',
    children: AuthenticationRoutes
  },

  // ExtendedSidebarLayout

  {
    path: 'RITeSchool',
    element: <ExtendedSidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/Authentication" replace />
      },
      {
        path: '/landing',
        children: landingRoutes
      },
      {
        path: '/Student',
        children: studentRoutes
      },
      {
        path: '/Authentication',
        children: AuthenticationRoutes
      },
      {
        path: '/MessageCenter',
        children: messageCenterRoutes
      },
      {
        path: '/SMSCenter',
        children: smsCenterRoutes
      },
      {
        path: '/Teacher',
        children: teacherRoutes
      },
      {
        path: '/Common',
        children: commonRoutes
      },
      {
        path: '/Admin',
        children: adminRoutes
      }
    ]
  }
];

export default router;
