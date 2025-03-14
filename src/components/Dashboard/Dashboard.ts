import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCardIcon from '@mui/icons-material/AddCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import SmsIcon from '@mui/icons-material/Sms';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { GetIsPrePrimaryTeacher } from '../Common/Util';

const isPreprimary = GetIsPrePrimaryTeacher();
const asUserRoleId = sessionStorage.getItem('RoleId');
const DashboardData = {
  Student: {
    items1: [
      // {
      //   Text1: 'School ',
      //   Text2: 'Notices',
      //   Color: '#81c784',
      //   iconColor: '#35abd9',
      //   Icon: AssignmentIcon,
      //   Link: 'Teacher/SchoolNoticeBasescreen',
      //   index: 1,
      //   ModulesPermission: 'EnableSchoolNotices'
      // },
      {
        Text1: ' Annual ',
        Text2: 'Planner',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: EventIcon,
        Link: 'Common/AnnualPlanner',
        index: 2,
        ModulesPermission: 'EnableAnnualPlanner'
      },
      // {
      //   Text1: 'Holidays',
      //   Text2: '',
      //   Color: '#90a4ae',
      //   iconColor: '#424242',
      //   Icon: DateRangeIcon,
      //   Link: 'Common/Holidays',
      //   index: 3,
      //   ModulesPermission: 'EnableHoliday'
      // },
      {
        Text1: 'Holidays',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#424242',
        Icon: DateRangeIcon,
        Link: 'Admin/SchoolConfiguration/Holidays',
        index: 3,
        ModulesPermission: 'EnableHoliday'
      },

      {
        Text1: 'Transport',
        Text2: 'Details',
        Color: '#90a4ae',
        iconColor: '#fecf1f ',
        Icon: DirectionsBusIcon,
        Link: 'Student/TransportDetails',
        ImageUrl: '/imges/New.png',
        index: 23
      },

      {
        Text1: ' Transport ',
        Text2: 'Committee',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        Icon: PeopleIcon,
        Link: 'Student/TransportCommittee',
        index: 32
      },

      {
        Text1: 'Library',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#424242',
        Icon: HistoryEduOutlinedIcon,
        ImageUrl: '/imges/library.png',
        Link: 'Student/Library',
        index: 27
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
        Link: 'Common/VideoGallery/VideoAlbum',
        index: 5
      },
      {
        Text1: 'Birthdays',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: CakeIcon,
        Link: 'Student/Birthdays',
        index: 26
      }
    ],
    items2: [
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
        Icon: CurrencyRupeeIcon,
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
        index: 9
        // ModulesPermission: 'EnableHomeworkModule'
      }
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
        ImageUrl: '/imges/onlineExam.png',
        index: 12,
        ModulesPermission: 'EnableStudentExamSchedule'
      },
      {
        Text1: 'Progress ',
        Text2: 'Report',
        Color: '#90a4ae',
        iconColor: '#424242',
        Icon: '/imges/progressreport.png',
        Link: 'Student/Progressreport',
        ImageUrl: '/imges/progressreport.png',
        index: 13,
        ModulesPermission: 'EnableProgressReport'
      },

      {
        Text1: 'Message ',
        Text2: 'Center',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        Icon: ForwardToInboxIcon,
        Link: 'MessageCenter/msgCenter',
        index: 17,
        ModulesPermission: 'EnableMessageCenter'
      },
      {
        Text1: 'SMS ',
        Text2: 'Center',
        Color: '#90a4ae',
        iconColor: ' #424242',
        Icon: SmsIcon,
        Link: 'Student/SmsCenter',
        index: 18,
        ModulesPermission: 'EnableSMSCenter'
      },

      {
        Text1: 'PTA',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: PeopleIcon,
        Link: 'Common/PTA',
        index: 19,
        ModulesPermission: 'EnablePTAModuleforStudents'
      },

      {
        Text1: 'Update ',
        Text2: ' Profile',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: AddCardIcon,
        Link: 'Student/AadharCardDetails',
        index: 28
      },
      {
        Text1: 'Upload',
        Text2: 'Photo',
        Color: '#81c784',
        iconColor: '#35abd9',
        ImageUrl: '/imges/parenticon.png',
        Link: 'Student/UploadParentPhoto',
        index: 29
      },

      {
        Text1: 'Income',
        Text2: 'Tax Report',
        Color: '#81c784',
        iconColor: '#35abd9',
        ImageUrl: '/imges/incometax.png',
        Link: 'Student/IncomeTaxReport',
        index: 30
      },
      {
        Text1: 'Online',
        Text2: 'Exam',
        Color: '#81c784',
        iconColor: '#35abd9',
        ImageUrl: '/imges/OExamSchedule.png',
        Link: 'Student/OnlineExam',
        index: 31
      },

      {
        Text1: ' O-Progress ',
        Text2: 'Report',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        ImageUrl: '/imges/progress.png',
        Link: 'Student/OnlineExamProgressReport',
        index: 33
      }

      // {
      //   Text1: 'Navbar',
      //   Text2: 'Menus',
      //   Color: '#81c784',
      //   iconColor: '#35abd9',
      //   ImageUrl: "",
      //   Link: 'Student/NavBarMenus',
      //   index: 35,
      // },
    ]
  },
  Teacher: {
    items1: [


      {
        Text1: 'Dashboard  ',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: EventIcon,
        Link: 'Common/Dashboard',
        index: 12,

      },

      {
        Text1: 'Annual  ',
        Text2: 'Planner',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: EventIcon,
        Link: 'Teacher/AnnualPlanner',
        index: 2,

      },

      {
        Text1: 'Holidays  ',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#424242',
        Icon: DateRangeIcon,
        Link: 'Admin/SchoolConfiguration/Holidays',
        index: 3,
        ScreenPermission: 'HolidaysManagement'
      },



      {
        Text1: 'Photo    ',
        Text2: 'Gallery',
        Color: '#81c784',
        iconColor: '#f0483e',
        Icon: PhotoIcon,
        Link: 'Common/PhotoGallery',
        index: 4
      },
      {
        Text1: 'Video  ',
        Text2: 'Gallery',
        Color: '#ef5350',
        iconColor: '#35abd9',
        Icon: VideoLibraryIcon,
        Link: 'Common/VideoGallery/VideoAlbum',
        index: 5
      },

      // {
      //   Text1: 'Individual Attendance',
      //   Text2: '',
      //   Color: '#90a4ae',
      //   iconColor: '#f0483e ',
      //   Icon: CakeIcon,
      //   Link: 'Teacher/IndidualAttendance',
      //   index: 26
      // },

      // {
      //   Text1: 'Annual Planer',
      //   Text2: 'BaseScreen',
      //   Color: '#ef5350',
      //   iconColor: '#f0483e ',
      //   Icon: EventIcon,
      //   Link: 'Common/AnnualPlanner',
      //   index: 2
      // },

      // {
      //   Text1: 'SchoolAttendance',
      //   Text2: 'Overview',
      //   Color: '#ef5350',
      //   iconColor: '#f0483e ',
      //   Icon: EventIcon,
      //   Link: 'Teacher/SchoolAttendanceOverview',
      //   index: 2
      // },

      {
        Text1: 'Exam Result',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: EventIcon,
        Link: 'Teacher/ExamResultBase',
        index: 7
      },
      {
        Text1: 'Library',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: EventIcon,
        Link: 'Teacher/LibraryBaseScreen',
        index: 7,
        // ScreenPermission: 'LibraryBaseScreen'
      },

      {
        Text1: 'Assign Exam Mark',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: EventIcon,
        Link: 'Teacher/AssignExamMark',
        index: 7
      },
      {
        Text1: 'Aadhar Card',
        Text2: 'Details',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: AssignmentIndIcon,
        Link: 'Teacher/AadharCard',
        index: 28
      }

      // {
      //   Text1: 'Library',
      //   Text2: '',
      //   Color: '#90a4ae',
      //   iconColor: '#424242',
      //   Icon: HistoryEduOutlinedIcon,
      //   ImageUrl: "/imges/library.png",
      //   Link: 'Student/Library',
      //   index: 27
      // },
    ],
    items2: [
      {
        Text1: 'Exam Schedule Full Acccess',
        Text2: '',
        Color: '#81c784',
        iconColor: '#35abd9',
        Icon: AssignmentIcon,
        Link: 'Teacher/ExamScheduleBaseScreen',
        index: 30
      },
      {
        Text1: 'Final Result ',
        Text2: 'Unpublish ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/FinalResultUnpublish',
        index: 40
      },
      // {
      //   Text1: 'AddLessonPlan ',
      //   Text2: ' ',
      //   Color: '#81c784',
      //   iconColor: '#424242',
      //   Icon: AssignmentIcon,
      //   Link: 'Teacher/AddLessonPlan',
      //   index: 33
      // },
      {
        Text1: 'Lesson Plan ',
        Text2: '',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/LessonPlanBaseScreen',
        index: 15
      },
      {
        Text1: 'Performance Grade Assignment',
        Text2: '',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/PerformanceGradeAssignmentBaseScreen',
        index: 14
      },

      // {
      //   Text1: 'Event ',
      //   Text2: 'Manegement ',
      //   Color: '#81c784',
      //   iconColor: '#424242',
      //   Icon: AssignmentIcon,
      //   Link: 'Teacher/EventManegement',
      //   index: 14
      // },
      // {
      //   Text1: 'AddDaily ',
      //   Text2: 'Log ',
      //   Color: '#81c784',
      //   iconColor: '#424242',
      //   Icon: AssignmentIcon,
      //   Link: 'Teacher/AddDailyLog',
      //   index: 13
      // },
      {
        Text1: 'Final ',
        Text2: 'Result ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/FinalResult',
        index: 36
      },
      // {
      //   Text1: 'FinalResult ',
      //   Text2: 'Toppers',
      //   Color: '#81c784',
      //   iconColor: '#424242',
      //   Icon: AssignmentIcon,
      //   Link: 'Teacher/FinalResultToppers',
      //   index: 38
      // },
      // {
      //   Text1: 'Standard ',
      //   Text2: 'Toppers',
      //   Color: '#81c784',
      //   iconColor: '#424242',
      //   Icon: AssignmentIcon,
      //   Link: 'Teacher/StandardToppers',
      //   index: 39
      // },
      {
        Text1: 'Student ',
        Text2: 'Records ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: CakeIcon,
        Link: 'Teacher/StudentRecords',
        index: 37
      },
      // {
      //   Text1: 'Termwise ',
      //   Text2: 'HeightWeight ',
      //   Color: '#81c784',
      //   iconColor: '#424242',
      //   Icon: AssignmentIcon,
      //   Link: 'Teacher/TermwiseHeightWeight',
      //   index: 11
      // },
      {
        Text1: 'Assign  ',
        Text2: 'Homework',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/AssignHomework',
        index: 6
      },

      {
        Text1: 'Attendance  ',
        Text2: '',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: EventNoteIcon,
        Link: 'Teacher/TAttendance',
        index: 6,
        ScreenPermission: 'Attendance'
      },
      {
        Text1: 'Exam ',
        Text2: 'Schedule',
        Color: '#81c784',
        iconColor: '#35abd9',
        ImageUrl: '/imges/onlineExam.png',
        Link: 'Teacher/Texamschedule',
        index: 12,
        ScreenPermission: 'ExamSchedule'
      },
      {
        Text1: 'Timetable ',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: CalendarTodayIcon,
        Link: 'Teacher/TeacherTimeTable',
        index: 7,
        ScreenPermission: 'TeacherTimeTable'
      },
      {
        Text1: 'Weekly Timetable ',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: CalendarTodayIcon,
        Link: 'Teacher/WeeklyTimetable',
        index: 7,
        ScreenPermission: 'Weekly Timetable'
      },
      {
        Text1: 'Staff   ',
        Text2: 'Birthday',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        Icon: CakeIcon,
        Link: 'Common/StaffBirthday',
        index: 20,
        ScreenPermission: 'StaffBirthday'
      },
      {
        Text1: 'Leave Details',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: EventNoteIcon,
        Link: 'Teacher/LeaveDetails',
        index: 28
      },
    ],
    items3: [
      {
        Text1: 'Message',
        Text2: 'Center',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        Icon: ForwardToInboxIcon,
        Link: 'MessageCenter/msgCenter',
        index: 17,
        ScreenPermission: 'MessageCenter'
      },
      {
        Text1: 'SMS ',
        Text2: 'Center',
        Color: '#90a4ae',
        iconColor: ' #424242',
        Link: 'Teacher/SmsCenter',
        index: 22,
        ScreenPermission: 'SMSCenter'
      },
      {
        Text1: 'Pre Primary ',
        Text2: 'Result',
        Color: '#81c784',
        iconColor: '#35abd9',
        Icon: AssignmentIcon,
        Link: 'Teacher/PrePrimaryResult',
        index: 28
      },
      {
        Text1: 'Requisition ',
        Text2: '',
        Color: '#81c784',
        iconColor: '#35abd9',
        Icon: AssignmentIcon,
        Link: 'Teacher/Requisition',
        index: 29
      },
      {
        Text1: 'Investment Declaration',
        Text2: '',
        Color: '#81c784',
        iconColor: '#35abd9',
        Icon: AssignmentIcon,
        Link: 'Teacher/InvestmentDeclaration',
        index: 30
      },

    ]
  },
  Admin: {
    items1: [
      {
        Text1: 'Annual  ',
        Text2: 'Planner',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: EventIcon,
        Link: 'Common/AnnualPlanner',
        index: 2,
        ScreenPermission: 'SchoolNotices'
      },
      {
        Text1: 'Holidays  ',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#424242',
        Icon: DateRangeIcon,
        Link: 'Admin/SchoolConfiguration/Holidays',
        index: 3,
        ScreenPermission: 'HolidaysManagement'
      },

      {
        Text1: 'Staff   ',
        Text2: 'Birthday',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        Icon: CakeIcon,
        Link: 'Common/StaffBirthday',
        index: 20,
        ScreenPermission: 'StaffBirthday'
      },
      {
        Text1: 'Photo    ',
        Text2: 'Gallery',
        Color: '#81c784',
        iconColor: '#f0483e',
        Icon: PhotoIcon,
        Link: 'Common/PhotoGallery',
        index: 4
      },

      {
        Text1: 'Video  ',
        Text2: 'Gallery',
        Color: '#ef5350',
        iconColor: '#35abd9',
        Icon: VideoLibraryIcon,
        Link: 'Common/VideoGallery/VideoAlbum',
        index: 5
      }
    ],

    items3: [
      {
        Text1: 'Message  ',
        Text2: 'Center',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        Icon: ForwardToInboxIcon,
        Link: 'MessageCenter/msgCenter',
        index: 17
      },
      {
        Text1: 'SMS ',
        Text2: 'Center',
        Color: '#90a4ae',
        iconColor: ' #424242',
        Link: 'SMSCenter/smsCenter',
        index: 22,
        ScreenPermission: 'SMS Center'
      },
      {
        Text1: 'Student wise progress report  ',
        Text2: 'Center',
        Color: '#90a4ae',
        iconColor: ' #424242',
        Link: 'Teacher/StudentwiseProgressReport',
        index: 22,
        ScreenPermission: 'StudentWiseProgressreport'
      }
      // {
      //   Text1: 'NavBar',
      //   Text2: '',
      //   Color: '#90a4ae',
      //   iconColor: ' #424242',
      //   Link: 'Common/smsCenter',
      //   index: 36
      // },
    ]
  }
};

// if (isPreprimary === "Y") {
//   DashboardData.Student.items1.splice(1, 0, {
//     Text1: 'Assign Pre Primary',
//     Text2: 'Grades',
//     Color: '#ef5350',
//     iconColor: '#f0483e ',
//     Icon: CakeIcon,
//     Link: 'Teacher/AssignPrePrimaryGrades',
//     index: 7
//   });
// }
if (isPreprimary === true) {
  DashboardData.Teacher.items1.push({
    Text1: 'Assign Pre-primary ',
    Text2: 'Grade',
    Color: '#90a4ae',
    iconColor: '#35abd9',
    Icon: EventNoteIcon,
    Link: 'Teacher/AssignPrePrimaryGrades',
    index: 5
  });
}

if (asUserRoleId === '2') {
  DashboardData.Teacher.items1.push({
    Text1: 'School ',
    Text2: 'Notices',
    Color: '#90a4ae',
    iconColor: '#35abd9',
    Icon: EventNoteIcon,
    Link: 'Teacher/SchoolNoticeBasescreen',
    index: 1,
    //ScreenPermission: 'SchoolNotices'
  });
}

export default DashboardData;