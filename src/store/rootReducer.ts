import { combineReducers } from '@reduxjs/toolkit';
import Holidaysslice from "../Client_Api/Common/Holiday";
import staffBirthdayslice from "../Client_Api/Common/StaffBirthday";
import Feesslice from "../Client_Api/Student/Fees";
import PtaSlice from "../Client_Api/Common/PTA";
import SchoolListslice from "src/Client_Api/Authentication/SchoolList";
import Timetableslice from "../Client_Api/Student/Timetable";
import Schoolnoticeslice  from "../Client_Api/Common/Schoolnotice";
import SmsCenterSlice from "../Client_Api/Student/SMSCenter";
import SubjectTeacherSlice from "../Client_Api/Student/SubjectTeacher";
import SentMessageSlice from "../Client_Api/Student/Sentmessage";
import AnnualPlannerSlice from "../Client_Api/Common/AnnualPlanner";
import HomeworkSlice from "../Client_Api/Student/Homework";
import SelectExamslice from 'src/Client_Api/Student/Examschedule';
import LoginSchoolNoticeSlice from 'src/Client_Api/Student/LoginSchoolNotice'
import MessageCenterSlice from 'src/Client_Api/MessageCenter/MessaageCenter';
import InboxMessageSlice from 'src/Client_Api/Student/InboxMessage';
import UpcomingEventSlice from 'src/Client_Api/Student/Dashboard'
import AttendanceSlice from 'src/Client_Api/Student/Attendance';
import  Dashboardlice from 'src/Client_Api/Student/Dashboard';
import LibrarySlicee from 'src/Client_Api/Student/Library';
import GetExamResultslice from 'src/Client_Api/Student/ProgressReport';
// import ChangePasswordSlice from 'src/Slice/Student/changePassword'
import OnlineExamProgressReportSlice from 'src/Client_Api/Student/OnlineExamProgressReport';
import PhotoGallarySlice from 'src/Client_Api/Common/PhotoGallery';
import GallerySlice from 'src/Client_Api/Common/PhotoGallery';
import VideOGallerySlice from 'src/Client_Api/Common/VideoGallery'
import SelectOnlineExamSlice from 'src/Client_Api/Student/OnlineExam';
import TMTimetableslice from 'src/Client_Api/Teacher/TMtimetable';
import TAttendanceSlice from 'src/Client_Api/Teacher/TAttendance';
import MissingAttandenceSlice from 'src/Client_Api/Student/MissingAttandenceSlice';
import SelectStandardExamslice from  'src/Client_Api/Teacher/TExamschedule';
import AScheduledSMSSlice from 'src/Client_Api/AdminSMSCenter/AScheduledSMS';
import SentSlice from 'src/Client_Api/AdminSMSCenter/SentSMS';
import AReceiveSMSSlice from 'src/Client_Api/AdminSMSCenter/AReceiveSMS';
import AdminSentSlice from 'src/Client_Api/AdminSMSCenter/Sent';
import GetuserSlice from 'src/Client_Api/AdminSMSCenter/To';
import AComposeSMSSlice from 'src/Client_Api/AdminSMSCenter/AComposeSMS';
import schoolSettingSlice from 'src/Client_Api/SchoolSetting/schoolSetting';

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
