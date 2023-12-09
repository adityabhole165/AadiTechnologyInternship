import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ExamResultBase from 'src/components/ExamResult/ExamResultBase';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';


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
const  SchoolAttendanceOverview= Loader(lazy(() => import('src/components/MyAttendance/SchoolAttendanceOverview')))
const IndidualAttendance= Loader(lazy(() => import('src/components/IndividualAttendance/IndividualAttendance')))
const AddAnnualPlaner = Loader(lazy(() => import('src/components/AnnualPlanner/AddAnnualPlaner')))
const MonthwiseAttandance = Loader(lazy(() => import('src/components/Attendance/MonthwiseAttandance')))
const AssignExamMark= Loader(lazy(() => import('src/components/AssignExamMark/AssignExamMark')))
const AssignHomework= Loader(lazy(() => import('src/components/AssignHomework/AssignHomework')))
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
    {
      path: 'SchoolAttendanceOverview',
      element: <SchoolAttendanceOverview/>
    },
    {
      path: 'IndidualAttendance',
      element: <IndidualAttendance/>
    },
    {
      path: 'AddAnnualPlaner',
      element: <AddAnnualPlaner />
    },{
      path: 'MonthwiseAttendance',
      element: <MonthwiseAttandance/>
    },
    {
      path: 'ExamResult',
      element: <ExamResultBase/>
    },
    {
      path: 'AssignExamMark',
      element: <AssignExamMark/>
    },
    {
      path: 'AssignHomework',
      element: <AssignHomework/>
    },

    ];
  
  export default teacherRoutes;
  