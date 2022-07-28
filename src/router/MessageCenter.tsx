import { PartialRouteObject } from 'react-router';
import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';


const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Trash =  Loader(lazy(() => import('src/Component/MessageCenter/Trash')));
const Composee =  Loader(lazy(() => import('src/Component/MessageCenter/Compose')));
const Inbox =  Loader(lazy(() => import('src/Component/MessageCenter/Inbox')));
const Msgcenter = Loader(lazy(() => import('src/Component/MessageCenter/Messagecenter')));
const Sent = Loader(lazy(() => import('src/Component/MessageCenter/Sent')));
const ViewMsg = Loader(lazy(() => import('src/Component/MessageCenter/ViewMessage')));
const Search=Loader(lazy(()=>import('src/Component/MessageCenter/Search')));

const messageCenterRoutes :PartialRouteObject[] = [

    
    {
      path: 'msgCenter',
      element: ( 
        <Msgcenter/>
      ),
      children: [
        {
            path: '/',
            element: <Inbox />
        },
        {
            path:'Inbox',
            element: <Inbox />
        },
        {
            path:'Trash',
            element: <Trash />
        },
        {
            path:'Sent',
            element: <Sent />
        },
        {
          path:'Search',
          element:<Search/>
        },
        
    ],
    },
    {
        path:'Compose',
        element: <Composee />
    },
    {
        path: 'viewMSg/:ID',
        element: <ViewMsg/>
    },
    {
      path:'Search',
      element:<Search/>
    },
   
   
]

export default messageCenterRoutes;