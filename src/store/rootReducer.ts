import { combineReducers } from '@reduxjs/toolkit';
import AttendanceSlice from 'src/requests/Attendance/Attendance';
import NewRelease from 'src/requests/Authentication/NewRelease';
import SchoolListslice from 'src/requests/Authentication/SchoolList';
import {
  default as Dashboardlice,
  default as UpcomingEventSlice
} from 'src/requests/Dashboard/Dashboard';
import SliceExamResult from 'src/requests/ExamResult/RequestExamResult';
import SelectExamslice from 'src/requests/Examschedule/Examschedule';
import LibrarySlicee from 'src/requests/Library/Library';
import LoginSchoolNoticeSlice from 'src/requests/LoginSchoolNotice/LoginSchoolNotice';
import MessageCenterSlice from 'src/requests/MessageCenter/MessaageCenter';
import InboxMessageSlice from 'src/requests/Student/InboxMessage';
import GetExamResultslice from 'src/requests/Student/ProgressReport';
import AnnualPlannerSlice from '../requests/AnnualPlanner/AnnualPlanner';
import Feesslice from '../requests/Fees/Fees';
import Holidaysslice from '../requests/Holiday/Holiday';
import HomeworkSlice from '../requests/Homework/Homework';
import PtaSlice from '../requests/PTA/PTA';
import Schoolnoticeslice from '../requests/Schoolnotice/Schoolnotice';
import staffBirthdayslice from '../requests/StaffBirthday/StaffBirthday';
import SmsCenterSlice from '../requests/Student/SMSCenter';
import SentMessageSlice from '../requests/Student/Sentmessage';
import SubjectTeacherSlice from '../requests/Student/SubjectTeacher';
import Timetableslice from '../requests/Student/Timetable';
import Studentwiseprogressslice from '../requests/StudentWiseProgressReport/ReqStudentWiseProgressReport';
// import ChangePasswordSlice from 'src/Slice/Student/changePassword'
import SliceAadharCardDetails from 'src/requests/AadharCardDetails/RequestAadharCard';
import AnnualPlanerBaseScreenSlice from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import AddAnnualPlannerSlice from 'src/requests/AddAnnualPlanner/RequestAddAnnualPlanner';
import DailyLogSlice from 'src/requests/AddDailyLog/RequestAddDailyLog';
import ReqAddNotice from 'src/requests/AddSchoolNotice/ReqAddNotice';
import ReqAllClassesAndDivisions from 'src/requests/AddSchoolNotice/ReqAllClassesAndDivisions';
import ReqDeleteSchoolNotice from 'src/requests/AddSchoolNotice/ReqDeleteSchoolNotice';
import ReqEditSchoolNoticeDetails from 'src/requests/AddSchoolNotice/ReqEditSchoolNoticeDetails';
import ReqGetStandardDivisionsForSelectedNoticeId from 'src/requests/AddSchoolNotice/ReqGetStandardDivisionsForSelectedNoticeId';
import ReqGetUserRolesForSelectedNoticeId from 'src/requests/AddSchoolNotice/ReqGetUserRolesForSelectedNoticeId';
import ReqSaveUpdateSchoolNotices from 'src/requests/AddSchoolNotice/ReqSaveUpdateSchoolNotices';
import ReqUpdateSelectNotice from 'src/requests/AddSchoolNotice/ReqUpdateSelectNotice';
import AComposeSMSSlice from 'src/requests/AdminSMSCenter/AComposeSMS';
import AReceiveSMSSlice from 'src/requests/AdminSMSCenter/AReceiveSMS';
import AScheduledSMSSlice from 'src/requests/AdminSMSCenter/AScheduledSMS';
import AdminSentSlice from 'src/requests/AdminSMSCenter/Sent';
import SentSlice from 'src/requests/AdminSMSCenter/SentSMS';
import GetuserSlice from 'src/requests/AdminSMSCenter/To';
import GetuserSlice1 from 'src/requests/AdminSMSCenter/To1';
import AssignExamMarkSlice from 'src/requests/AssignExamMarks/ReqAssignExamMarks';
import AssignHomeworkSlice from 'src/requests/AssignHomework/RequestAssignHomework';
import AddHomeworkSlice from 'src/requests/AssignHomework/requestAddHomework';
import HomeworkdocumentSlice from 'src/requests/AssignHomework/requestHomeworkDocuments';
import HomeworkSubjectListSlice from 'src/requests/AssignHomework/requestHomeworkSubjetList';
import ViewHomeworkSlice from 'src/requests/AssignHomework/requestViewHomework';
import AssignPrePrimaryGradesSlice from 'src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades';
import MonthwiseAttendanceSlice from 'src/requests/Attendance/requestGetMonthWiseAttendance';
import IndividualAttendanceSlice from 'src/requests/Attendance/requestIndividualAttendance';
import Staffkidslice from 'src/requests/Authentication/StaffKidLogin';
import SliceBirthdays from 'src/requests/Birthdays/RequestBirthdays';
import SliceEditProfile from 'src/requests/EditProfile/RequestEditProfile';
import EventDescriptionSlice from 'src/requests/EventManegment/RequestEventManegment';
import UnPublishTestSlice from 'src/requests/ExamResultUnpublish/RequestExamResultUnpublish';
import SliceFeedback from 'src/requests/Feedback/RequestFeedback';
import FinalResultSlice from 'src/requests/FinalResult/RequestFinalResult';
import FinalResultToppersSlice from 'src/requests/FinalResult/RequestFinalResultToppers';
import StandardToppersSlice from 'src/requests/FinalResult/RqstandardToppers';
import FinalUnPublishTestSlice from 'src/requests/FinalResultUnpublish/RequestFinalResultUnpublish';
import SliceHomeworkNew from 'src/requests/Homework/RequestHomeworkNew';
import SliceIncomeTaxReport from 'src/requests/IncomeTaxReport/RequestIncomeTax';
import AddLeaveDetailsslice from 'src/requests/LeaveDetails/RequestAddLeave';
import AddLessonPlanSlice from 'src/requests/LessonPlan/RequestAddLessonPlan';
import LessonPlanBaseScreenSlice from 'src/requests/LessonPlan/RequestLessonPlanBaseScreen';
import SliceDeleteMessagePermanetly from 'src/requests/MessageCenter/RequestDeleteMessagePermanently';
import SliceDraftMessage from 'src/requests/MessageCenter/RequestDraftMessage';
import SliceNavbarMenu from 'src/requests/NavBarMenu/requestNavBarMenu';
import {
  default as GallerySlice,
  default as PhotoGallarySlice
} from 'src/requests/PhotoGallery/PhotoGallery';
import SlicePrePrimaryResult from 'src/requests/PrePrimaryResult/RequestPrePrimaryResult';
import UnpublishSlice from 'src/requests/PrePrimaryResult/RequestUnpublishPrePrimaryResult';
import SlicePreprimaryProgressReport from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import ProgressRemarkSlice from 'src/requests/ProgressRemarks/ReqProgressRemarks';
import SliceAddRequisition from 'src/requests/Requisition/RequestAddRequisition';
import SliceRequisition from 'src/requests/Requisition/RequestRequisition';
import SchoolAttendanceOverviewSlice from 'src/requests/SchoolAttendanceOverview/RequestSchoolAttendanceOverview';
import SliceSchoolNoticeBoard from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import schoolSettingSlice from 'src/requests/SchoolSetting/schoolSetting';
import MissingAttandenceSlice from 'src/requests/Student/MissingAttandenceSlice';
import SelectOnlineExamSlice from 'src/requests/Student/OnlineExam';
import OnlineExamProgressReportSlice from 'src/requests/Student/OnlineExamProgressReport';
import SliceStudentPic from 'src/requests/StudentPhoto/RequestStudentPhoto';
import StudentRecordsSlice from 'src/requests/StudentRecords/RequestStudentRecords';
import SliceSupport from 'src/requests/Support/RequestSupport';
import TAttendanceSlice from 'src/requests/TAttendance/TAttendance';
import SelectStandardExamslice from 'src/requests/TExamschedule/TExamschedule';
import TMTimetableslice from 'src/requests/Teacher/TMtimetable';
import SliceTermsAndConditions from 'src/requests/TermAndCondition/TermAndCondition';
import TermwiseHeightWeightSlice from 'src/requests/TermwiseHeightWeight/RequestTermwiseHeightWeight';
import SliceTransportcommittee from 'src/requests/TransportCommittee/RequestTransportcommittee';
import SliceTransportDetails from 'src/requests/TransportDetails/RequestTransportDetails';
import SliceUploadParentPhoto from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import SliceUserLoginExpires from 'src/requests/UserLoginExpires/RequestUserLoginExpires';
import VideOGallerySlice from 'src/requests/VideoGallery/VideoGallery';
import AbsentStudentDetailsslice from '../requests/AbsentStudentDetails/RequestAbsentStudent';
import AbsentStudentslice from '../requests/AbsentStudentPopCp/ReqAbsentStudent';
import AddNoticeslice from '../requests/AddSchoolNotice/ReqAddNotice';
import AddSchoolNotice from '../requests/AddSchoolNotice/ReqAddSchoolNotice';
import SchoolNoticeFormslice from '../requests/AddSchoolNotice/RequestSchoolNoticeForm';
import ExamResultToppersSlice from '../requests/ExamResult/RequestExamResultToppers';
import SubjectMarkListSlice from '../requests/ExamResult/RequestSubjectMarkList';
import ToppersSlice from '../requests/ExamResult/RequestToppers';
import ViewProgressReportslice from '../requests/ExamResult/RequestViewProgressReport';
import FinalResultGenerateAllSlice from '../requests/FinalResult/RequestFinalResultGenerateAll';
import AddInvestmentDetailsDocumentSlice from '../requests/InvestmentDeclaration/ReqAddInvestmentDetailsDocument';
import InvestmentDeclarationSlice from '../requests/InvestmentDeclaration/ReqInvestmentDeclaration';
import LeaveDetailsslice from '../requests/LeaveDetails/RequestLeaveDetails';
import MissingattendanceAleartSlice from '../requests/MissingAttendanceAleart/ReqMissAttendAleart';
import AadharcardTecaherSlice from '../requests/NewAadharcard/RAadharcardTecaher';
import Notificationslice from '../requests/Notification/Notification';
import PerformanceGradeAssignmentslice from '../requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment';
import RemarkTemplateSlice from '../requests/ProgressRemarks/ReqRemarkTemplate';
import ProgressReportSlice from '../requests/ProgressReport/ReqProgressReport';
import SchoolLibraryslice from '../requests/SchoolLibrary/ReqLibraryBaseScreen';
import SchoolNoticePopupslice from '../requests/SchoolNoticePopup/RequestSchoolNoticePopup';
import AddStudentRecordsSlice from '../requests/StudentRecords/RequestAddStudentRecords';
import StudentRecordCommentslice from '../requests/StudentRecords/RequestStudentRecordComment';
import StudentsSlice from '../requests/Students/RequestStudents';
import SubjectExamMarksslice from '../requests/SubjectExamMarks/RequestSubjectExamMarks';
import TransferOptionalSubjectMarksSlice from '../requests/TransferOptionalSubjectMarks/ReqTransferOptionalSubjectMarks';
import UpcomingEventDashslice from '../requests/UpcomingEventDash/ReqUpcomingEventDash';
import VeiwResultSlice from '../requests/VeiwAllResult/ReqveiwresultAll';
import WeeklyTimeTableSlice from '../requests/WeeklyTimeTable/RequestWeeklyTimeTable';
import SliceSentsms from '../requests/SentSms/ReqSentsms';

const rootReducer = combineReducers({
  FeedBack: SliceFeedback,
  Students: StudentsSlice,
  Support: SliceSupport,
  Holidays: Holidaysslice,
  WeeklyTimetable: WeeklyTimeTableSlice,
  Notification: Notificationslice,
  staffBirthday: staffBirthdayslice,
  Timetable: Timetableslice,
  Schoolnotice: Schoolnoticeslice,
  Pta: PtaSlice,
  SmsCenter: SmsCenterSlice,
  SubjectTeacher: SubjectTeacherSlice,
  SchoolList: SchoolListslice,
  NewRelease: NewRelease,
  Sent__Message: SentMessageSlice,
  InboxMessage: InboxMessageSlice,
  Fees: Feesslice,
  UpcomingEventss: UpcomingEventSlice,
  AnnualPlanner: AnnualPlannerSlice,
  Homework: HomeworkSlice,
  ExamsList: SelectExamslice,
  LoginList: LoginSchoolNoticeSlice,
  MessageCenter: MessageCenterSlice,
  Attendance: AttendanceSlice,
  Dashboard: Dashboardlice,
  library: LibrarySlicee,
  Progressreport: GetExamResultslice,
  ExamOnlineReport: OnlineExamProgressReportSlice,
  PhotoGalllary: PhotoGallarySlice,
  Gallery: GallerySlice,
  Video: VideOGallerySlice,
  OnlineExam: SelectOnlineExamSlice,
  TAttendance: TAttendanceSlice,
  AttendanceList: TAttendanceSlice,
  StandardAndExamList: SelectStandardExamslice,
  StandardAttendance: TAttendanceSlice,
  TMTimetable: TMTimetableslice,
  MissingAttandence: MissingAttandenceSlice,
  AScheduledSMS: AScheduledSMSSlice,
  AScheduledSMSDetails: AScheduledSMSSlice,
  SentSMSAdmin: SentSlice,
  AReceiveSMS: AReceiveSMSSlice,
  Sent: AdminSentSlice,
  getuser: GetuserSlice,
  getuser1: GetuserSlice1,
  VeiwResult: VeiwResultSlice,
  getGetAdminAndprincipalUsers: GetuserSlice,
  getAComposeSMS: AComposeSMSSlice,
  getSchoolSettings: schoolSettingSlice,
  getASendSMS: AComposeSMSSlice,
  getModulesPermissionsResult: schoolSettingSlice,
  SchoolSettings: SchoolListslice,
  TransportDetails: SliceTransportDetails,
  Birthdays: SliceBirthdays,
  DeleteMessagePermanetly: SliceDeleteMessagePermanetly,
  UploadParentPhoto: SliceUploadParentPhoto,
  AadharCardDetails: SliceAadharCardDetails,
  IncomeTaxReport: SliceIncomeTaxReport,
  EditProfile: SliceEditProfile,
  TransportCommittee: SliceTransportcommittee,
  HomeworkNew: SliceHomeworkNew,
  NavbarMenu: SliceNavbarMenu,
  TermAndConditions: SliceTermsAndConditions,
  userLoginExpires: SliceUserLoginExpires,
  StudentPic: SliceStudentPic,
  SchoolNoticeBoard: SliceSchoolNoticeBoard,
  StaffKidLogin: Staffkidslice,
  DraftMessages: SliceDraftMessage,
  SchoolAttendance: SchoolAttendanceOverviewSlice,
  IndividualAttendance: IndividualAttendanceSlice,
  AddPlanner: AddAnnualPlannerSlice,
  MonthwiseAttendance: MonthwiseAttendanceSlice,
  ExamResult: SliceExamResult,
  AnnualPlanerBaseScreen: AnnualPlanerBaseScreenSlice,
  AssignExamMarkSlice: AssignExamMarkSlice,
  TeacherNameList: AssignHomeworkSlice,
  TermwiseHtWt: TermwiseHeightWeightSlice,
  AddDailyLog: DailyLogSlice,
  EventsManagement: EventDescriptionSlice,
  AssignPrePrimaryGrades: AssignPrePrimaryGradesSlice,
  ProgressRemarkSlice: ProgressRemarkSlice,
  FinalResult: FinalResultSlice,
  StudentRecords: StudentRecordsSlice,
  FinalResultToppers: FinalResultToppersSlice,
  unpublishtest: UnPublishTestSlice,
  StandardToppers: StandardToppersSlice,
  AddHomework: AddHomeworkSlice,
  HomeworkSubjectList: HomeworkSubjectListSlice,
  Homeworkdocument: HomeworkdocumentSlice,
  ViewHomework: ViewHomeworkSlice,
  addlessonplan: AddLessonPlanSlice,
  LessonPlanBase: LessonPlanBaseScreenSlice,
  PrePrimaryResult: SlicePrePrimaryResult,
  SliceRequisition: SliceRequisition,
  SliceAddRequisition: SliceAddRequisition,
  Finalunpublish: FinalUnPublishTestSlice,
  UnpublishSlice: UnpublishSlice,
  AadharcardTecaherSlice: AadharcardTecaherSlice,
  SubjectExamMark: SubjectExamMarksslice,
  ExamResultToppers: ExamResultToppersSlice,
  TransferOptionalSubjectMarks: TransferOptionalSubjectMarksSlice,
  SubjectMarkList: SubjectMarkListSlice,
  RemarkTemplate: RemarkTemplateSlice,
  ViewProgressReport: ViewProgressReportslice,
  FinalResultGenerateAll: FinalResultGenerateAllSlice,
  ProgressReportNew: ProgressReportSlice,
  MissingAttendanceAleart: MissingattendanceAleartSlice,
  Toppers: ToppersSlice,
  InvestmentDeclaration: InvestmentDeclarationSlice,
  AddInvestmentDetailsDoc: AddInvestmentDetailsDocumentSlice,
  LeaveDetails: LeaveDetailsslice,
  Studentwiseprogress: Studentwiseprogressslice,
  AddSchoolNotice: AddSchoolNotice,
  AddLeaveDetails: AddLeaveDetailsslice,
  AddStudentRecords: AddStudentRecordsSlice,
  UpdateSelectNotice: ReqUpdateSelectNotice,
  DeleteSchoolNotice: ReqDeleteSchoolNotice,
  AddNotice: ReqAddNotice,
  GetAllClassesAndDivisions: ReqAllClassesAndDivisions,
  GetUserRolesForSelectedNoticeId: ReqGetUserRolesForSelectedNoticeId,
  SaveUpdateSchoolNotice: ReqSaveUpdateSchoolNotices,
  EditSchoolNoticeDetails: ReqEditSchoolNoticeDetails,
  GetStandardDivisionsForSelectedNoticeId: ReqGetStandardDivisionsForSelectedNoticeId,
  StudentRecordCommentPopup: StudentRecordCommentslice,
  SchoolNotice: AddNoticeslice,
  SchoolNoticeForm: SchoolNoticeFormslice,
  PreprimaryProgressReport: SlicePreprimaryProgressReport,
  SchoolNoticePopup: SchoolNoticePopupslice,
  AbsentStudentDetail: AbsentStudentDetailsslice,
  AbsentStudent: AbsentStudentslice,
  PerformanceGradeAssignment: PerformanceGradeAssignmentslice,
  UpcomingEventDash: UpcomingEventDashslice,
  SchoolLibrary: SchoolLibraryslice,
  SentSms:SliceSentsms
});

export default rootReducer;
