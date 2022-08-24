import { combineReducers } from '@reduxjs/toolkit';
import Holidaysslice from "../requests/Holiday/Holiday";
import staffBirthdayslice from "../requests/StaffBirthday/StaffBirthday";
import Feesslice from "../requests/Student/Fees";
import PtaSlice from "../requests/PTA/PTA";
import SchoolListslice from "src/requests/Authentication/SchoolList";
import Timetableslice from "../requests/Student/Timetable";
import Schoolnoticeslice  from "../requests/Schoolnotice/Schoolnotice";
import SmsCenterSlice from "../requests/Student/SMSCenter";
import SubjectTeacherSlice from "../requests/Student/SubjectTeacher";
import SentMessageSlice from "../requests/Student/Sentmessage";
import AnnualPlannerSlice from "../requests/AnnualPlanner/AnnualPlanner";
import HomeworkSlice from "../requests/Student/Homework";
import SelectExamslice from 'src/requests/Student/Examschedule';
import LoginSchoolNoticeSlice from 'src/requests/Student/LoginSchoolNotice'
import MessageCenterSlice from 'src/requests/MessageCenter/MessaageCenter';
import InboxMessageSlice from 'src/requests/Student/InboxMessage';
import UpcomingEventSlice from 'src/requests/Student/Dashboard'
import AttendanceSlice from 'src/requests/Student/Attendance';
import  Dashboardlice from 'src/requests/Student/Dashboard';
import LibrarySlicee from 'src/requests/Student/Library';
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
import SelectStandardExamslice from  'src/requests/Teacher/TExamschedule';
import AScheduledSMSSlice from 'src/requests/AdminSMSCenter/AScheduledSMS';
import SentSlice from 'src/requests/AdminSMSCenter/SentSMS';
import AReceiveSMSSlice from 'src/requests/AdminSMSCenter/AReceiveSMS';
import AdminSentSlice from 'src/requests/AdminSMSCenter/Sent';
import GetuserSlice from 'src/requests/AdminSMSCenter/To';
import AComposeSMSSlice from 'src/requests/AdminSMSCenter/AComposeSMS';
import schoolSettingSlice from 'src/requests/SchoolSetting/schoolSetting';

const rootReducer = combineReducers({
    Holidays:Holidaysslice,
    staffBirthday:staffBirthdayslice,
    Timetable:Timetableslice,
    Schoolnotice:Schoolnoticeslice,
    Pta : PtaSlice,
    SmsCenter : SmsCenterSlice,
    SubjectTeacher: SubjectTeacherSlice,
    SchoolList : SchoolListslice,
    Sent__Message : SentMessageSlice,
    InboxMessage : InboxMessageSlice,
    Fees :Feesslice,
    UpcomingEventss:UpcomingEventSlice,
    AnnualPlanner : AnnualPlannerSlice,
    Homework :  HomeworkSlice,
    ExamsList : SelectExamslice,
    LoginList : LoginSchoolNoticeSlice,
    MessageCenter : MessageCenterSlice,
    Attendance: AttendanceSlice,
    Dashboard : Dashboardlice,
    library:LibrarySlicee,
    Progressreport : GetExamResultslice,
    // ChangePassword:ChangePasswordSlice,
    ExamOnlineReport:OnlineExamProgressReportSlice,
    PhotoGalllary : PhotoGallarySlice,
    Gallery : GallerySlice,
    Video : VideOGallerySlice,
    OnlineExam : SelectOnlineExamSlice,
    TAttendance:TAttendanceSlice,
    AttendanceList:TAttendanceSlice,
    StandardAndExamList:SelectStandardExamslice,
    StandardAttendance:TAttendanceSlice,
    TMTimetable:TMTimetableslice,
    MissingAttandence:MissingAttandenceSlice,
    AScheduledSMS:AScheduledSMSSlice,
    AScheduledSMSDetails:AScheduledSMSSlice,
    SentSMSAdmin:SentSlice,
    AReceiveSMS:AReceiveSMSSlice,
    Sent : AdminSentSlice,
    getuser:GetuserSlice,
    getGetAdminAndprincipalUsers:GetuserSlice,
    getAComposeSMS:AComposeSMSSlice,
    getSchoolSettings:schoolSettingSlice,
    getASendSMS:AComposeSMSSlice,
    getModulesPermissionsResult:schoolSettingSlice
});

export default rootReducer;
