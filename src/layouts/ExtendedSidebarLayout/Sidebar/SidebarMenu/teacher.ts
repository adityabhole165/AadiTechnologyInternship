import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MenuBook from '@mui/icons-material/MenuBook';
import type { ReactNode } from 'react';

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
      }
      // {
      //   name: 'Library',
      //   icon: LibraryBooksIcon,
      //   link: '/extended-sidebar/Student/Library'
      // },
    ]
  }
];

export default teacherMenuItems;
