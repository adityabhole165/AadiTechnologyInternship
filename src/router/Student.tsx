
import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader/index';


const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards
const SubjectTeacher = Loader(lazy(() => import('src/components/SubjectTeacher/SubjectTeacher')))
const SmsCenter = Loader(lazy(() => import('src/components/Student/SMSCenter/SmsCenter')))
const ViewSms = Loader(lazy(() => import('src/components/Student/SMSCenter/ViewSms')))
const Timetable = Loader(lazy(() => import('src/components/TimeTable/Timetable')));
const SentMessage = Loader(lazy(() => import('src/components/MessageCenter/Sent')));
const Viewsent = Loader(lazy(() => import('src/components/MessageCenter/ViewMessage')));
const Homework = Loader(lazy(() => import('src/components/Homework/Homework')));
const Fees = Loader(lazy(() => import('src/components/Fees/Fees')));
const ExamSchedule =  Loader(lazy(() => import('src/components/Examschedule/ExamSchedule')));
const ViewHomework = Loader(lazy(() => import('src/components/Homework/ViewHomework')));
const Attendance = Loader(lazy(() => import('src/components/Attendance/Attendance')));
const Dashboard = Loader(lazy(() => import('src/components/Student/Dashboard/dashboard')));
const Progressreport = Loader(lazy(() => import('src/components/ProgressReport/Progressreport')));
const Library = Loader(lazy(() => import('src/components/Library/Library')));
const Fees_cautionmoney = Loader(lazy(() => import('src/components/Fees/Fees_cautionmoney')));
 const PayOnline = Loader(lazy(()=>import('src/components/Fees/PayOnline')))
const OnlineExamProgressReport=Loader(lazy(() => import('src/components/Online Exam Progress Report/OnlineExamProgressReport')))
const ViewClaim = Loader(lazy(() => import('src/components/Library/Claim')))
const OnlineExam = Loader(lazy(() => import('src/components/OnlineExam/OnlineExam')))
const OnlineExamDetails = Loader(lazy(() => import('src/components/OnlineExam/OnlineExamDetails')))
const Layout = Loader(lazy(() => import('src/components/layout/layout')))
const Profile = Loader(lazy(() => import('src/components/Profile/Profile')))
const TeacherAttendance = Loader(lazy(() => import('src/components/TeacherAttendance/TeacherAttendance')))
const VideoGallery2 = Loader(lazy(() => import('src/components/VideoGallery2/VideoAlbum')))
// const AnnualPlanner2 = Loader(lazy(() => import('src/components/AnnualPlanner2/AnnualPlanner2')))
const Notification= Loader(lazy(() => import('src/components/Notification/Notification')))

const studentRoutes = [
  {
    path: '/',
    element: <Navigate to="holidays" replace />
  },
  {
    path: 'VideoGallery2/VideoAlbum',
    element: <VideoGallery2/>
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
    path: 'Homework/:DateFromHomework',
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
    path: 'Viewhomework/:Id/:SelectedDate',
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
    path: 'PayOnline/:SelectedDueDate',
    element: <PayOnline/>
  },
  {
    path: 'TeacherAttendance',
    element: <TeacherAttendance/>
  },
  {
    path: 'Notification',
    element: <Notification/>
  },
  // {
  //   path: 'AnnualPlanner2',
  //   element: <AnnualPlanner2/>
  // },
  ];

export default studentRoutes;
