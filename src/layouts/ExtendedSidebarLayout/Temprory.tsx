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
import { Grid, IconButton, Stack, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
    switch (title) {
      case ' Dashboard':
        navigate('/extended-sidebar/landing/landing');
        break;
      case 'MonthwiseAttendance':
        navigate('/extended-sidebar/Teacher/MonthwiseAttendance');
        break;
      case 'Assign Homework':
        navigate('/extended-sidebar/Teacher/AssignHomework');
        break;
      case 'Attendance':
        navigate('/extended-sidebar/Teacher/TAttendance');
        break;
      case 'Assign Exam Marks':
        navigate('/extended-sidebar/Teacher/AssignExamMark');
        break;
      case 'Change Password':
        navigate('/extended-sidebar/common/changePassword');
        break;
      case 'Exam Result':
        navigate('/extended-sidebar/Teacher/ExamResultBase');
        break;
      case 'Exam Schedule':
        navigate('/extended-sidebar/Teacher/Texamschedule');
        break;
      case 'Final Result':
        navigate('/extended-sidebar/Teacher/FinalResult');
        break;
      default:
        break;
    }
  };

  const ActionStyle = {
    backgroundColor: 'rgb(40, 160, 235)',
    pt: 1,
    color: '#fff',
    ':hover': {
      backgroundColor: '#fff',
      color: 'rgb(40, 160, 235)'
    }
  };
  const activebuttonStyle = {
    backgrounColor: 'rgb(40, 160, 235)',
    color: 'white'
  };
  const buttonStyle = {};

  const sideList = [
    { title: ' Dashboard', icon: <Dashboard /> },
    { title: 'MonthwiseAttendance', icon: <CalendarToday /> },

    { title: 'Assign Homework', icon: <Assignment /> },
    { title: 'Attendance', icon: <DateRange /> },
    { title: 'Assign Exam Marks', icon: <FeaturedPlayList /> },
    { title: 'Change Password', icon: <Password /> },
    { title: 'Exam Result', icon: <TableChart /> },
    { title: 'Exam Shedule', icon: <Dataset /> },
    { title: 'Final Result', icon: <FactCheck /> }
  ];
  const activeStyle = {
    backgroundColor: 'rgb(40, 160, 235)',
    ':hover': {
      backgroundColor: 'rgb(40, 160, 235)'
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
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={text.title === activeItem ? activeStyle : buttonStyle}
              onClick={() => IconClick(text.title)}
            >
              <ListItemIcon sx={{ minWidth: '35px' }}>{text.icon}</ListItemIcon>
              <ListItemText primary={text.title} />
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
          <Grid item xs={4} sx={ActionStyle} textAlign="center">
            <User onClick={ClickUser}></User>
          </Grid>
          <Grid item xs={4} sx={ActionStyle} textAlign="center">
            <SettingsTwoTone />
          </Grid>
          <Grid item xs={4} sx={ActionStyle} textAlign="center">
            <PowerOutLined onClick={handleLogout} />
          </Grid>
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
