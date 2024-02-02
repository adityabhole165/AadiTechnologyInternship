import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCardIcon from '@mui/icons-material/AddCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
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

const DashboardData = {
  Student: {
    items1: [
      {
        Text1: 'School ',
        Text2: 'Notices',
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
        Text1: 'School ',
        Text2: 'Notices',
        Color: '#81c784',
        iconColor: '#35abd9',
        Icon: AssignmentIcon,
        Link: 'Common/SchoolNotice',
        index: 1
      },
      {
        Text1: 'Annual  ',
        Text2: 'Planner',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: EventIcon,
        Link: 'Common/EventOverview',
        index: 2,
        ScreenPermission: 'AnnualEventPlanner'
      },

      {
        Text1: 'Holidays  ',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#424242',
        Icon: DateRangeIcon,
        Link: 'Common/Holidays',
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
      {
        Text1: 'Monthwise Attendance',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: CakeIcon,
        Link: 'Teacher/MonthwiseAttendance',
        index: 26
      },

      {
        Text1: 'Individual Attendance',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: CakeIcon,
        Link: 'Teacher/IndidualAttendance',
        index: 26
      },

      {
        Text1: 'AnnualPlaner',
        Text2: 'BaseScreen',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: EventIcon,
        Link: 'Teacher/AnnualPlanerBaseScreen',
        index: 2
      },

      {
        Text1: 'SchoolAttendance',
        Text2: 'Overview',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: EventIcon,
        Link: 'Teacher/SchoolAttendanceOverview',
        index: 2
      },

      {
        Text1: 'ExamResult',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: EventIcon,
        Link: 'Teacher/ExamResultBase',
        index: 7
      },

      {
        Text1: 'AssignExamMark',
        Text2: '',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: EventIcon,
        Link: 'Teacher/AssignExamMark',
        index: 7
      },

      {
        Text1: 'AssignPrePrimary',
        Text2: 'Grades',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: CakeIcon,
        Link: 'Teacher/AssignPrePrimaryGrades',
        index: 8
      },

      {
        Text1: 'Progress',
        Text2: 'Remarks',
        Color: '#ef5350',
        iconColor: '#f0483e ',
        Icon: CakeIcon,
        Link: 'Teacher/ProgressRemarks',
        index: 7
      },

      {
        Text1: 'AddHomework',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#f0483e ',
        Icon: CakeIcon,
        Link: 'Teacher/AddHomework',
        index: 27
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
        Text1: 'FinalResult ',
        Text2: 'Unpublish ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/FinalResultUnpublish',
        index: 40
      },
      {
        Text1: 'AddLessonPlan ',
        Text2: ' ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/AddLessonPlan',
        index: 33
      },
      {
        Text1: 'LessonPlan ',
        Text2: 'BaseScreen ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/LessonPlanBaseScreen',
        index: 15
      },
      {
        Text1: 'ExamResult  ',
        Text2: 'Unpublish',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/ExamResultUnpublish',
        index: 15
      },

      {
        Text1: 'Event ',
        Text2: 'Manegement ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/EventManegement',
        index: 14
      },
      {
        Text1: 'AddDaily ',
        Text2: 'Log ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/AddDailyLog',
        index: 13
      },
      {
        Text1: 'Final ',
        Text2: 'Result ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/FinalResult',
        index: 36
      },
      {
        Text1: 'FinalResult ',
        Text2: 'Toppers',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/FinalResultToppers',
        index: 38
      },
      {
        Text1: 'Standard ',
        Text2: 'Toppers',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/StandardToppers',
        index: 39
      },
      {
        Text1: 'Student ',
        Text2: 'Records ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: CakeIcon,
        Link: 'Teacher/StudentRecords',
        index: 37
      },
      {
        Text1: 'Termwise ',
        Text2: 'HeightWeight ',
        Color: '#81c784',
        iconColor: '#424242',
        Icon: AssignmentIcon,
        Link: 'Teacher/TermwiseHeightWeight',
        index: 11
      },
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
        Text1: 'Staff   ',
        Text2: 'Birthday',
        Color: '#90a4ae',
        iconColor: '#35abd9',
        Icon: CakeIcon,
        Link: 'Common/StaffBirthday',
        index: 20,
        ScreenPermission: 'StaffBirthday'
      }
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
        Text1: 'PrePrimary ',
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
      }
    ]
  },
  Admin: {
    items1: [
      {
        Text1: 'School  ',
        Text2: 'Notices',
        Color: '#90a4ae',
        iconColor: '#35abd9',

        Link: 'Common/schoolnotice',
        index: 1,
        ScreenPermission: 'SchoolNotices'
      },
      {
        Text1: 'Annual  ',
        Text2: 'Planner',
        Color: '#ef5350',
        iconColor: '#f0483e',
        Icon: EventIcon,
        Link: 'Common/EventOverview',
        index: 2,
        ScreenPermission: 'SchoolNotices'
      },
      {
        Text1: 'Holidays  ',
        Text2: '',
        Color: '#90a4ae',
        iconColor: '#424242',
        Icon: DateRangeIcon,
        Link: 'Common/Holidays',
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
export default DashboardData;
