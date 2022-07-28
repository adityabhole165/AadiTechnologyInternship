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

const teacherMenuItems: MenuItems[] = [
  {
    heading: '',
    items: [
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
      // {
      //   name: 'Library',
      //   icon: LibraryBooksIcon,
      //   link: '/extended-sidebar/Student/Library'
      // },
   
    ]
  },
];

export default teacherMenuItems;
