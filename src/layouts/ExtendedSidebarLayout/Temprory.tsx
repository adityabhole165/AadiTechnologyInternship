import { useTheme } from '@emotion/react';
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
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { logoURL } from 'src/components/Common/Util';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer({ opend, toggleDrawer }) {
  const theme = useTheme();
  const classes = Styles();
  const [opent, setopent] = useState(opend ? opend : 'false');
  const [imgsrc, setimgsrc] = useState(
    logoURL +
      localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') +
      '_logo.png'
  );
  const [state, setState] = useState({
    left: false
  });
  const [activeItem, setActiveItem] = useState(null);
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
      title: 'MonthwiseAttendance',
      icon: <CalendarToday />,
      link: '/extended-sidebar/Teacher/MonthwiseAttendance'
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
    }
  ];
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
        // divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <img src={imgsrc} className={classes.smalllogo} />
      </Stack>
      {/* <img src={imgsrc} alt='photo' /> */}
      <Divider />
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
              onClick={() => {
                navigate(text.link);
                IconClick(text.title);
              }}
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
              backgroundColor: 'gray',
              mx: 1,
              my: 0.5,
              ':hover': { backgroundColor: 'gray' }
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
    </div>
  );
}
