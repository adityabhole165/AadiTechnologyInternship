import type { ReactNode } from 'react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import DateRange from '@mui/icons-material/DateRange';
import Person from '@mui/icons-material/Person';
import Event from '@mui/icons-material/Event';
import Sms from '@mui/icons-material/Sms';
import People from '@mui/icons-material/People';
import Assignment from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBook  from  '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Inbox from '@mui/icons-material/Inbox';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LaptopIcon from '@mui/icons-material/Laptop'; 
import CakeIcon from '@mui/icons-material/Cake';
 

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      // {
      //   name: 'Dashboard',
      //   icon: DashboardIcon,
      //   link: '/extended-sidebar/Student/Dashboard'
      // },
      {
        name: 'Holidays',
        icon: DateRange,
        link: '/extended-sidebar/Student/holidays'
      },
     
      {
        name: 'PTA',
        icon: Person,
        link: '/extended-sidebar/Student/pta'
      },
      {
        name: 'Timetable',
        icon: AccessTimeIcon,
        link: '/extended-sidebar/Student/Timetable'
      },
      {
        name: 'Subject Teacher',
        icon: People,
        link: '/extended-sidebar/Student/SubjectTeacher'
      }, 
      {
        name: 'SMS Center',
        icon: Sms,
        link: '/extended-sidebar/Student/smscenter'
      },
      {
        name: 'School Notice',
        icon: Assignment,
        link: '/extended-sidebar/Student/schoolnotice'
      },
      {
        name: 'Fees',
        icon: MonetizationOnIcon,
        link: '/extended-sidebar/Student/Fees'
      },
      
      {
        name: 'Annual Planner',
        icon: Event,
        link: '/extended-sidebar/Student/eventoverview'
      },
      {
        name: 'Homework',
        icon: MenuBook,
        link: '/extended-sidebar/Student/Homework'
      },
      {
        name: 'Exam Schedule',
        icon: CalendarTodayIcon,
        link: '/extended-sidebar/Student/examschedule'
      },
      {
        name: 'Message center',
        icon: ForwardToInboxIcon,
        link: '/extended-sidebar/MessageCenter/msgCenter'
      },
      {
        name: 'Attendance',
        icon: EventNoteIcon,
        link: '/extended-sidebar/Student/attendance'
      },
      {
        name: 'Library',
        icon: LibraryBooksIcon,
        link: '/extended-sidebar/Student/Library'
      },
      {
        name: 'Progress Report',
        icon: AssessmentIcon,
        link: '/extended-sidebar/Student/progressreport'
      },
      {
        name: 'Online Exam Progress Report',
        icon: TapAndPlayIcon,
        link: '/extended-sidebar/Student/OnlineExamProgressReport'
      },
      {
        name: 'Photo Gallery',
        icon: PhotoLibraryIcon,
        link: '/extended-sidebar/Student/Gallery'
      },
      {
        name: 'Video Gallery',
        icon: VideoLibraryIcon,
        link: '/extended-sidebar/Student/VideoGallery'
      },
      {
        name: 'TAttendance',
        icon: VideoLibraryIcon,
        link: '/extended-sidebar/Student/Tattendance'
      },
      {
        name: 'Teacher Timetable',
        icon: AccessTimeIcon,
        link: '/extended-sidebar/Student/TeacherTimetable'
      },
      {
      
        name: 'TExam Schedule',
        icon: VideoLibraryIcon,
        link: '/extended-sidebar/Student/Texamschedule'
      },
      {
        name: 'Staff Birthdays',
        icon: CakeIcon ,
        link: '/extended-sidebar/Student/AstaffBirthday'
      },
      {
        name: 'Admin SMS Center',
        icon: ForwardToInboxIcon,
        link: '/extended-sidebar/SMSCenter/smsCenter'
      },
  
    ]
  },
];

export default menuItems;
