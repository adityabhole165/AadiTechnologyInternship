import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import PayinternalFees from 'src/components/Fees/PayinternalFees';

import SuspenseLoader from 'src/layouts/components/SuspenseLoader/index';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards
const SubjectTeacher = Loader(
  lazy(() => import('src/components/SubjectTeacher/SubjectTeacher'))
);
const SmsCenter = Loader(
  lazy(() => import('src/components/Student/SMSCenter/SmsCenter'))
);
const ViewSms = Loader(
  lazy(() => import('src/components/Student/SMSCenter/ViewSms'))
);
const Timetable = Loader(
  lazy(() => import('src/components/TimeTable/Timetable'))
);
const SentMessage = Loader(
  lazy(() => import('src/components/MessageCenter/Sent'))
);
const Viewsent = Loader(
  lazy(() => import('src/components/MessageCenter/ViewMessage'))
);
const Homework = Loader(lazy(() => import('src/components/Homework/Homework')));
const Fees = Loader(lazy(() => import('src/components/Fees/Fees')));
const ExamSchedule = Loader(
  lazy(() => import('src/components/TExamschedule/TExamScheduleNew'))
);
const ViewHomework = Loader(
  lazy(() => import('src/components/Homework/ViewHomework'))
);
const Attendance = Loader(
  lazy(() => import('src/components/Attendance/Attendance'))
);
const Dashboard = Loader(
  lazy(() => import('src/components/Student/Dashboard/dashboard'))
);
const Progressreport = Loader(
  lazy(() => import('src/components/ProgressReport/Progressreport'))
);
const Library = Loader(lazy(() => import('src/components/Library/Library')));
const Bookswithme = Loader(
  lazy(() => import('src/components/Library/Bookswithme'))
);
const Fees_cautionmoney = Loader(
  lazy(() => import('src/components/Fees/Fees_cautionmoney'))
);
const PayOnline = Loader(lazy(() => import('src/components/Fees/PayOnline')));
const OnlineExamProgressReport = Loader(
  lazy(
    () =>
      import(
        'src/components/Online Exam Progress Report/OnlineExamProgressReport'
      )
  )
);
const ClaimedBook = Loader(
  lazy(() => import('src/components/Library/ClaimedBook'))
);
const OnlineExam = Loader(
  lazy(() => import('src/components/OnlineExam/OnlineExam'))
);
const OnlineExamDetails = Loader(
  lazy(() => import('src/components/OnlineExam/OnlineExamDetails'))
);
const Layout = Loader(lazy(() => import('src/components/layout/layout')));
const Profile = Loader(lazy(() => import('src/components/Profile/Profile')));

const VideoGallery2 = Loader(
  lazy(() => import('src/components/VideoGallery2/VideoAlbum'))
);
const Notification = Loader(
  lazy(() => import('src/components/Notification/Notification'))
);
const Feedback = Loader(lazy(() => import('src/components/Feedback/Feedback')));
const AddFeedback = Loader(
  lazy(() => import('src/components/Feedback/AddFeedback'))
);
const TransportDetails = Loader(
  lazy(() => import('src/components/TransportDetails/TransportDetails'))
);
const Support = Loader(lazy(() => import('src/components/Support/Support')));
const Birthdays = Loader(
  lazy(() => import('src/components/Birthdays/Birthdays'))
);
const UploadParentPhoto = Loader(
  lazy(() => import('src/components/UploadParentPhoto/UploadParentPhoto'))
);
const AadharCardDetails = Loader(
  lazy(() => import('src/components/AadharCardDetails/AadharCardDetails'))
);
const QueAns = Loader(lazy(() => import('src/components/OnlineExam/QueAns')));
const IncomeTaxReport = Loader(
  lazy(() => import('src/components/IncomeTaxReport/IncomeTaxReport'))
);
const AttendanceTopper = Loader(
  lazy(() => import('src/components/Attendance/AttendanceTopper'))
);
const EditProfile = Loader(
  lazy(() => import('src/components/Profile/EditProfile'))
);
const TransportCommittee = Loader(
  lazy(() => import('src/components/TransportCommittee/TransportCommittee'))
);
const InternalFeePayment = Loader(
  lazy(() => import('src/components/Fees/PayinternalFees'))
);
const HomeworkNew = Loader(
  lazy(() => import('src/components/Homework/HomeworkNew'))
);
const NavbarMenus = Loader(
  lazy(() => import('src/components/NavbarMenu/NavBarMenus'))
);
const Map = Loader(lazy(() => import('src/components/TransportDetails/Map')));
const Googlemap = Loader(
  lazy(() => import('src/components/TransportDetails/Googlemap'))
);
const SchoolWeb = Loader(
  lazy(() => import('src/componentsWeb/SchoolWeb/SchoolWeb'))
);
const DailyLogs = Loader(
  lazy(() => import('src/components/Homework/DailyLogs'))
);
const GenerateChallan = Loader(
  lazy(() => import('src/components/Fees/GenerateChallan'))
);
const studentRoutes = [
  {
    path: '/',
    element: <Navigate to="holidays" replace />
  },
  {
    path: 'holidays',
    element: <div>Holidays</div>
  },
  {
    path: 'VideoGallery2/VideoAlbum',
    element: <VideoGallery2 />
  },

  {
    path: 'Dashboard',
    element: <Dashboard />
  },

  {
    path: 'Profile',
    element: <Profile />
  },
  {
    path: 'Profile/EditProfile',
    element: <EditProfile />
  },
  {
    path: 'SubjectTeacher',
    element: <SubjectTeacher />
  },
  {
    path: 'smscenter',
    element: <SmsCenter />
  },
  {
    path: 'viewsms/:SMS_Id',
    element: <ViewSms />
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
    element: <Viewsent />
  },
  {
    path: 'Homework/DailyLogs',
    element: <DailyLogs />
  },

  {
    path: 'Homework',
    element: <Homework />
  },
  {
    path: 'Homework/:DateFromHomework',
    element: <Homework />
  },
  {
    path: 'Fees',
    element: <Fees />
  },
  {
    path: 'Fees/:ActiveYear/:InternalOrSchool',
    element: <Fees />
  },
  {
    path: 'Fees/PayinternalFees',
    element: <PayinternalFees />
  },
  {
    path: 'Fees_cautionmoney',
    element: <Fees_cautionmoney />
  },
  {
    path: 'Fees/ChallanSNSForFees',
    element: <GenerateChallan />
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
    path: 'Attendance/AttendanceTopper',
    element: <AttendanceTopper />
  },
  {
    path: 'Library',
    element: <Library />
  },
  {
    path: 'Library/Bookswithme',
    element: <Bookswithme />
  },
  {
    path: 'Library/ClaimedBook',
    element: <ClaimedBook />
  },
  {
    path: 'Progressreport',
    element: <Progressreport />
  },
  {
    path: 'Library',
    element: <Library />
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
    element: <OnlineExam />
  },
  {
    path: 'OnlineExamDetails/:ExamId/:SubjectId',
    element: <OnlineExamDetails />
  },
  {
    path: 'QueAns',
    element: <QueAns />
  },
  {
    path: 'layout',
    element: <Layout />
  },
  {
    path: 'PayOnline/:ActiveYear/:InternalOrSchool',
    element: <PayOnline />
  },
  {
    path: 'PayOnline/:SelectedDueDate/:feeId/:currentYear/:ApplicableFee/:TotalLateFee/:advanceFeelist',
    element: <PayOnline />
  },
  {
    path: 'PayOnline/:SelectedDueDate/:feeId/:currentYear/:IsForCurrentyear/:OldYearwiseStudentId',
    element: <PayOnline />
  },
  {
    path: 'PayOnline/:SelectedDueDate/:feeId/:currentYear',
    element: <PayOnline />
  },
  {
    path: 'Notification',
    element: <Notification />
  },
  // {
  //   path: 'Jsonholder',
  //   element: <Jsonholder/>
  // },
  {
    path: 'Feedback',
    element: <Feedback />
  },
  {
    path: 'AddFeedback',
    element: <AddFeedback />
  },
  {
    path: 'TransportDetails',
    element: <TransportDetails />
  },
  {
    path: 'Googlemap',
    element: <Googlemap />
  },

  {
    path: 'TransportDetails/:PickDrop',
    element: <TransportDetails />
  },
  {
    path: 'TransportDetails/Map/:PickDrop/:alignment',
    element: <Map />
  },
  {
    path: 'Support',
    element: <Support />
  },

  {
    path: 'Birthdays',
    element: <Birthdays />
  },

  {
    path: 'UploadParentPhoto',
    element: <UploadParentPhoto />
  },

  {
    path: 'AadharCardDetails',
    element: <AadharCardDetails />
  },

  {
    path: 'IncomeTaxReport',
    element: <IncomeTaxReport />
  },

  {
    path: 'TransportCommittee',
    element: <TransportCommittee />
  },
  {
    path: 'HomeworkNew',
    element: <HomeworkNew />
  },

  {
    path: 'NavbarMenus',
    element: <NavbarMenus />
  },

  {
    path: 'SchoolWeb',
    element: <SchoolWeb />
  }
];

export default studentRoutes;
