import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import SmsIcon from '@mui/icons-material/Sms';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const DashboardData = {
    items1:[
    {
      Text1: 'School ',
      Text2: 'Notice',
      Color: '#81c784',
      iconColor: '#35abd9',
      Icon: AssignmentIcon,
      Link: 'Common/SchoolNotice',
      index: 1,
      ModulesPermission: 'EnableSchoolNotices'
    },
    {
      Text1: ' Annual ',
      Text2: 'Planner',
      Color: '#ef5350',
      iconColor: '#f0483e',
      Icon: EventIcon,
      Link: 'Common/EventOverview',
      index: 2,
      ModulesPermission: 'EnableAnnualPlanner'
    },
    {
      Text1: 'Holidays',
      Text2: '',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: DateRangeIcon,
      Link: 'Common/Holidays',
      index: 3,
      ModulesPermission: 'EnableHoliday'
    },
    {
      Text1: 'Photo ',
      Text2: 'Gallery',
      Color: '#81c784',
      iconColor: '#f0483e',
      Icon: PhotoIcon,
      Link: 'Common/PhotoGallery',
      index: 4
    },
    {
      Text1: 'Video ',
      Text2: 'Gallery',
      Color: '#ef5350',
      iconColor: '#35abd9',
      Icon: VideoLibraryIcon,
      Link: 'Common/VideoGallery',
      index: 5
    }
  ]
  ,
  items2 : [
    {
      Text1: 'Attendance',
      Text2: '',
      Color: '#81c784',
      iconColor: '#424242',
      Icon: EventNoteIcon,
      Link: 'Student/attendance',
      index: 6,
      ModulesPermission: 'EnableStudentAttendanceModule'
    },
    {
      Text1: 'Timetable',
      Text2: '',
      Color: '#ef5350',
      iconColor: '#f0483e',
      Icon: AccessTimeIcon,
      Link: 'Student/Timetable',
      index: 7,
      ModulesPermission: 'EnableTimetableMenuForStudentLogin'
    },
    {
      Text1: 'Fees',
      Text2: '',
      Color: '#90a4ae',
      iconColor: ' #35abd9',
      Icon: MonetizationOnIcon,
      Link: 'Student/Fees',
      index: 8,
      ModulesPermission: 'EnableStudentFeesModule'
    },
    {
      Text1: 'Homework ',
    
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: MenuBookIcon,
      Link: 'Student/Homework',
      index: 9,
      ModulesPermission: 'EnableHomeworkModule'
    }
    // {
    //   Text: 'Change Password',
    //   Color: '#90a4ae',
    //   iconColor: '#ef5350',
    //   Icon: LockOpenIcon,
    //   Link: 'Student/changePassword',
    //   index: 10
    // }
  ],
  items3: [
    {
      Text1: 'Subject ',
      Text2: 'Teachers',
      Color: '#81c784',
      iconColor: '#f0483e',
      Icon: PeopleIcon,
      Link: 'Student/SubjectTeacher',
      index: 11
    },
    {
      Text1: 'Exam ',
      Text2: 'Schedule',
      Color: '#ef5350',
      iconColor: '#35abd9',
      Icon: CalendarTodayIcon,
      Link: 'Student/Examschedule',
      index: 12,
      ModulesPermission: 'EnableStudentExamSchedule'
    },
    {
      Text1: 'Progress ',
      Text2: 'Report',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: AssessmentIcon,
      Link: 'Student/Progressreport',
      index: 13,
      ModulesPermission: 'EnableProgressReport'
    },

    {
      Text1: 'Online Exam ',
      Text2: 'Schedule',
      Color: '#90a4ae',
      iconColor: '#f0483e',
      Icon: BorderColorOutlinedIcon,
      Link: 'Student/OnlineExam',
      index: 14
    },
    {
      Text1: ' Online Exam ',
      Text2: 'ProgressReport',
      Color: '#90a4ae',
      iconColor: '#35abd9',
      Icon: AssessmentOutlinedIcon,
      Link: 'Student/OnlineExamProgressReport',
      index: 15
    },
    {
      Text1: ' Library ',
      Text2: '',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: HistoryEduOutlinedIcon,
      Link: 'Student/Library',
      index: 16
    },
    {
      Text1: 'Message ',
      Text2: 'Center',
      Color: '#90a4ae',
      iconColor: ' #f0483e',
      Icon: ForwardToInboxIcon,
      Link: 'MessageCenter/msgCenter',
      index: 17,
      ModulesPermission: 'EnableMessageCenter'
    },
    {
      Text1: 'SMS ',
      Text2: 'Center',
      Color: '#90a4ae',
      iconColor: '#35abd9',
      Icon: SmsIcon,
      Link: 'Student/SmsCenter',
      index: 18,
      ModulesPermission: 'EnableSMSCenter'
    },
    {
      Text1: 'PTA',
      Text2: '',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: PeopleIcon,
      Link: 'Common/PTA',
      index: 19,
      ModulesPermission: 'EnablePTAModuleforStudents'
    }
  ]}
export default DashboardData;