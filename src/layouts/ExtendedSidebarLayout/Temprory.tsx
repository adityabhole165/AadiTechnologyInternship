import { useTheme } from '@emotion/react';
import AccessTime from '@mui/icons-material/AccessTime';
import Assignment from '@mui/icons-material/Assignment';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Dataset from '@mui/icons-material/CalendarViewMonth';
import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import Dashboard from '@mui/icons-material/Dashboard';
import DateRange from '@mui/icons-material/DateRange';
import FactCheck from '@mui/icons-material/FactCheck';
import FeaturedPlayList from '@mui/icons-material/FeaturedPlayList';
import User from '@mui/icons-material/ManageAccounts';
import Password from '@mui/icons-material/Password';
import PowerOutLined from '@mui/icons-material/PowerSettingsNew';
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone';
import TableChart from '@mui/icons-material/TableChart';
import { Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { logoURL } from 'src/components/Common/Util';
import { useDispatch, useSelector } from 'react-redux';

import MissingAttendanceDialog from 'src/components/Dashboard/MissingAttendanceDialog';

import {
  IMissingattendancealeartNameBody
} from 'src/interfaces/MissAttendaceAleart/IMissingAttendaceAleart';

import {
  MissingAttenNameAleart
} from 'src/requests/MissingAttendanceAleart/ReqMissAttendAleart';
import { RootState } from 'src/store';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer({ opend, toggleDrawer }) {
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const asUserId = Number(sessionStorage.getItem('Id'));

  const [opent, setopent] = useState(opend ? opend : 'false');
  const [missingAttendanceDialog, setMissingAttendanceDialog] = useState(false); // Set initial state to false
  const [imgsrc, setimgsrc] = useState(
    logoURL +
    localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') +
    '_logo.png'
  );
  const [state, setState] = useState({
    left: false
  });
  const [activeItem, setActiveItem] = useState(null);


  const MissingName = useSelector((state: RootState) => state.MissingAttendanceAleart.MissingattendName);
  const MissingDays = MissingName.map(item => item.MissingDays);
  const hasMissingDays = MissingDays.some(MissingDays => MissingDays !== 0);


  const navigate = useNavigate();

  const IconClick = (title) => {
    setActiveItem(title);
  };

  const ActionStyle = {
    backgroundColor: (theme) => theme.palette.primary.main,
    pt: 1,
    color: '#fff',
    ':hover': {
      backgroundColor: '#fff',
      color: (theme) => theme.palette.primary.main,

      cursor: 'pointer'
    }
  };
  const activebuttonStyle = {
    backgrounColor: (theme) => theme.palette.primary.main,
    cursor: 'pointer',
    color: 'white'
  };
  const buttonStyle = {};

  const sideList = [
    {
      title: ' Dashboard',
      icon: <Dashboard />,
      link: '/extended-sidebar/landing/landing'
    },
    {
      title: 'Annual Planner',
      icon: <CalendarToday />,
      link: '/extended-sidebar/Common/AnnualPlanner'
    },
    {
      title: 'Weekly Timetable',
      icon: <AccessTime />,
      link: '/extended-sidebar/Teacher/WeeklyTimetable'
    },
    {
      title: 'Assign Homework',
      icon: <Assignment />,
      link: '/extended-sidebar/Teacher/AssignHomework'
    },
    {
      title: 'Attendance',
      icon: <DateRange />,
      link: '/extended-sidebar/Teacher/TAttendance'
    },
    {
      title: 'Assign Exam Marks',
      icon: <FeaturedPlayList />,
      link: '/extended-sidebar/Teacher/AssignExamMark'
    },
    {
      title: 'Change Password',
      icon: <Password />,
      link: '/extended-sidebar/common/changePassword'
    },
    {
      title: 'Exam Result',
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/ExamResultBase'
    },
    {
      title: 'Exam Shedule',
      icon: <Dataset />,
      link: '/extended-sidebar/Teacher/Texamschedule'
    },
    {
      title: 'Final Result',
      icon: <FactCheck />,
      link: '/extended-sidebar/Teacher/FinalResult'
    },
    {
      title: 'Progress Remarks',
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/ProgressRemarks'
    },
    {
      title: 'Progress Report',
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/ProgressReportNew'
    },
    {
      title: 'Requisition',
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/Requisition'
    },

    {
      title: 'Lesson Plan',
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/LessonPlanBaseScreen'
    },
    {
      title: 'Aadhar Card Details',
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/AadharCard'
    },
    {
      title: 'Holidays',
      icon: <DateRangeIcon />,
      link: '/extended-sidebar/Admin/SchoolConfiguration/Holidays'
    },
    {
      title: 'SMS Center',
      icon: <FactCheck />,
      link: '/extended-sidebar/Teacher/SmsCenter'

    },
    {
      title: 'Message Center',
      icon: <FactCheck />,
      link: '/extended-sidebar/MessageCenter/msgCenter'

    },

    // {
    //   title: 'Missing Attendance',
    //   icon: <FactCheck />,
    //   link: null // No link for this item
    // }

  ];

    if (hasMissingDays) {
    sideList.push({
      title: 'Missing Attendance',
      icon: <FactCheck />,
      link: null // No link for this item
    });
  }
  const activeStyle = {
    backgroundColor: (theme) => theme.palette.primary.main,
    ':hover': {
      backgroundColor: (theme) => theme.palette.primary.main
    }
  };

  const ClickUser = (value) => {
    navigate('/extended-sidebar/Student/Profile');
  };
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      //localStorage.clear();
      localStorage.removeItem('auth');
      sessionStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  // const handleListItemClick = (text) => {
  //   if (text.title === 'Missing Attendance') {
  //     setMissingAttendanceDialog(true);
  //   } else {
  //     navigate(text.link);
  //   }
  //   IconClick(text.title);
  // };

  const MissingNameBody: IMissingattendancealeartNameBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(asUserId),
    asStandardDivisionId: null,
    asDate: null
  };

  const handleListItemClick = (text) => {
    if (text.title === 'Missing Attendance') {
      if (hasMissingDays) {
        setMissingAttendanceDialog(true);
      } else {
        setMissingAttendanceDialog(false);
      }
    } else {
      navigate(text.link);
    }
    IconClick(text.title);
  };
  
  useEffect(() => {
    dispatch(MissingAttenNameAleart(MissingNameBody));
  }, []);
  
  useEffect(() => {
    if (hasMissingDays && !sessionStorage.getItem('hasShownMissingAttendancePopup')) {
      setMissingAttendanceDialog(true);
      sessionStorage.setItem('hasShownMissingAttendancePopup', 'true');
    } else {
      setMissingAttendanceDialog(false);
    }
  }, [hasMissingDays]);
  

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => {
        toggleDrawer(anchor, false);
      }}
      onKeyDown={() => {
        toggleDrawer(anchor, false);
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <img src={imgsrc} className={classes.smalllogo} />
      </Stack>
      <Divider />
      <Box
        sx={{
          height: 'calc(100vh - 150px)', // Adjust height based on the fixed content height
          overflow: 'auto'
        }}
      >
        <List>
          {sideList.map((text, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 0.5
              }}
            >
              <ListItemButton
                sx={text.title === activeItem ? activeStyle : buttonStyle}
                onClick={() => handleListItemClick(text)}
              >
                <ListItemIcon
                  sx={{
                    color: text.title === activeItem ? 'white' : 'black',
                    minWidth: '35px'
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <Typography
                  sx={{ color: text.title === activeItem ? 'white' : 'black' }}
                >
                  {text.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0
        }}
      >
        <Tooltip title="Back">
          <IconButton
            onClick={() => {
              toggleDrawer('left', false);
            }}
            sx={{
              color: 'white',
              backgroundColor: grey[500],
              mx: 1,
              my: 0.5,
              ':hover': { backgroundColor: grey[600] }
            }}
          >
            <CloseTwoTone />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          display: 'flow',
          width: '100%'
        }}
      >
        <Divider className="m-5" />
        <Grid className="p-8" container>
          <Tooltip title={'Profile'}>
            <Grid item xs={4} sx={ActionStyle} textAlign="center">
              <User onClick={ClickUser}></User>
            </Grid>
          </Tooltip>
          <Tooltip title={'Settings'}>
            <Grid item xs={4} sx={ActionStyle} textAlign="center">
              <SettingsTwoTone />
            </Grid>
          </Tooltip>
          <Tooltip title={'Logout'}>
            <Grid item xs={4} sx={ActionStyle} textAlign="center">
              <PowerOutLined onClick={handleLogout} />
            </Grid>
          </Tooltip>
        </Grid>
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment>{list('left')}</React.Fragment>
      {missingAttendanceDialog && (
        <MissingAttendanceDialog
          open={missingAttendanceDialog}
          setOpen={setMissingAttendanceDialog}
        />
      )}
    </div>
  );
}
