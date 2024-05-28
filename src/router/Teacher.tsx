
import { Suspense, lazy } from 'react';
import ExamResultBase from 'src/components/ExamResult/ExamResultBase';

import TransferOptionalSubjectMarks from 'src/components/TransferOptionalSubjectMarks/TransferOptionalSubjectMarks';

import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// const TAttendance = Loader(lazy(() => import('src/components/TAttendance/Tattendance')))
const TAttendance = Loader(
  lazy(() => import('src/components/MyAttendance/TAttendance'))
);
const StudentProgressReport = Loader(
  lazy(() => import('src/components/FinalResult/StudentProgressReport'))
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
const SchoolAttendanceOverview = Loader(
  lazy(() => import('src/components/MyAttendance/SchoolAttendanceOverview'))
);
const IndidualAttendance = Loader(
  lazy(() => import('src/components/IndividualAttendance/IndividualAttendance'))
);
const AddAnnualPlaner = Loader(
  lazy(() => import('src/components/AnnualPlanner/AddAnnualPlaner'))
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
  lazy(() => import('src/components/StudentRecords/StudentRecords'))
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
const UnpublishPrePrimaryResult = Loader(
  lazy(
    () => import('src/components/PrePrimaryResult/UnpublishPrePrimaryResult')
  )
);
const AddUnpublish1 = Loader(
  lazy(() => import('src/components/AssignHomework/AddUnpublish1'))
);
const AadharCard = Loader(
  lazy(() => import('src/components/NewAadharcard/AadharCard'))
);
const WeeklyTimetable = Loader(
  lazy(() => import('src/components/WeeklyTimetable/WeeklyTimetable'))
)
const ExamResultToppers = Loader(
  lazy(() => import('src/components/ExamResult/ExamResultToppers'))
)
const SubjectMarkList = Loader(
  lazy(() => import('src/components/ExamResult/SubjectMarkList'))
)

const AddHomeworkNew = Loader(
  lazy(() => import('src/components/AddHomeworkNew/AddHomeworkNew'))
);
const ViewResultAll = Loader(
  lazy(() => import('src/components/ViewResultAll/ViewResultAll'))
)
const ViewFinalResult = Loader(
  lazy(() => import('src/components/ViewFinalResult/ViewFinalResult'))
)
const GenerateAll = Loader(
  lazy(() => import('src/components/FinalResult/FinalResultGenerateAll'))
)

const ProgressReportNew = Loader(
  lazy(() => import('src/components/ProgressReportNew/ProgressReportNew'))
)



const teacherRoutes = [
  {
    path: 'GenerateAll',
    element: <GenerateAll />
  },
  {
    path: 'GenerateAll/:asStudentId',
    element: <GenerateAll />
  },

  {
    path: 'TAttendance',
    element: <TAttendance />
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
    path: 'TAttendance/:AssignedDate/:StandardId',
    element: <TAttendance />
  },
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
    path: 'AddAnnualPlaner',
    element: <AddAnnualPlaner />
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
    path: 'SubjectExamMarks',
    element: <SubjectExamMarks />
  },
  {
    path: 'SubjectExamMarks/:ClassTecher/:StandardDivisionId/:SubjectId/:ClassId/:TestId/:TeacherId/:StandardId/:IsMonthConfig/:IsReadOnly/:examResultProp/:publish',
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
    path: 'AssignPrePrimaryGrades',
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
    path: 'StudentProgressReport/:asUserId/:asStudentId',
    element: <StudentProgressReport />
  },
  {
    path: 'StudentRecords',
    element: <StudentRecords />
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
    path: 'FinalResultToppers/:TeacherId',
    element: <FinalResultToppers />
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
    path: 'UnpublishPrePrimaryResult/:AssessmentName/:TeacherName',
    element: <UnpublishPrePrimaryResult />
  },
  {
    path: 'Requisition',
    element: <Requisition />
  },
  {
    path: 'AddRequisition',
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
  {
    path: 'ExamResultToppers/:TeacherId/:StandardDivisionId',
    element: <ExamResultToppers />
  }
  ,
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
    path: 'AddHomeworkNew',
    element: <AddHomeworkNew />
  },
  {
    path: 'ViewResultAll',
    element: <ViewResultAll />
  },
  {
    path: 'ViewFinalResult',
    element: <ViewFinalResult />
  },
  {
    path: 'ProgressReportNew',
    element: <ProgressReportNew />
  }

];

export default teacherRoutes;