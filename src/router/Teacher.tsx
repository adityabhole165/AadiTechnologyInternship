import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';


const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const TAttendance = Loader(lazy(() => import('src/components/TAttendance/Tattendance')))
const TExamschedule = Loader(lazy(() => import('src/components/Teacher/TExamschedule/TExamSchedule')))
const TView = Loader(lazy(() => import('src/components/TAttendance/TView')))
const TeacherTimetable = Loader(lazy(() => import('src/components/Teacher/TeacherTimetable/TeacherTimetable')));
const MissingAttandence = Loader(lazy(() => import('src/components/TAttendance/MissingAttandence')))

const teacherRoutes = [
    {
      path: 'TAttendance',
      element: <TAttendance/>
    },
    {
      path:'TAttendance/TView/:assignedDate/:StandardId',
      element:<TView/>
    },
    {
      path: 'TeacherTimetable',
      element: <TeacherTimetable />
    },
   
    {
      path: 'TExamschedule',
      element: <TExamschedule/>
    },
    {
      path: 'TAttendance/MissingAttandence/:assignedDate',
      element: <MissingAttandence/>
    },
    ];
  
  export default teacherRoutes;
  