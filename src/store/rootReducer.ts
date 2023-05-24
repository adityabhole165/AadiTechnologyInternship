

import { combineReducers } from '@reduxjs/toolkit';
import Holidaysslice from "../requests/Holiday/Holiday";
import staffBirthdayslice from "../requests/StaffBirthday/StaffBirthday";
import Feesslice from "../requests/Fees/Fees";
import PtaSlice from "../requests/PTA/PTA";
import SchoolListslice from "src/requests/Authentication/SchoolList";
import NewRelease from "src/requests/Authentication/NewRelease";
import Timetableslice from "../requests/Student/Timetable";
import Schoolnoticeslice from "../requests/Schoolnotice/Schoolnotice";
import SmsCenterSlice from "../requests/Student/SMSCenter";
import SubjectTeacherSlice from "../requests/Student/SubjectTeacher";
import SentMessageSlice from "../requests/Student/Sentmessage";
import AnnualPlannerSlice from "../requests/AnnualPlanner/AnnualPlanner";
import HomeworkSlice from "../requests/Homework/Homework";
import SelectExamslice from 'src/requests/Examschedule/Examschedule';
import LoginSchoolNoticeSlice from 'src/requests/LoginSchoolNotice/LoginSchoolNotice'
import MessageCenterSlice from 'src/requests/MessageCenter/MessaageCenter';
import InboxMessageSlice from 'src/requests/Student/InboxMessage';
import UpcomingEventSlice from 'src/requests/Dashboard/Dashboard'
import AttendanceSlice from 'src/requests/Attendance/Attendance';
import Dashboardlice from 'src/requests/Dashboard/Dashboard';
import LibrarySlicee from 'src/requests/Library/Library';
import GetExamResultslice from 'src/requests/Student/ProgressReport';
// import ChangePasswordSlice from 'src/Slice/Student/changePassword'
import OnlineExamProgressReportSlice from 'src/requests/Student/OnlineExamProgressReport';
import PhotoGallarySlice from 'src/requests/PhotoGallery/PhotoGallery';
import GallerySlice from 'src/requests/PhotoGallery/PhotoGallery';
import VideOGallerySlice from 'src/requests/VideoGallery/VideoGallery'
import SelectOnlineExamSlice from 'src/requests/Student/OnlineExam';
import TMTimetableslice from 'src/requests/Teacher/TMtimetable';
import TAttendanceSlice from 'src/requests/TAttendance/TAttendance';
import MissingAttandenceSlice from 'src/requests/Student/MissingAttandenceSlice';
import SelectStandardExamslice from 'src/requests/TExamschedule/TExamschedule';
import AScheduledSMSSlice from 'src/requests/AdminSMSCenter/AScheduledSMS';
import SentSlice from 'src/requests/AdminSMSCenter/SentSMS';
import AReceiveSMSSlice from 'src/requests/AdminSMSCenter/AReceiveSMS';
import AdminSentSlice from 'src/requests/AdminSMSCenter/Sent';
import GetuserSlice from 'src/requests/AdminSMSCenter/To';
import GetuserSlice1 from 'src/requests/AdminSMSCenter/To1';
import AComposeSMSSlice from 'src/requests/AdminSMSCenter/AComposeSMS';
import schoolSettingSlice from 'src/requests/SchoolSetting/schoolSetting';
import Notificationslice from "../requests/Notification/Notification";
import NewReleaseslice from 'src/requests/Authentication/NewRelease';
import SliceFeedback from 'src/requests/Feedback/RequestFeedback';
import SliceTransportDetails from 'src/requests/TransportDetails/RequestTransportDetails';
import SliceSupport from 'src/requests/Support/RequestSupport';
import SliceBirthdays from 'src/requests/Birthdays/RequestBirthdays';
import SliceDeleteMessagePermanetly from 'src/requests/MessageCenter/RequestDeleteMessagePermanently';
import SliceUploadParentPhoto from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import SliceAadharCardDetails from 'src/requests/AadharCardDetails/RequestAadharCard';
import SliceIncomeTaxReport from 'src/requests/IncomeTaxReport/RequestIncomeTax';
import SliceEditProfile from 'src/requests/EditProfile/RequestEditProfile';
import SliceTransportcommittee from 'src/requests/TransportCommittee/RequestTransportcommittee';
import SliceHomeworkNew from 'src/requests/Homework/RequestHomeworkNew';
import SliceNavbarMenu from 'src/requests/NavBarMenu/requestNavBarMenu';
import SliceTermsAndConditions from 'src/requests/TermAndCondition/TermAndCondition';
import SliceUserLoginExpires from 'src/requests/UserLoginExpires/RequestUserLoginExpires';

const rootReducer = combineReducers({
    FeedBack: SliceFeedback,
    Support: SliceSupport,
    Holidays: Holidaysslice,
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
    EditProfile:SliceEditProfile,
    TransportCommittee: SliceTransportcommittee,
    HomeworkNew: SliceHomeworkNew,
    NavbarMenu:SliceNavbarMenu,
    TermAndConditions: SliceTermsAndConditions,
    userLoginExpires: SliceUserLoginExpires
});

export default rootReducer;
