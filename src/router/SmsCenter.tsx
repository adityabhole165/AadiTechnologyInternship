import { Suspense, lazy } from 'react';
import { PartialRouteObject } from 'react-router';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const SMSCenter = Loader(
  lazy(() => import('src/components/SMSCenter/SmsCenter'))
);
const Compose = Loader(lazy(() => import('src/components/SMSCenter/Compose')));
const Received = Loader(
  lazy(() => import('src/components/SMSCenter/Received'))
);
const Sent = Loader(lazy(() => import('src/components/SMSCenter/Sent')));
const Scheduled = Loader(
  lazy(() => import('src/components/SMSCenter/Scheduled'))
);
const ViewScheduledSMS = Loader(
  lazy(() => import('src/components/SMSCenter/ViewScheduledSMS'))
);
const ViewReceiveSMS = Loader(
  lazy(() => import('src/components/SMSCenter/ViewReceiveSMS'))
);
const ViewSent = Loader(
  lazy(() => import('src/components/SMSCenter/ViewSent'))
);
const ContactGroup = Loader(
  lazy(() => import('src/components/SMSCenter/ContactGroup'))
)

const smsCenterRoutes: PartialRouteObject[] = [
  {
    path: 'smsCenter',
    element: <SMSCenter />,
    children: [
      {
        path: '/',
        element: <Received />
      },

      {
        path: 'Received',
        element: <Received />
      },
      {
        path: 'Sent',
        element: <Sent />
      },
      {
        path: 'Scheduled',
        element: <Scheduled />
      }
    ]
  },
  ,
  {
    path: 'ViewScheduledSMS/:DetailsId/:FromURL',
    element: <ViewScheduledSMS />
  },
  {
    path: 'ViewReceiveSMS/:DetailsId',
    element: <ViewReceiveSMS />
  },
  {
    path: 'ViewReceiveSMS/:DetailsId/:FromURL',
    element: <ViewReceiveSMS />
  },
  // /:inputBoxValue /:inputBoxValue'
  // {
  //   path:'To',
  //   element:<To/>
  // },
  {
    path: 'Compose',
    element: <Compose />
  },
  {
    path: 'ViewSent/:DetailsId/:FromURL',
    element: <ViewSent />
  },
  {
    path: 'ContactGroup',
    element: <ContactGroup />
  }

];

export default smsCenterRoutes;
