import { PartialRouteObject } from 'react-router';
import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';


const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Trash =  Loader(lazy(() => import('src/components/MessageCenter/Trash')));
const Composee =  Loader(lazy(() => import('src/components/MessageCenter/Compose')));
const Inbox =  Loader(lazy(() => import('src/components/MessageCenter/Inbox')));
const Msgcenter = Loader(lazy(() => import('src/components/MessageCenter/MessageList')));
const Sent = Loader(lazy(() => import('src/components/MessageCenter/Sent')));
const ViewMsg = Loader(lazy(() => import('src/components/MessageCenter/ViewMessage')));
const Search=Loader(lazy(()=>import('src/components/MessageCenter/Search')));
const Recipients = Loader(lazy(() => import('src/components/MessageCenter/Recipients')));



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
      path:'Compose', // Compose
      element: <Composee />
  },
  {
    path:'Compose/Recipients', // Compose
    element: <Recipients />
},
  // {
  //     path:'Compose/Forward/:Text/:BODY',
  //     element: <Composee />
  // },
  {
      path:'Compose/Forward/:Text/:AttachmentArray/:BODY', // Forward
      element: <Composee />
  },
    {
      path:'Compose/Reply/:From/:Text/:AttachmentArray/:BODY/:FromUserID', // Reply
      element: <Composee />
  },

    {
        path: 'viewMSg/:ID/:FromRoute',
        element: <ViewMsg/>
    },
    {
      path:'Search',
      element:<Search/>
    },
   
]

export default messageCenterRoutes;