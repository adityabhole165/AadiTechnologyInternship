import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';


const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// const TAttendance = Loader(lazy(() => import('src/components/TAttendance/Tattendance')))
const TAttendance = Loader(lazy(() => import('src/components/MyAttendance/TAttendance')))
const TExamschedule = Loader(lazy(() => import('src/components/TExamschedule/TExamScheduleNew')))
const TView = Loader(lazy(() => import('src/components/TAttendance/TView')))
const TeacherTimetable = Loader(lazy(() => import('src/components/TeacherTimetable/TeacherTimetable')));
const MissingAttandence = Loader(lazy(() => import('src/components/TAttendance/MissingAttandence')))
const SmsCenter = Loader(lazy(() => import('src/components/Student/SMSCenter/SmsCenter')))

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
      path: 'TAttendance/MissingAttandence/:assignedDate/:StandardId',
      element: <MissingAttandence/>
    },
    {
      path: 'smscenter',
      element: <SmsCenter/>
    },
    {
      path: 'TAttendance/:AssignedDate/:StandardId',
      element: <TAttendance/>
    },
    ];
  
  export default teacherRoutes;
  