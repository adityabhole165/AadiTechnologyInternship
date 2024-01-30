import React, { useState } from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTheme } from '@emotion/react';
import SubHeaderNavBar from './Header/SubHeaderNavBar';
import Header from './Header';
import MenuTwoTone from '@mui/icons-material/MenuTwoTone';
import User from '@mui/icons-material/ManageAccounts';
import { logoURL } from 'src/components/Common/Util';
import { Grid, IconButton, Stack, Toolbar, Tooltip, useMediaQuery } from '@mui/material';
import { POSITION } from 'react-toastify/dist/utils';
import { Styles } from 'src/assets/style/student-style';
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone';
import PowerOutLined from '@mui/icons-material/PowerSettingsNew';
import Assignment from '@mui/icons-material/Assignment';
import DateRange from '@mui/icons-material/DateRange';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Dashboard from '@mui/icons-material/Dashboard';
import FeaturedPlayList from '@mui/icons-material/FeaturedPlayList';
import Password from '@mui/icons-material/Password';
import TableChart from '@mui/icons-material/TableChart';
import Dataset from '@mui/icons-material/CalendarViewMonth';
import FactCheck from '@mui/icons-material/FactCheck';
import CropSquareTwoTone from '@mui/icons-material/CloseSharp';
import { useNavigate } from 'react-router';
import Reply from '@mui/icons-material/Reply';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer({ opend, event }) {
  const theme = useTheme();
  const classes = Styles();
  const [opent, setopent] = useState(opend ? opend : 'false');
  const [imgsrc, setimgsrc] = useState(logoURL + localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') + "_logo.png");
  const [state, setState] = useState({
    left: false,
  });
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const IconClick = (title) => {
    setActiveItem(title);
    switch (title)  {
      case ' Dashboard':
        navigate('/extended-sidebar/landing/landing');
        break;
      case 'MonthwiseAttendance':
        navigate('/extended-sidebar/Teacher/MonthwiseAttendance');
        break;
      case 'SchoolAttendanceOverview':
        navigate('/extended-sidebar/Teacher/SchoolAttendanceOverview');
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
        navigate('/extended-sidebar/Teacher/Texamschedule');;
        break;
      case 'Final Result':
        navigate('/extended-sidebar/Teacher/FinalResult');
        break;
      default:
        break;
    }
  };

const ActionStyle = {
  backgroundColor :'rgb(40, 160, 235)',
  pt:1,
  color:'#fff',
  ":hover":{
    backgroundColor :'#fff',
    color:'rgb(40, 160, 235)'

   }
}
const activebuttonStyle ={
 backgrounColor:'rgb(40, 160, 235)', 
 color:'white'
}
const buttonStyle ={

}


const sideList =[
  {title:' Dashboard', icon:<Dashboard/>},
  {title: 'MonthwiseAttendance', icon: <CalendarToday /> },
  
  {title:'SchoolAttendanceOverview', icon:<Assignment/>},
  {title:'Attendance', icon:<DateRange/>},
  {title:'Assign Exam Marks', icon:<FeaturedPlayList/>},
  {title:'Change Password', icon:<Password/>},
  {title:'Exam Result', icon:<TableChart/>},
  {title:'Exam Shedule', icon:<Dataset/>},
  {title:'Final Result', icon:<FactCheck/>},
]
const activeStyle = {
  backgroundColor: 'rgb(40, 160, 235)', 
  color: 'white',
  ":hover": {
    backgroundColor: 'rgb(40, 160, 235)',
    color: 'white',
  }
};


const ClickUser = (value) => {
  navigate('/extended-sidebar/Student/Profile');
}
const [isOpen, setOpen] = useState<boolean>(false);
const handleClose = (): void => {
  setOpen(false);
};

const handleLogout = async (): Promise<void> => {
  try {
    handleClose();
    //localStorage.clear();
    localStorage.removeItem("auth")
    sessionStorage.clear(); 
    navigate('/');
  } catch (err) {
    console.error(err);
  }
};





const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
      <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Stack
        direction="row"
        // divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
        
      >
        <img onClick={event} src={imgsrc} className={classes.smalllogo}/>
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
            <ListItemIcon sx={{ minWidth: '35px' }}>
              {text.icon}
            </ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
     
   
      <Box
      
      sx={{
        position:'absolute',
        top:0,
      }
      }>
        <Tooltip title='Back'>
        <IconButton  sx={{ color:'white',backgroundColor:'gray', mx:1 ,":hover":{backgroundColor:'gray'}}} >
         <Reply/> 
         </IconButton>
        </Tooltip>
        {/* <Toolbar title='Close'>
        <IconButton onClick={event} sx={{backgroundColor:'rgba(255, 25, 67, 0.1)'}} className='p-3 m-3'  size='small' color='error' >
          <CropSquareTwoTone color='error'  className='text-3xl'/>
        </IconButton>
        </Toolbar> */}
      </Box>
      <Box
      sx={{
        position:'absolute',
        bottom:0,
        display:'flow',
        width:'100%'

      }
      }>
        <Divider className='m-5'/>
        <Grid className='p-8'  container>
       
          <Grid item xs={4}sx={ActionStyle} textAlign='center'  >
        
           <User onClick={ClickUser}></User>
             
          </Grid>
          <Grid item xs={4}sx={ActionStyle} textAlign='center' >
           
          <SettingsTwoTone />
             
          </Grid>
          <Grid item xs={4} sx={ActionStyle}  textAlign='center'  >
           
          <PowerOutLined onClick={handleLogout}/> 
             
          </Grid>
    
     
      </Grid>
      </Box>
    </Box>
  );

  return (
    <div>
      
    
        <React.Fragment >
        
            {list('left')}
         


           
        </React.Fragment>
    
    
    </div>
  );
}
