import { Suspense, lazy } from 'react';
import ExamResultBase from 'src/components/ExamResult/ExamResultBase';
import AddLeaveDetails from 'src/components/LeaveDetails/AddLeaveDetails';
import LeaveDetailsBaseScreen from 'src/components/LeaveDetails/LeaveDetailsBaseScreen';

import TransferOptionalSubjectMarks from 'src/components/TransferOptionalSubjectMarks/TransferOptionalSubjectMarks';

import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

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

const teacherRoutes = [
  {
    path: 'WebDashBoard',
    element: <DashBoard />
  },

  {
    path: 'LeaveDetails',
    element: <LeaveDetailsBaseScreen />
  },
  {
    path: 'StudentRegistrationForms',
    element: <StudentRegistrationForms />
  },
  {
    path: 'StudentRegistrationForms/:PageID',
    element: <StudentRegistrationForms />
  },
  {
    path: 'StudentRegistrationForms/:BackN_Student_Ids',
    element: <StudentRegistrationForms />
  },
  {
    path: 'AddLeaveDetails/:LeaveDId/:ParamsUserId',
    element: <AddLeaveDetails />
  },
  {
    path: 'AssignPrePrimarySubjectGrades',
    element: <AssignPrePrimarySubjectGrades />
  },
  {
    path: 'AssignPrePrimarySubjectGrades/:EditStatusId/:ClassName/:Assesment/:SelectTerm/:SubjectName/:SubjectId/:StandardDivisionId/:selectTeacher',
    element: <AssignPrePrimarySubjectGrades />
  },
  {
    path: 'AssignPrePrimarySubjectGrades/:SubjectID/:Termid/:classid',
    element: <AssignPrePrimarySubjectGrades />
  },
  {
    path: 'PerfEvalViewReport',
    element: <PerEvalViewReport />
  },

  {
    path: 'AddLeaveDetails',
    element: <AddLeaveDetails />
  },
  {
    path: 'Students',
    element: <StudentBaseScreen />
  },
  {
    path: 'ViewLeaveDetails/:LeaveDId/:ParamsUserId/:selectCategory/:getSenderName',
    element: <ViewLeaveDetails />
  },
  {
    path: 'GenerateAll',
    element: <GenerateAll />
  },
  {
    path: 'GenerateAll/:asStudentId/:isGenerated/:IsView/:stdId',
    element: <GenerateAll />
  },
  // {
  //   path: 'GenerateAll/:asStudentId/:isGenerated',
  //   element: <GenerateAll />
  // },
  {
    path: 'TAttendance',
    element: <TAttendance />
  },
  {
    path: 'InvestmentDeclaration',
    element: <InvestmentDeclaration />
  },
  {
    path: 'InvestmentDetailsDocument',
    element: <InvestmentDetailsDocument />
  },

  {
    path: 'AddUnpublish1/:Id',
    element: <AddUnpublish1 />
  },
  {
    path: 'TAttendance/TView/:assignedDate/:StandardId',
    element: <TView />
  },
  {
    path: 'TeacherTimetable',
    element: <TeacherTimetable />
  },

  {
    path: 'TExamschedule',
    element: <TExamschedule />
  },
  {
    path: 'TAttendance/MissingAttandence/:assignedDate/:StandardId',
    element: <MissingAttandence />
  },
  {
    path: 'smscenter',
    element: <SmsCenter />
  },
  {
    path: 'ComposeSMS',
    element: <ComposeSMS />
  },
  // {
  //   path: 'TAttendance/:AssignedDate/:StandardId',
  //   element: <TAttendance />
  // },
  {
    path: 'TAttendance/:AssignedDate',
    element: <TAttendance />
  },
  {
    path: 'SchoolAttendanceOverview/:AssignedDate',
    element: <SchoolAttendanceOverview />
  },
  {
    path: 'IndidualAttendance',
    element: <IndidualAttendance />
  },
  {
    path: 'IndidualAttendance/:selectClasstecahernew/:AssignedDate',
    element: <IndidualAttendance />
  },
  {
    path: 'AddAnnualPlaner',
    element: <AddAnnualPlaner />
  },
  {
    path: 'MonthwiseAttendance/:selectClasstecahernew/:AssignedDate',
    element: <MonthwiseAttandance />
  },
  {
    path: 'TAttendance/:SelectClasstecahernew/:AssignedDate',
    element: <TAttendance />
  },

  {
    path: 'MonthwiseAttendance',
    element: <MonthwiseAttandance />
  },
  {
    path: 'ExamResultBase/:selectTeacher',
    element: <ExamResultBase />
  },
  {
    path: 'ExamResultBase',
    element: <ExamResultBase />
  },
  {
    path: 'ExamResultBase/:ParamsStandardDivisionId/:ParamsTestId',
    element: <ExamResultBase />
  },
  {
    path: 'ExamResultBase/:ParamsStandardDivisionId/:ParamsTestId',
    element: <ExamResultBase />
  },
  {
    path: 'SubjectExamMarks',
    element: <SubjectExamMarks />
  },
  {
    path: 'SubjectExamMarks/:ClassTecher/:StandardDivisionId/:SubjectId/:ClassId/:TestId/:TeacherId/:StandardId/:IsMonthConfig/:IsReadOnly/:examResultProp/:publish/:getStandardId',
    element: <SubjectExamMarks />
  },
  // {
  //   path: 'SubjectExamMarks/:examResultProp/:StandardDivisionId/:TestId',
  //   element: <SubjectExamMarks />
  // },

  {
    path: 'AssignExamMark',
    element: <AssignExamMark />
  },
  {
    path: 'AssignExamMark/:ClassTecher/:ClassId/:TestId',
    element: <AssignExamMark />
  },

  {
    path: 'AnnualPlanerBaseScreen',
    element: <AnnualPlanerBaseScreen />
  },

  {
    path: 'AssignHomework',
    element: <AssignHomework />
  },
  {
    path: 'TermwiseHeightWeight',
    element: <TermwiseHeightWeight />
  },
  {
    path: 'TermwiseHeightWeight/:StandardDivisionId',
    element: <TermwiseHeightWeight />
  },
  ///encrypted  Url  
  {
    path: 'AddDailyLog',
    element: <AddDailyLog />
  },
  {
    path: 'EventManegement/:Id',
    element: <EventManegement />
  },
  {
    path: 'EventManegement',
    element: <EventManegement />
  },

  {
    path: 'SubjectListmainpage',
    element: <SubjectListmainpage />
  },

  {
    path: 'AssignPrePrimaryGrades',
    element: <AssignPrePrimaryGrades />
  },
  {
    path: 'PersonalAddressBook',
    element: <PersonalAddressBook />
  },

  {
    path: 'AssignPrePrimaryGrades/:TermId/:TeacherId',
    element: <AssignPrePrimaryGrades />
  },

  {
    path: 'ProgressRemarks/:TestId/:StandardDivisionId',
    element: <ProgressRemarks />
  },
  {
    path: 'ProgressRemarks',
    element: <ProgressRemarks />
  },

  {
    path: 'ViewProgressReport/:TestId/:StandardDivisionId',
    element: <ViewProgressReport />
  },

  {
    path: 'FinalResult',
    element: <FinalResult />
  },
  {
    path: 'FinalResult/:StandardDivisionId1',
    element: <FinalResult />
  },
  {
    path: 'StudentProgressReport/:asUserId/:asStudentId',
    element: <StudentProgressReport />
  },
  {
    path: 'StudentRecords',
    element: <StudentRecords />
  },
  {
    path: 'AddStudentRecord/',
    element: <AddStudentRecord />
  },
  {
    path: 'AddStudentRecord/:StudentRecordComment',
    element: <StudentRecordComment />
  },
  {
    path: 'AddStudentRecord/:Action/:SelectTeacher/:SchoolWiseStudentIdparam',
    element: <AddStudentRecord />
  },
  {
    path: 'AddDailyLog/:Id/:ClassName',
    element: <AddDailyLog />
  },
  {
    path: 'FinalResultToppers',
    element: <FinalResultToppers />
  },
  {
    path: 'FinalResult/:TeacherId',
    element: <FinalResult />
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
    element: <Toppers />
  },
  {
    path: 'Toppers/:TeacherId/:StandardDivisionId/:TestId/:standardId/:IsReadOnly',
    element: <Toppers />
  },

  {
    path: 'StandardToppers',
    element: <StandardToppers />
  },
  {
    path: 'ExamResultUnpublish',
    element: <ExamResultUnpublish />
  },
  {
    path: 'ExamResultUnpublish/:ExamId/:TeacherId/:ExamName/:TeacherName',
    element: <ExamResultUnpublish />
  },
  {
    path: 'AddHomework',
    element: <AddHomework />
  },
  {
    path: 'AddHomework/:ClassId/:ClassName/:TeacherId/:TeacherName/:subjectId/:SubjectName',
    element: <AddHomework />
  },
  {
    path: 'HomeworkSubjectList',
    element: <HomeworkSubjectList />
  },
  {
    path: 'HomeworkDocuments/:Id/:TeacherId/:TeacherName/:ClassName/:SubjectName/:SubjectId/:MySubject/:SelectClass',
    element: <HomeworkDocuments />
  },
  // {
  //   path:'HomeworkDocuments',
  //   element:<HomeworkDocuments/>
  // },
  {
    path: 'ViewHomework/:Id',
    element: <ViewHomework />
  },
  {
    path: 'ViewHomework/:Id/:TeacherId/:TeacherName/:ClassName/:SubjectName/:SubjectId/:MySubject/:SelectClass',
    element: <ViewHomework />
  },
  {
    path: 'AddUnpublish/:Id',
    element: <AddUnpublish />
  },
  {
    path: 'AddLessonPlan/:Action',
    element: <AddLessonPlan />
  },
  {
    path: 'AddLessonPlan/:Action/:UserIdParam/:StartDateParam/:EndDateParam',
    element: <AddLessonPlan />
  },
  {
    path: 'LessonPlanBaseScreen',
    element: <LessonPlanBaseScreen />
  },
  {
    path: 'PrePrimaryResult',
    element: <PrePrimaryResult />
  },
  {
    path: 'PrePrimaryResult/:TermId/:StdDivId',
    element: <PrePrimaryResult />
  },
  // {
  //   path: 'UnpublishPrePrimaryResult/:AssessmentName/:TeacherName',
  //   element: <UnpublishPrePrimaryResult />
  // },
  {
    path: 'Requisition',
    element: <Requisition />
  },
  {
    path: 'AddRequisition',
    element: <AddRequisition />
  },
  {
    path: 'RequistionView/:ViewId',
    element: <RequistionView />
  },
  {
    path: 'AddRequisition/:asRequisitionId',
    element: <AddRequisition />
  },

  {
    path: 'FinalResultUnpublish/:SelectTeacher/:TeacherName',
    element: <FinalResultUnpublish />
  },
  {
    path: 'AadharCard',
    element: <AadharCard />
  },
  {
    path: 'WeeklyTimetable',
    element: <WeeklyTimetable />
  },
  // {
  //   path: 'ExamResultToppers/:TeacherId/:StandardDivisionId/:TestId/:standardId',
  //   element: <ExamResultToppers />
  // },
  {
    path: 'Toppers/:TeacherId/:StandardDivisionId/:TestId/:standardId',
    element: <Toppers />
  },
  {
    path: 'TransferOptionalSubjectMarks',
    element: <TransferOptionalSubjectMarks />
  },
  {
    path: 'SubjectMarkList/:TestId/:StandardDivisionId/:getExamName/:getTeacherName/:getSubjectName/:SubjectId',
    element: <SubjectMarkList />
  },

  {
    path: 'AddHomeworkNew/:TeacherId/:TeacherName/:ClassName/:SubjectName/:SubjectId/:MySubject/:SelectClass',
    element: <AddHomeworkNew />
  },
  {
    path: 'AssignProgressReportSubject',
    element: <AssignProgressReportSubject />
  },
  {
    path: 'AssignProgressReportSubject/:EditStatusId/:ClassName/:Assesment/:SelectTerm/:SubjectName/:SubjectId/:StandardDivisionId/:selectTeacher',
    element: <AssignProgressReportSubject />
  },
  {
    path: 'AddHomeworkNew',
    element: <AddHomeworkNew />
  },
  {
    path: 'ViewResultAll',
    element: <ViewResultAll />
  },
  {
    path: 'ViewResultAll/:StandardDivisionId',
    element: <ViewResultAll />
  },
  {
    path: 'ViewFinalResult',
    element: <ViewFinalResult />
  },
  {
    path: 'ProgressReportNew/:AcademicYearTopper/:StudentidTopper/:TeacherIdTopper',
    element: <ProgressReportNew />
  },
  {
    path: 'Studentwiseprogressreport',
    element: <Studentwiseprogressreport />
  },
  {
    path: 'Studentwiseprogressreport/:TermId',
    element: <Studentwiseprogressreport />
  },
  {
    path: 'AllNoticeList',
    element: <AllNoticeList />
  },
  {
    path: 'SchoolNoticeBasescreen',
    element: <SchoolNoticeBasescreen />
  },
  {
    path: 'SchoolNoticeBasescreen/:selectDisplayT',
    element: <SchoolNoticeBasescreen />
  },
  {
    path: 'AddSchoolNotice',
    element: <AddSchoolNotice />
  },
  {
    path: 'AddSchoolNotice/:Id',
    element: <AddSchoolNotice />
  },
  {
    path: 'AddSchoolNoticeFT/:selectDisplayType',
    element: <AddSchoolNoticeFT />
  },
  {
    path: 'AddSchoolNoticeFT/:NoticeId/:selectDisplayType',
    element: <AddSchoolNoticeFT />
  },
  {
    path: 'PreprimaryProgressReport',
    element: <PreprimaryProgressReport />
  },
  {
    path: 'PreprimaryProgressReport1',
    element: <PreprimaryProgressReport1 />
  },
  {
    path: 'StudentwiseprogressreportEdit/:Assessment/:YearwiseStudentId/:StandardId',
    element: <StudentwiseprogressreportEdit />
  },
  {
    path: 'PerformanceGradeAssignmentBaseScreen',
    element: <PerformanceGradeAssignmentBaseScreen />
  },
  {
    path: 'PerformanceGradeAssignmentBaseScreen/:asYearID/:statusID',
    element: <PerformanceGradeAssignmentBaseScreen />
  },
  {
    path: 'PerformanceEvaluation',
    element: <PerformanceEvaluation />
  },
  {
    path: 'LibraryBaseScreen',
    element: <LibraryBaseScreen />
  },
  {
    path: 'ClaimedBookDetailsPage',
    element: <ClaimedBookDetailsPage />
  },
  {
    path: 'ProgressReportNew',
    element: <ProgressReportNew />
  },

  {
    path: 'PreprimaryProgressReportView/:Assessment/:YearwiseStudentId/:StandardId',
    element: <PreprimaryProgressReportView />
  },
  {
    path: 'ViewSmsNew/:SmsId',
    element: <ViewSmsNew />
  },
  {
    path: 'ExamScheduleBasescreen',
    element: <ExamScheduleBasescreen />
  },
  {
    path: 'StandardwiseExamSchedule/:StandardId/:TestId/:SchoolwiseStandardExamScheduleId/:StandardTestId/:IsConfigured',
    element: <StandardwiseExamSchedule />
  },
  {
    path: 'StandardwiseExamSchedule/:StandardId/:TestId/:SchoolwiseStandardTestId/:IsConfigured',
    element: <StandardwiseExamSchedule />
  },
  {
    path: 'StandardwiseExamSchedule',
    element: <StandardwiseExamSchedule />
  },
  {
    path: 'ViewExamSchedule',
    element: <ViewExamSchedule />
  },

  {
    path: 'ReceivedSMSOwn',
    element: <ReceivedSMSOwn />
  },
  {
    path: 'PhotoVideoGalleryBaseScreen',
    element: <PhotoVideoGalleryBaseScreen />
  },
  {
    path: 'AddNewPhoto',
    element: <AddNewPhoto />
  },
  {
    // path: 'AddNewPhoto/:galleryName',
    path: 'AddNewPhoto/:RowID',
    element: <AddNewPhoto />
  },
  {
    path: 'AddNewVideo',
    element: <AddNewVideo />
  },
  {
    path: 'ViewPhotoFile',
    element: <ViewPhotoFile />
  },
  {
    path: 'ViewVideoGallery',
    element: <ViewVideoGallery />
  },
  {
    path: 'BlockProgressReportBaseScreen',
    element: <BlockProgressReportBaseScreen />
  },
  {
    path: 'FeedbackDetailsBasescreen',
    element: <FeedbackDetailsBasescreen />
  },
  {
    path: 'StudentDetailsBaseScreen',
    element: <StudentDetailsBaseScreen />
  },
  {
    path: 'EnterStudentSiblingDetails',
    element: <EnterStudentSiblingDetails />
  },
  {
    path: 'StudentDetailsAttendance',
    element: <StudentDetailsAttendance />
  },
  {
    path: 'StudentDetailsExam',
    element: <StudentDetailsExam />
  },
  {
    path: 'AttendanceTopperspage',
    element: <AttendanceTopperspage />
  },
  {
    path: 'ExportStudentMarksBaseScreen',
    element: <ExportStudentMarksBaseScreen />
  },
  {
    path: 'UserDocumentDetailsBaseScreen',
    element: <UserDocumentDetailsBaseScreen />
  },
  {
    path: 'NoticeBoardBaseScreen',
    element: <NoticeBoardBaseScreen />
  },
  {
    path: 'RegenarateRollNo',
    element: <RegenarateRollNo />
  },
  {
    path: 'UserManagementBasescreen',
    element: <UserManagementBasescreen />
  }
];

export default teacherRoutes;
