import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import studentRoutes from './Student';
import AuthenticationRoutes from "src/router/Authentication"
import messageCenterRoutes from './MessageCenter';
import landingRoutes from './Landing';
import smsCenterRoutes from './SmsCenter';
import teacherRoutes from './Teacher'
import commonRoutes from './Common';

const router: PartialRouteObject[] = [
  {
    path: '/',
    children: AuthenticationRoutes
  },

  // ExtendedSidebarLayout 

  {
    path: 'extended-sidebar',
    element: (
        <ExtendedSidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/Authentication" replace />
      },
      {
        path:'/landing',
        children:landingRoutes
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
        path:'/MessageCenter',
        children: messageCenterRoutes
      },
      {
        path:'/SMSCenter',
        children: smsCenterRoutes
      },
      {
        path:'/Teacher',
        children: teacherRoutes
      },
      {
        path:'/Common',
        children: commonRoutes
      }

    ]
  }
];

export default router;
