import { Suspense, lazy } from 'react';
import ExamResultBase from 'src/components/ExamResult/ExamResultBase';
import AddLeaveDetails from 'src/components/LeaveDetails/AddLeaveDetails';
import LeaveDetailsBaseScreen from 'src/components/LeaveDetails/LeaveDetailsBaseScreen';

import TransferOptionalSubjectMarks from 'src/components/TransferOptionalSubjectMarks/TransferOptionalSubjectMarks';

import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { Constants } from 'src/utils/hooks/constants/Constants';
import { ProtectedRoute } from './RouteProtection';



const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Adityas Code
const HolidayNew = Loader(
  lazy(() => import('src/components/HolidayAdityas/HolidayNew'))
);
const Holiday = Loader(
  lazy(() => import('src/components/HolidayAdityas/Holiday'))
);

const AddHoliday = Loader(
  lazy(() => import('src/components/HolidayAdityas/AddHoliday'))
);

const AttendenceBaseScreen = Loader(
  lazy(() => import('src/components/AttendenceBaseScreen/BaseScreen'))
);
const Monthwise = Loader(
  lazy(() => import('src/components/AttendenceBaseScreen/Monthwise'))
);




















































const Landing = Loader(lazy(() => import('src/components/Dashboard/index')));

// const TAttendance = Loader(lazy(() => import('src/components/TAttendance/Tattendance')))
const PerformanceGradeAssignmentBaseScreen = Loader(
  lazy(
    () =>
      import(
        'src/components/PerformanceGradeAssignment/PerformanceGradeAssignmentBaseScreen'
      )
  )
);

const TAttendance = Loader(
  lazy(() => import('src/components/MyAttendance/TAttendance'))
);
const StudentProgressReport = Loader(
  lazy(() => import('src/components/FinalResult/StudentProgressReport'))
);
const LeaveDetails = Loader(
  lazy(() => import('src/components/LeaveDetails/LeaveDetailsBaseScreen'))
);
const TExamschedule = Loader(
  lazy(() => import('src/components/TExamschedule/TExamScheduleNew'))
);
const TView = Loader(lazy(() => import('src/components/TAttendance/TView')));
const TeacherTimetable = Loader(
  lazy(() => import('src/components/TeacherTimetable/TeacherTimetable'))
);
const MissingAttandence = Loader(
  lazy(() => import('src/components/TAttendance/MissingAttandence'))
);
const SmsCenter = Loader(
  lazy(() => import('src/components/Student/SMSCenter/SmsCenter'))
);
const ComposeSMS = Loader(
  lazy(() => import('src/components/Student/SMSCenter/ComposeSMS'))
);
const SchoolAttendanceOverview = Loader(
  lazy(() => import('src/components/MyAttendance/SchoolAttendanceOverview'))
);
const IndidualAttendance = Loader(
  lazy(() => import('src/components/IndividualAttendance/IndividualAttendance'))
);
const AddAnnualPlaner = Loader(
  lazy(() => import('src/components/AnnualPlanner/AddAnnualPlaner'))
);
const PerformanceEvaluation = Loader(
  lazy(
    () =>
      import('src/components/PerformanceGradeAssignment/PerformanceEvaluation')
  )
);
const MonthwiseAttandance = Loader(
  lazy(() => import('src/components/Attendance/MonthwiseAttandance'))
);
const AssignExamMark = Loader(
  lazy(() => import('src/components/AssignExamMark/AssignExamMark'))
);
const AnnualPlanerBaseScreen = Loader(
  lazy(() => import('src/components/AnnualPlanner/AnnualPlanerBaseScreen'))
);
const AssignHomework = Loader(
  lazy(() => import('src/components/AssignHomework/AssignHomework'))
);
const TermwiseHeightWeight = Loader(
  lazy(() => import('src/components/TermwiseHeightWeight/TermwiseHeightWeight'))
);
const AddDailyLog = Loader(
  lazy(() => import('src/components/AddDailyLog/AddDailyLog'))
);
const SubjectExamMarks = Loader(
  lazy(() => import('src/components/ExamResult/SubjectExamMarks'))
);
const EventManegement = Loader(
  lazy(() => import('src/components/EventManegement/EventManegement'))
);
const SubjectListmainpage = Loader(
  lazy(() => import('src/components/Subjectexammark/SubjectListmainpage'))
);
const AssignPrePrimaryGrades = Loader(
  lazy(
    () => import('src/components/AssignPrePrimaryGrades/AssignPrePrimaryGrades')
  )
);
const ProgressRemarks = Loader(
  lazy(() => import('src/components/ProgressRemarks/ProgressRemarks'))
);
const ViewProgressReport = Loader(
  lazy(() => import('src/components/ViewProgressReport/ViewProgressReport'))
);
const FinalResult = Loader(
  lazy(() => import('src/components/FinalResult/FinalResult'))
);
const StudentRecords = Loader(
  lazy(() => import('src/components/StudentRecords/StudentRecordBaseScreen'))
);
const AddStudentRecord = Loader(
  lazy(() => import('src/components/StudentRecords/AddStudentRecord'))
);
const StudentRecordComment = Loader(
  lazy(() => import('src/components/StudentRecords/StudentRecordComment'))
);

const FinalResultToppers = Loader(
  lazy(() => import('src/components/FinalResult/FinalResultToppers'))
);
const ExamResultUnpublish = Loader(
  lazy(() => import('src/components/ExamResultUnpublish/ExamResultUnpublish'))
);
const AddHomework = Loader(
  lazy(() => import('src/components/AssignHomework/AddHomework'))
);

const StandardToppers = Loader(
  lazy(() => import('src/components/FinalResult/StandardToppers'))
);
const HomeworkSubjectList = Loader(
  lazy(() => import('src/components/AssignHomework/HomeworkSubjectList'))
);
const HomeworkDocuments = Loader(
  lazy(() => import('src/components/AssignHomework/HomeworkDocuments '))
);
const ViewHomework = Loader(
  lazy(() => import('src/components/AssignHomework/ViewHomework'))
);
const AddUnpublish = Loader(
  lazy(() => import('src/components/AssignHomework/AddUnpublish'))
);
const FinalResultUnpublish = Loader(
  lazy(() => import('src/components/FinalResultUnpublish/FinalResultUnpublish'))
);

const AddLessonPlan = Loader(
  lazy(() => import('src/components/LessonPlan/AddLessonPlan'))
);
const LessonPlanBaseScreen = Loader(
  lazy(() => import('src/components/LessonPlan/LessonPlanBaseScreen'))
);
const PrePrimaryResult = Loader(
  lazy(() => import('src/components/PrePrimaryResult/PrePrimaryResult'))
);
const Requisition = Loader(
  lazy(() => import('src/components/Requisition/Requisition'))
);
const AddRequisition = Loader(
  lazy(() => import('src/components/Requisition/AddRequisition'))
);
// const UnpublishPrePrimaryResult = Loader(
//   lazy(
//     () => import('src/components/PrePrimaryResult/UnpublishPrePrimaryResult')
//   )
// );
const AddUnpublish1 = Loader(
  lazy(() => import('src/components/AssignHomework/AddUnpublish1'))
);
const AadharCard = Loader(
  lazy(() => import('src/components/NewAadharcard/AadharCard'))
);
const WeeklyTimetable = Loader(
  lazy(() => import('src/components/WeeklyTimetable/WeeklyTimetable'))
);
// const ExamResultToppers = Loader(
//   lazy(() => import('src/components/ExamResult/ExamResultToppers'))
// )
const AssignProgressReportSubject = Loader(
  lazy(
    () =>
      import(
        'src/components/AssignPrePrimaryGrades/AssignProgressReportSubject'
      )
  )
);
const AssignPrePrimarySubjectGrades = Loader(
  lazy(
    () =>
      import(
        'src/components/AssignPrePrimaryGrades/AssignPrePrimarySubjectGrades'
      )
  )
);

const Toppers = Loader(lazy(() => import('src/components/ExamResult/Toppers')));
const SubjectMarkList = Loader(
  lazy(() => import('src/components/ExamResult/SubjectMarkList'))
);

const AddHomeworkNew = Loader(
  lazy(() => import('src/components/AddHomeworkNew/AddHomeworkNew'))
);
const ViewResultAll = Loader(
  lazy(() => import('src/components/ViewResultAll/ViewResultAll'))
);
const ViewFinalResult = Loader(
  lazy(() => import('src/components/ViewFinalResult/ViewFinalResult'))
);
const GenerateAll = Loader(
  lazy(() => import('src/components/FinalResult/FinalResultGenerateAll'))
);

const ProgressReportNew = Loader(
  lazy(() => import('src/components/ProgressReportNew/ProgressReportNew'))
);

const Studentwiseprogressreport = Loader(
  lazy(
    () =>
      import(
        'src/components/StudentWiseProgressReport/Studentwiseprogressreport'
      )
  )
);
const AllNoticeList = Loader(
  lazy(() => import('src/components/AddSchoolNitice/AllNoticeList'))
);
const SchoolNoticeBasescreen = Loader(
  lazy(() => import('src/components/AddSchoolNitice/SchoolNoticeBasescreen'))
);
const AddSchoolNotice = Loader(
  lazy(() => import('src/components/AddSchoolNitice/AddSchoolNotice1'))
);
const AddSchoolNoticeFT = Loader(
  lazy(() => import('src/components/AddSchoolNitice/AddSchoolNoticeFT'))
);

const InvestmentDeclaration = Loader(
  lazy(
    () => import('src/components/InvestmentDeclaration/InvestmentDeclaration')
  )
);
const InvestmentDetailsDocument = Loader(
  lazy(
    () =>
      import('src/components/InvestmentDeclaration/InvestmentDetailsDocument')
  )
);
const RequistionView = Loader(
  lazy(() => import('src/components/Requisition/RequistionView'))
);
const ViewLeaveDetails = Loader(
  lazy(() => import('src/components/LeaveDetails/ViewLeaveDetails'))
);

const PerEvalViewReport = Loader(
  lazy(
    () => import('src/components/PerformanceGradeAssignment/PerfEvalViewReport')
  )
);
const PersonalAddressBook = Loader(
  lazy(
    () =>
      import('src/components/SMSCenter/PersonalAddressBook/PersonalAddressBook')
  )
);

const PreprimaryProgressReport = Loader(
  lazy(
    () =>
      import('src/components/PreprimaryProgressReport/PreprimaryProgressReport')
  )
);
const PreprimaryProgressReport1 = Loader(
  lazy(
    () =>
      import('src/components/PreprimaryProgressReport/PreprimaryProgressReport1')
  )
);
const StudentwiseprogressreportEdit = Loader(
  lazy(
    () =>
      import(
        'src/components/StudentWiseProgressReport/StudentwiseprogressreportEdit'
      )
  )
);
const PreprimaryProgressReportView = Loader(
  lazy(
    () =>
      import(
        'src/components/StudentWiseProgressReport/PreprimaryProgressReportView'
      )
  )
);
const StudentBaseScreen = Loader(
  lazy(() => import('src/components/Students/StudentBaseScreen'))
);
const LibraryBaseScreen = Loader(
  lazy(() => import('src/components/SchoolLibrary/LibraryBaseScreen'))
);
const ClaimedBookDetailsPage = Loader(
  lazy(() => import('src/components/SchoolLibrary/ClaimedBookDetailsPage'))
);
const ViewSmsNew = Loader(
  lazy(() => import('src/components/SentSms/ViewSmsNew'))
);
const DashBoard = Loader(
  lazy(() => import('src/componentsWeb/DashBoard/DashBoard'))
);

const ExamScheduleBasescreen = Loader(
  lazy(() => import('src/components/FullAccessPages/ExamScheduleBasescreen'))
);
const ViewExamSchedule = Loader(
  lazy(() => import('src/components/FullAccessPages/ViewExamSchedule'))
);
const ReceivedSMSOwn = Loader(
  lazy(() => import('src/components/Student/SMSCenter/RecievedSms'))
);

const StudentRegistrationForms = Loader(
  lazy(() => import('src/components/Students/StudentRegistrationForms'))
);
const EnterStudentSiblingDetails = Loader(
  lazy(() => import('src/components/Students/EnterStudentSiblingDetails'))
);
const StandardwiseExamSchedule = Loader(
  lazy(() => import('src/components/FullAccessPages/StandardwiseExamSchedule'))
);
const PhotoVideoGalleryBaseScreen = Loader(
  lazy(
    () => import('src/components/PhotoVideoGallery/PhotoVideoGalleryBaseScreen')
  )
);
const AddNewPhoto = Loader(
  lazy(() => import('src/components/PhotoVideoGallery/AddNewPhoto'))
);
const AddNewVideo = Loader(
  lazy(() => import('src/components/PhotoVideoGallery/AddNewVideo'))
);
const ViewPhotoFile = Loader(
  lazy(() => import('src/components/PhotoVideoGallery/ViewPhotoFile'))
);
const ViewVideoGallery = Loader(
  lazy(() => import('src/components/PhotoVideoGallery/ViewVideoGallery'))
);
const BlockProgressReportBaseScreen = Loader(
  lazy(
    () =>
      import('src/components/BlockProgressReport/BlockProgressReportBaseScreen')
  )
);
const FeedbackDetailsBasescreen = Loader(
  lazy(() => import('src/components/FeedbackDetails/FeedbackDetailsBasescreen'))
);
const StudentDetailsExam = Loader(
  lazy(() => import('src/components/StudentDetails/StudentDetailsExam'))
);
const StudentDetailsAttendance = Loader(
  lazy(() => import('src/components/StudentDetails/StudentDetailsAttendance'))
);
// src\components\ADemo\FeeDemo.tsx
const FeeDemo = Loader(
  lazy(() => import('src/components/ADemo/FeeDemo'))
);
const AttendanceTopperspage = Loader(
  lazy(() => import('src/components/StudentDetails/AttendanceTopperspage'))
);
const ExportStudentMarksBaseScreen = Loader(
  lazy(() => import('src/components/ExportStudentMarks/ExportStudentMarksBaseScreen'))
);
const UserDocumentDetailsBaseScreen = Loader(
  lazy(() => import('src/components/UserDocumentDetails/UserDocumentDetailsBaseScreen'))
);
const NoticeBoardBaseScreen = Loader(
  lazy(() => import('src/components/NoticeBoard/NoticeBoardBaseScreen'))
);
const RegenarateRollNo = Loader(
  lazy(() => import('src/components/RegenarateRollNo/RegenarateRollNo'))
);
const UserManagementBasescreen = Loader(
  lazy(() => import('src/components/UserManagment/UserManagementBasescreen'))
);
const StudentDetailsBaseScreen = Loader(
  lazy(() =>
    import('src/components/StudentDetails/StudentDetailsBaseScreen').then(
      (module) => ({ default: module.StudentDetailsBaseScreen })
    )
  )
);
const ScreenID = Constants.ScreenId;
const teacherRoutes = [

  {
    path: 'HolidayNew',
    element: <HolidayNew />
  },
  {
    path: 'Holiday',
    element: <Holiday />
  },
  {
    path: 'AddHoliday',
    element: <AddHoliday />
  },
  {
    path: 'AttendenceBaseScreen',
    element: <AttendenceBaseScreen />
  },
  {
    path: 'Monthwise',
    element: <Monthwise />
  },


















































































  {
    path: 'WebDashBoard',
    element: <DashBoard />
  },

  {
    path: 'LeaveDetails',
    element: <ProtectedRoute component={LeaveDetailsBaseScreen} /> // <LeaveDetailsBaseScreen />
  },
  {
    path: 'StudentRegistrationForms',
    element: <ProtectedRoute component={StudentRegistrationForms} /> // <StudentRegistrationForms />
  },
  {
    path: 'StudentRegistrationForms/:PageID',
    element: <ProtectedRoute component={StudentRegistrationForms} /> // <StudentRegistrationForms />
  },
  {
    path: 'StudentRegistrationForms/:BackN_Student_Ids',
    element: <ProtectedRoute component={StudentRegistrationForms} /> // <StudentRegistrationForms />
  },
  {
    path: 'AddLeaveDetails/:LeaveDId/:ParamsUserId',
    element: <ProtectedRoute component={AddLeaveDetails} />  // <AddLeaveDetails />
  },
  {
    path: 'AssignPrePrimarySubjectGrades',
    element: <ProtectedRoute component={AssignPrePrimarySubjectGrades} />  //  <AssignPrePrimarySubjectGrades />
  },
  {
    path: 'AssignPrePrimarySubjectGrades/:EditStatusId/:ClassName/:Assesment/:SelectTerm/:SubjectName/:SubjectId/:StandardDivisionId/:selectTeacher',
    element: <ProtectedRoute component={AssignPrePrimarySubjectGrades} />  // <AssignPrePrimarySubjectGrades />
  },
  {
    path: 'AssignPrePrimarySubjectGrades/:SubjectID/:Termid/:classid',
    element: <ProtectedRoute component={AssignPrePrimarySubjectGrades} />  // <AssignPrePrimarySubjectGrades />
  },
  {
    path: 'PerfEvalViewReport',
    element: <ProtectedRoute component={PerEvalViewReport} /> // <PerEvalViewReport />
  },

  {
    path: 'AddLeaveDetails',
    element: <ProtectedRoute component={AddLeaveDetails} /> // <AddLeaveDetails />
  },
  {
    path: 'Students',
    element: <ProtectedRoute component={StudentBaseScreen} /> // <StudentBaseScreen />
  },
  {
    path: 'ViewLeaveDetails/:LeaveDId/:ParamsUserId/:selectCategory/:getSenderName',
    element: <ProtectedRoute component={ViewLeaveDetails} /> // <ViewLeaveDetails />
  },
  {
    path: 'GenerateAll',
    element: <ProtectedRoute component={GenerateAll} /> // <GenerateAll />
  },
  {
    path: 'GenerateAll/:asStudentId/:isGenerated/:IsView/:stdId',
    element: <ProtectedRoute component={GenerateAll} /> // <GenerateAll />
  },
  // {
  //   path: 'GenerateAll/:asStudentId/:isGenerated',
  //   element: <GenerateAll />
  // },
  {
    path: 'TAttendance',
    element: <ProtectedRoute component={TAttendance} /> // <TAttendance />
  },
  {
    path: 'InvestmentDeclaration',
    element: <ProtectedRoute component={InvestmentDeclaration} />  // <InvestmentDeclaration />
  },
  {
    path: 'InvestmentDetailsDocument',
    element: <ProtectedRoute component={InvestmentDetailsDocument} />  // <InvestmentDetailsDocument />
  },
  {
    path: 'AddUnpublish1/:Id',
    element: <ProtectedRoute component={AddUnpublish1} /> // <AddUnpublish1 />
  },
  {
    path: 'TAttendance/TView/:assignedDate/:StandardId',
    element: <ProtectedRoute component={TView} /> // <TView />
  },
  {
    path: 'TeacherTimetable',
    element: <ProtectedRoute component={TeacherTimetable} /> // <TeacherTimetable />
  },

  {
    path: 'TExamschedule',
    element: <ProtectedRoute component={TExamschedule} /> // <TExamschedule />
  },
  {
    path: 'TAttendance/MissingAttandence/:assignedDate/:StandardId',
    element: <ProtectedRoute component={MissingAttandence} /> // <MissingAttandence />
  },
  {
    path: 'smscenter',
    element: <SmsCenter /> // <SmsCenter />
  },
  {
    path: 'ComposeSMS',
    element: <ComposeSMS /> // <ProtectedRoute component={ComposeSMS} /> //
  },
  // {
  //   path: 'TAttendance/:AssignedDate/:StandardId',
  //   element: <TAttendance />
  // },
  {
    path: 'TAttendance/:AssignedDate',
    element: <ProtectedRoute component={TAttendance} /> // <TAttendance />
  },
  {
    path: 'SchoolAttendanceOverview/:AssignedDate',
    element: <ProtectedRoute component={SchoolAttendanceOverview} /> // <SchoolAttendanceOverview />
  },
  {
    path: 'SchoolAttendanceOverview/:selectClasstecahernew/:AssignedDate',
    element: <ProtectedRoute component={SchoolAttendanceOverview} /> // <SchoolAttendanceOverview />
  },
  {
    path: 'IndidualAttendance',
    element: <ProtectedRoute component={IndidualAttendance} /> // <IndidualAttendance />
  },
  {
    path: 'IndidualAttendance/:selectClasstecahernew/:AssignedDate',
    element: <ProtectedRoute component={IndidualAttendance} /> // <IndidualAttendance />
  },
  {
    path: 'AddAnnualPlaner',
    element: <ProtectedRoute component={AddAnnualPlaner} /> // <AddAnnualPlaner />
  },
  {
    path: 'MonthwiseAttendance/:selectClasstecahernew/:AssignedDate',
    element: <ProtectedRoute component={MonthwiseAttandance} /> // <MonthwiseAttandance />
  },
  {
    path: 'TAttendance/:SelectClasstecahernew/:AssignedDate',
    element: <ProtectedRoute component={TAttendance} /> // <TAttendance />
  },

  {
    path: 'MonthwiseAttendance',
    element: <ProtectedRoute component={MonthwiseAttandance} /> // <MonthwiseAttandance />
  },
  {
    path: 'ExamResultBase/:selectTeacher',
    element: <ProtectedRoute component={ExamResultBase} /> // <ExamResultBase />
  },
  {
    path: 'ExamResultBase',
    element: <ProtectedRoute component={ExamResultBase} /> // <ExamResultBase />
  },
  {
    path: 'ExamResultBase/:ParamsStandardDivisionId/:ParamsTestId',
    element: <ProtectedRoute component={ExamResultBase} /> // <ExamResultBase />
  },
  {
    path: 'ExamResultBase/:ParamsStandardDivisionId/:ParamsTestId',
    element: <ProtectedRoute component={ExamResultBase} /> // <ExamResultBase />
  },
  {
    path: 'SubjectExamMarks',
    element: <ProtectedRoute component={SubjectExamMarks} /> // <SubjectExamMarks />
  },
  {
    path: 'SubjectExamMarks/:ClassTecher/:StandardDivisionId/:SubjectId/:ClassId/:TestId/:TeacherId/:StandardId/:IsMonthConfig/:IsReadOnly/:examResultProp/:publish/:getStandardId',
    element: <ProtectedRoute component={SubjectExamMarks} /> // <SubjectExamMarks />
  },  // {
  //   path: 'SubjectExamMarks/:examResultProp/:StandardDivisionId/:TestId',
  //   element: <SubjectExamMarks />
  // },
  {
    path: 'AssignExamMark',
    element: <ProtectedRoute component={AssignExamMark} /> // <AssignExamMark />
  },
  {
    path: 'AssignExamMark/:ClassTecher/:ClassId/:TestId',
    element: <ProtectedRoute component={AssignExamMark} /> // <AssignExamMark />
  },

  {
    path: 'AnnualPlanerBaseScreen',
    element: <ProtectedRoute component={AnnualPlanerBaseScreen} /> // <AnnualPlanerBaseScreen />
  },

  {
    path: 'AssignHomework',
    element: <ProtectedRoute component={AssignHomework} /> // <AssignHomework />
  },

  {
    path: 'AssignHomework/:ClassTecherId/:ClassId',
    element: <ProtectedRoute component={AssignHomework} /> // <AssignHomework />
  },
  {
    path: 'TermwiseHeightWeight',
    element: <ProtectedRoute component={TermwiseHeightWeight} /> // <TermwiseHeightWeight />
  },
  {
    path: 'TermwiseHeightWeight/:StandardDivisionId',
    element: <ProtectedRoute component={TermwiseHeightWeight} /> // <TermwiseHeightWeight />
  },
  ///encrypted  Url  
  {
    path: 'AddDailyLog',
    element: <ProtectedRoute component={AddDailyLog} /> // <AddDailyLog />
  },
  {
    path: 'EventManegement/:Id',
    element: <ProtectedRoute component={EventManegement} /> // <EventManegement />
  },
  {
    path: 'EventManegement',
    element: <ProtectedRoute component={EventManegement} /> // <EventManegement />
  },

  {
    path: 'SubjectListmainpage',
    element: <ProtectedRoute component={SubjectListmainpage} /> // <SubjectListmainpage />
  },

  {
    path: 'AssignPrePrimaryGrades',
    element: <ProtectedRoute component={AssignPrePrimaryGrades} /> //  <AssignPrePrimaryGrades />
  },
  {
    path: 'PersonalAddressBook',
    element: <ProtectedRoute component={PersonalAddressBook} /> // <PersonalAddressBook />
  },
  {
    path: 'AssignPrePrimaryGrades/:TermId/:TeacherId',
    element: <ProtectedRoute component={AssignPrePrimaryGrades} /> //  <AssignPrePrimaryGrades />
  },

  {
    path: 'ProgressRemarks/:TestId/:StandardDivisionId',
    element: <ProtectedRoute component={ProgressRemarks} />  //  <ProgressRemarks />
  },
  {
    path: 'ProgressRemarks',
    element: <ProtectedRoute component={ProgressRemarks} />  //  <ProgressRemarks />
  },

  {
    path: 'ViewProgressReport/:TestId/:StandardDivisionId',
    element: <ProtectedRoute component={ViewProgressReport} /> // <ViewProgressReport />
  },

  {
    path: 'FinalResult',
    element: <ProtectedRoute component={FinalResult} /> // <FinalResult />
  },
  {
    path: 'FinalResult/:StandardDivisionId1',
    element: <ProtectedRoute component={FinalResult} /> // <FinalResult />
  },
  {
    path: 'StudentProgressReport/:asUserId/:asStudentId',
    element: <ProtectedRoute component={StudentProgressReport} /> // <StudentProgressReport />
  },
  {
    path: 'StudentRecords',
    element: <ProtectedRoute component={StudentRecords} /> // <StudentRecords />
  },
  {
    path: 'AddStudentRecord/',
    element: <ProtectedRoute component={AddStudentRecord} /> // <AddStudentRecord />
  },
  {
    path: 'AddStudentRecord/:StudentRecordComment',
    element: <ProtectedRoute component={StudentRecordComment} /> // <StudentRecordComment />
  },
  {
    path: 'AddStudentRecord/:Action/:SelectTeacher/:SchoolWiseStudentIdparam',
    element: <ProtectedRoute component={AddStudentRecord} /> // <AddStudentRecord />
  },
  {
    path: 'AddDailyLog/:Id/:ClassName/:SelectTeacher',
    element: <ProtectedRoute component={AddDailyLog} /> // <AddDailyLog />
  },
  {
    path: 'FinalResultToppers',
    element: <ProtectedRoute component={FinalResultToppers} /> // <FinalResultToppers />
  },
  {
    path: 'FinalResult/:TeacherId',
    element: <ProtectedRoute component={FinalResult} /> // <FinalResult />
  },
  // {
  //   path: 'ExamResultToppers/:TeacherId/:StandardDivisionId/:standardId/:examtopperProp',
  //   element: <ExamResultToppers />
  // },
  // {
  //   path: 'ExamResultToppers/:TeacherId/:StandardDivisionId/:TestId/:standardId/:IsReadOnly',
  //   element: <ExamResultToppers />
  // },
  {
    path: 'Toppers/:TeacherId/:StandardDivisionId/:standardId/:AcademicYear/:LatestExamId/:LatestExamId1/:Studentid/:examtopperProp',
    element: <ProtectedRoute component={Toppers} /> // <Toppers />
  },
  {
    path: 'Toppers/:TeacherId/:StandardDivisionId/:TestId/:standardId/:IsReadOnly',
    element: <ProtectedRoute component={Toppers} /> // <Toppers />
  },

  {
    path: 'StandardToppers',
    element: <ProtectedRoute component={StandardToppers} /> // <StandardToppers />
  },
  {
    path: 'ExamResultUnpublish',
    element: <ProtectedRoute component={ExamResultUnpublish} /> // <ExamResultUnpublish />
  },
  {
    path: 'ExamResultUnpublish/:ExamId/:TeacherId/:ExamName/:TeacherName',
    element: <ProtectedRoute component={ExamResultUnpublish} /> // <ExamResultUnpublish />
  },
  {
    path: 'AddHomework',
    element: <ProtectedRoute component={AddHomework} /> // <AddHomework />
  },
  {
    path: 'AddHomework/:ClassId/:ClassName/:TeacherId/:TeacherName/:subjectId/:SubjectName',
    element: <ProtectedRoute component={AddHomework} /> // <AddHomework />
  },
  {
    path: 'HomeworkSubjectList',
    element: <ProtectedRoute component={HomeworkSubjectList} /> // <HomeworkSubjectList />
  },
  {
    path: 'HomeworkDocuments/:Id/:TeacherId/:TeacherName/:ClassName/:SubjectName/:SubjectId/:MySubject/:SelectClass',
    element: <ProtectedRoute component={HomeworkDocuments} /> // <HomeworkDocuments />
  },
  // {
  //   path:'HomeworkDocuments',
  //   element:<HomeworkDocuments/>
  // },
  {
    path: 'ViewHomework/:Id',
    element: <ProtectedRoute component={ViewHomework} /> // <ViewHomework />
  },
  {
    path: 'ViewHomework/:Id/:TeacherId/:TeacherName/:ClassName/:SubjectName/:SubjectId/:MySubject/:SelectClass',
    element: <ProtectedRoute component={ViewHomework} /> // <ViewHomework />
  },
  {
    path: 'AddUnpublish/:Id',
    element: <ProtectedRoute component={AddUnpublish} /> // <AddUnpublish />
  }, {
    path: 'AddLessonPlan/:Action',
    element: <ProtectedRoute component={AddLessonPlan} />  // <AddLessonPlan />
  },
  {
    path: 'AddLessonPlan/:Action/:UserIdParam/:StartDateParam/:EndDateParam',
    element: <ProtectedRoute component={AddLessonPlan} />  // <AddLessonPlan />
  },
  {
    path: 'LessonPlanBaseScreen',
    element: <ProtectedRoute component={LessonPlanBaseScreen} />  // <LessonPlanBaseScreen />
  },
  {
    path: 'PrePrimaryResult',
    element: <ProtectedRoute component={PrePrimaryResult} /> //  <PrePrimaryResult />
  },
  {
    path: 'PrePrimaryResult/:TermId/:StdDivId',
    element: <ProtectedRoute component={PrePrimaryResult} /> // <PrePrimaryResult />
  },
  // {
  //   path: 'UnpublishPrePrimaryResult/:AssessmentName/:TeacherName',
  //   element: <UnpublishPrePrimaryResult />
  // },
  {
    path: 'Requisition',
    element: <ProtectedRoute component={Requisition} /> // <Requisition />
  },
  {
    path: 'AddRequisition',
    element: <ProtectedRoute component={AddRequisition} /> // <AddRequisition />
  },
  {
    path: 'RequistionView/:ViewId',
    element: <ProtectedRoute component={RequistionView} /> // <RequistionView />
  },
  {
    path: 'AddRequisition/:asRequisitionId',
    element: <ProtectedRoute component={AddRequisition} /> // <AddRequisition />
  },

  {
    path: 'FinalResultUnpublish/:SelectTeacher/:TeacherName',
    element: <ProtectedRoute component={FinalResultUnpublish} /> // <FinalResultUnpublish />
  },
  {
    path: 'AadharCard',
    element: <ProtectedRoute component={AadharCard} />,
  },
  {
    path: 'WeeklyTimetable',
    element: <ProtectedRoute component={WeeklyTimetable} /> // <WeeklyTimetable />
  },
  // {
  //   path: 'ExamResultToppers/:TeacherId/:StandardDivisionId/:TestId/:standardId',
  //   element: <ExamResultToppers />
  // },
  {
    path: 'Toppers/:TeacherId/:StandardDivisionId/:TestId/:standardId',
    element: <ProtectedRoute component={Toppers} /> // <Toppers />
  },
  {
    path: 'TransferOptionalSubjectMarks',
    element: <ProtectedRoute component={TransferOptionalSubjectMarks} /> // <TransferOptionalSubjectMarks />
  },
  {
    path: 'SubjectMarkList/:TestId/:StandardDivisionId/:getExamName/:getTeacherName/:getSubjectName/:SubjectId',
    element: <ProtectedRoute component={SubjectMarkList} /> // <SubjectMarkList />
  },

  {
    path: 'AddHomeworkNew/:TeacherId/:TeacherName/:ClassName/:SubjectName/:SubjectId/:MySubject/:SelectClass',
    element: <ProtectedRoute component={AddHomeworkNew} /> // <AddHomeworkNew />
  },
  {
    path: 'AssignProgressReportSubject',
    element: <ProtectedRoute component={AssignProgressReportSubject} /> // <AssignProgressReportSubject />
  },
  {
    path: 'AssignProgressReportSubject/:EditStatusId/:ClassName/:Assesment/:SelectTerm/:SubjectName/:SubjectId/:StandardDivisionId/:selectTeacher',
    element: <ProtectedRoute component={AssignProgressReportSubject} /> // <AssignProgressReportSubject />
  },
  {
    path: 'AddHomeworkNew',
    element: <ProtectedRoute component={AddHomeworkNew} /> // <AddHomeworkNew />
  },
  {
    path: 'ViewResultAll',
    element: <ProtectedRoute component={ViewResultAll} /> // <ViewResultAll />
  },
  {
    path: 'ViewResultAll/:StandardDivisionId',
    element: <ProtectedRoute component={ViewResultAll} /> // <ViewResultAll />
  },
  {
    path: 'ViewFinalResult',
    element: <ProtectedRoute component={ViewFinalResult} /> // <ViewFinalResult />
  },
  {
    path: 'ProgressReportNew/:AcademicYearTopper/:StudentidTopper/:TeacherIdTopper',
    element: <ProtectedRoute component={ProgressReportNew} /> // <ProgressReportNew />
  },
  {
    path: 'Studentwiseprogressreport',
    element: <ProtectedRoute component={Studentwiseprogressreport} />  // <Studentwiseprogressreport />
  },
  {
    path: 'Studentwiseprogressreport/:TermId',
    element: <ProtectedRoute component={Studentwiseprogressreport} />  // <Studentwiseprogressreport />
  },
  {
    path: 'AllNoticeList',
    element: <ProtectedRoute component={AllNoticeList} /> // <AllNoticeList />
  },
  {
    path: 'SchoolNoticeBasescreen',
    element: <ProtectedRoute component={SchoolNoticeBasescreen} /> // <SchoolNoticeBasescreen />
  },
  {
    path: 'SchoolNoticeBasescreen/:selectDisplayT',
    element: <ProtectedRoute component={SchoolNoticeBasescreen} /> // <SchoolNoticeBasescreen />
  },
  {
    path: 'AddSchoolNotice',
    element: <ProtectedRoute component={AddSchoolNotice} /> // <AddSchoolNotice />
  },
  {
    path: 'AddSchoolNotice/:Id',
    element: <ProtectedRoute component={AddSchoolNotice} /> // <AddSchoolNotice />
  },
  {
    path: 'AddSchoolNoticeFT/:selectDisplayType',
    element: <ProtectedRoute component={AddSchoolNoticeFT} /> // <AddSchoolNoticeFT />
  },
  {
    path: 'AddSchoolNoticeFT/:NoticeId/:selectDisplayType',
    element: <ProtectedRoute component={AddSchoolNoticeFT} /> // <AddSchoolNoticeFT />
  },
  {
    path: 'PreprimaryProgressReport',
    element: <ProtectedRoute component={PreprimaryProgressReport} /> //  <PreprimaryProgressReport />
  },
  // Exception Occured screenId={`0`}
  {
    path: 'PreprimaryProgressReport1',
    element: <ProtectedRoute component={PreprimaryProgressReport1} /> // <PreprimaryProgressReport1 />
  },
  {
    path: 'StudentwiseprogressreportEdit/:Assessment/:YearwiseStudentId/:StandardId',
    element: <ProtectedRoute component={StudentwiseprogressreportEdit} />  // <StudentwiseprogressreportEdit />
  },
  {
    path: 'PerformanceGradeAssignmentBaseScreen',
    element: <ProtectedRoute component={PerformanceGradeAssignmentBaseScreen} />  //<PerformanceGradeAssignmentBaseScreen />
  },
  {
    path: 'PerformanceGradeAssignmentBaseScreen/:asYearID/:statusID',
    element: <ProtectedRoute component={PerformanceGradeAssignmentBaseScreen} />  // <PerformanceGradeAssignmentBaseScreen />
  },
  {
    path: 'PerformanceEvaluation',
    element: <ProtectedRoute component={PerformanceEvaluation} /> // <PerformanceEvaluation />
  },
  {
    path: 'LibraryBaseScreen',
    element: <ProtectedRoute component={LibraryBaseScreen} /> // <LibraryBaseScreen />
  },
  {
    path: 'ClaimedBookDetailsPage',
    element: <ProtectedRoute component={ClaimedBookDetailsPage} /> // <ClaimedBookDetailsPage />
  },
  {
    path: 'ProgressReportNew',
    element: <ProtectedRoute component={ProgressReportNew} /> // <ProgressReportNew />
  }, {
    path: 'PreprimaryProgressReportView/:Assessment/:YearwiseStudentId/:StandardId',
    element: <ProtectedRoute component={PreprimaryProgressReportView} /> //  <PreprimaryProgressReportView />
  },
  {
    path: 'ViewSmsNew/:SmsId',
    element: <ProtectedRoute component={ViewSmsNew} /> // <ViewSmsNew />
  },
  {
    path: 'ExamScheduleBasescreen',
    element: <ProtectedRoute component={ExamScheduleBasescreen} /> // <ExamScheduleBasescreen />
  },
  {
    path: 'StandardwiseExamSchedule/:StandardId/:TestId/:SchoolwiseStandardExamScheduleId/:StandardTestId/:IsConfigured',
    element: <ProtectedRoute component={StandardwiseExamSchedule} /> // <StandardwiseExamSchedule />
  },
  {
    path: 'StandardwiseExamSchedule/:StandardId/:TestId/:SchoolwiseStandardTestId/:IsConfigured',
    element: <ProtectedRoute component={StandardwiseExamSchedule} /> // <StandardwiseExamSchedule />
  },
  {
    path: 'StandardwiseExamSchedule',
    element: <ProtectedRoute component={StandardwiseExamSchedule} /> // <StandardwiseExamSchedule />
  },
  {
    path: 'ViewExamSchedule',
    element: <ProtectedRoute component={ViewExamSchedule} /> // <ViewExamSchedule />
  },

  {
    path: 'ReceivedSMSOwn',
    element: <ProtectedRoute component={ReceivedSMSOwn} /> // <ReceivedSMSOwn />
  },
  {
    path: 'PhotoVideoGalleryBaseScreen',
    element: <ProtectedRoute component={PhotoVideoGalleryBaseScreen} /> //  <PhotoVideoGalleryBaseScreen />
  },
  {
    path: 'AddNewPhoto',
    element: <ProtectedRoute component={AddNewPhoto} /> // <AddNewPhoto />
  },
  {
    path: 'AddNewVideo/:Video_Id',
    element: <ProtectedRoute component={AddNewVideo} /> // <AddNewVideo />
  },
  {
    path: 'AddNewVideo',
    element: <ProtectedRoute component={AddNewVideo} /> // <AddNewVideo />
  },
  {
    path: 'AddNewVideo/:RowID',
    element: <ProtectedRoute component={AddNewVideo} /> // <AddNewVideo />
  },
  {
    path: 'ViewPhotoFile',
    element: <ProtectedRoute component={ViewPhotoFile} /> // <ViewPhotoFile />
  },
  {
    path: 'ViewVideoGallery',
    element: <ProtectedRoute component={ViewVideoGallery} /> // <ViewVideoGallery />
  },
  {
    path: 'ViewVideoGallery/:Video_Id/:videoName/:URLSource',
    element: <ProtectedRoute component={ViewVideoGallery} /> // <ViewVideoGallery />
  },
  {
    path: 'BlockProgressReportBaseScreen',
    element: <ProtectedRoute component={BlockProgressReportBaseScreen} /> // <BlockProgressReportBaseScreen />
  },
  {
    path: 'FeedbackDetailsBasescreen',
    element: <ProtectedRoute component={FeedbackDetailsBasescreen} /> // <FeedbackDetailsBasescreen />
  },
  {
    path: 'StudentDetailsBaseScreen',
    element: <ProtectedRoute component={StudentDetailsBaseScreen} /> //  <StudentDetailsBaseScreen />
  },
  {
    path: 'EnterStudentSiblingDetails',
    element: <ProtectedRoute component={EnterStudentSiblingDetails} /> // <EnterStudentSiblingDetails />
  },
  {
    path: 'StudentDetailsAttendance',
    element: <ProtectedRoute component={StudentDetailsAttendance} /> // <StudentDetailsAttendance />
  },
  {
    path: 'StudentDetailsExam',
    element: <ProtectedRoute component={StudentDetailsExam} /> // <StudentDetailsExam />
  },
  {
    path: 'AttendanceTopperspage',
    element: <ProtectedRoute component={AttendanceTopperspage} /> // <AttendanceTopperspage />
  }, {
    path: 'ExportStudentMarksBaseScreen',
    element: <ProtectedRoute component={ExportStudentMarksBaseScreen} /> // <ExportStudentMarksBaseScreen />
  },
  {
    path: 'UserDocumentDetailsBaseScreen',
    element: <ProtectedRoute component={UserDocumentDetailsBaseScreen} /> // <UserDocumentDetailsBaseScreen />
  },
  {
    path: 'NoticeBoardBaseScreen',
    element: <ProtectedRoute component={NoticeBoardBaseScreen} /> // <NoticeBoardBaseScreen />
  },
  {
    path: 'RegenarateRollNo',
    element: <ProtectedRoute component={RegenarateRollNo} /> //  <RegenarateRollNo />
  },
  {
    path: 'UserManagementBasescreen',
    element: <ProtectedRoute component={UserManagementBasescreen} /> // <UserManagementBasescreen />
  },
  // FeeDemo
  {
    path: 'FeeDemo',
    element: <FeeDemo />
  }
];

export default teacherRoutes;