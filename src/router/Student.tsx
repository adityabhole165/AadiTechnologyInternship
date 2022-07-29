
import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';


const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards
const SubjectTeacher = Loader(lazy(() => import('src/Component/Student/SubjectTeacher/SubjectTeacher')))
const SmsCenter = Loader(lazy(() => import('src/Component/Student/SMSCenter/SmsCenter')))
const ViewSms = Loader(lazy(() => import('src/Component/Student/SMSCenter/ViewSms')))
const Timetable = Loader(lazy(() => import('src/Component/Student/TimeTable/Timetable')));
const SentMessage = Loader(lazy(() => import('src/Component/MessageCenter/Sent')));
const Viewsent = Loader(lazy(() => import('src/Component/MessageCenter/ViewMessage')));
const Homework = Loader(lazy(() => import('src/Component/Student/Homework/Homework')));
const Fees = Loader(lazy(() => import('src/Component/Student/Fees/Fees')));
const ExamSchedule =  Loader(lazy(() => import('src/Component/Student/Examschedule/ExamSchedule')));
const ViewHomework = Loader(lazy(() => import('src/Component/Student/Homework/ViewHomework')));
const Attendance = Loader(lazy(() => import('src/Component/Student/Attendance/Attendance')));
const Dashboard = Loader(lazy(() => import('src/Component/Student/Dashboard/dashboard')));
const Progressreport = Loader(lazy(() => import('src/Component/Student/ProgressReport/Progressreport')));
const Library = Loader(lazy(() => import('src/Component/Student/Library/Library')));
const Fees_cautionmoney = Loader(lazy(() => import('src/Component/Student/Fees/Fees_cautionmoney')));
 const PayOnline = Loader(lazy(()=>import('src/Component/Student/Fees/PayOnline')))
const OnlineExamProgressReport=Loader(lazy(() => import('src/Component/Student/Online Exam Progress Report/OnlineExamProgressReport')))
const ViewClaim = Loader(lazy(() => import('src/Component/Student/Library/Claim')))
const OnlineExam = Loader(lazy(() => import('src/Component/Student/OnlineExam/OnlineExam')))
const OnlineExamDetails = Loader(lazy(() => import('src/Component/Student/OnlineExam/OnlineExamDetails')))
const Layout = Loader(lazy(() => import('src/Component/Student/layout/layout')))
const Profile = Loader(lazy(() => import('src/Component/Student/Profile/Profile')))



const studentRoutes = [
  {
    path: '/',
    element: <Navigate to="holidays" replace />
  },

  {
    path: 'Dashboard',
    element: <Dashboard/>
  },
  {
    path: 'Profile',
    element: <Profile/>
  },
  {
    path: 'SubjectTeacher',
    element: <SubjectTeacher />
  },
  {
    path: 'smscenter',
    element: <SmsCenter/>
  },
  {
    path: 'viewsms/:ID',
    element: <ViewSms/>
  },
  {
    path: 'timetable',
    element: <Timetable />
  },
 
  {
    path: 'Sent',
    element: <SentMessage />
  },
  {
    path: 'viewsent/:ID',
    element: <Viewsent/>
  },
  {
    path: 'Homework',
    element: <Homework/>
  },
  {
    path: 'Fees',
    element: <Fees />
  },
  {
    path: 'Fees_cautionmoney',
    element: <Fees_cautionmoney />
  },
 
  {  
    path: 'Viewhomework/:Id',
    element: <ViewHomework />
  },
  {
    path: 'attendance',
    element: <Attendance />
  },
  {
    path: 'Library',
    element: <Library/>
  },
  {
    path: 'Claim',
    element: <ViewClaim/>
  },
  {
    path: 'Progressreport',
    element: <Progressreport />
  },
  {
    path: 'Library',
    element: <Library/>
  },
  {
    path: 'examschedule',
    element: <ExamSchedule />
  },
  {
    path: 'Fees_cautionmoney',
    element: <Fees_cautionmoney />
  },
  {
    path: 'OnlineExamProgressReport',
    element: <OnlineExamProgressReport />
  },
  {
    path: 'OnlineExam',
    element: <OnlineExam/>
  },
  {
    path: 'OnlineExamDetails/:ExamId/:SubjectId',
    element: <OnlineExamDetails/>
  },
  {
    path: 'layout',
    element: <Layout/>
  },
  {
    path: 'PayOnline',
    element: <PayOnline/>
  },
  ];

export default studentRoutes;
