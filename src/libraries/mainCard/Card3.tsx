import React from 'react';
import {Paper,Grid,useTheme,Container,IconButton,Typography,Box,Card,Avatar} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CakeIcon from '@mui/icons-material/Cake';
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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { iteratorSymbol } from 'immer/dist/internal';
import { makeStyles } from '@mui/styles';

function Card3({color,text1,text2,icon,iconColor,opacityLevel,Link1,isAvtar,ImageUrl}) {
  const theme = useTheme();
  if (theme.colors.gradients.pink1 !== 'linear-gradient(135deg, white 0%, white 100%);')
    iconColor = 'white';
  return (
    <>
      <Link to={`/${location.pathname.split('/')[1]}/${Link1}`} style={{textDecoration:'none'}}>
      <Box
        sx={{
          mb: '10px',
          mt: '-8px',
          textAlign:"center"
        }}
      >
        <IconButton>
          <Box
            sx={{
              width: 70,
              height: 70,
              background: `${theme.colors.gradients.pink1}`,
              
              borderRadius: '10px',
              mb: '5px',
              textAlign: 'center',
              textDecoration:"none",
              boxShadow:
                ' 1px 4px 5px 2px rgba(0,0,0,0.3)'
            }}
          >
            {icon === 1 && <AssignmentIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 2 && <EventIcon  sx={{color: iconColor ,mt:"7px"}} fontSize="medium" />}
            {icon === 3 && <DateRangeIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 4 && <PhotoIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 5 && <VideoLibraryIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 6 && <EventNoteIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 7 && <AccessTimeIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 8 && <MonetizationOnIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 9 && <MenuBookIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 10 && <LockOpenIcon sx={{color: iconColor,mt:"7px"}}  fontSize="medium" />}
            {icon === 11 && <PeopleIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}

            {icon === 12 && <img src={ImageUrl} alt="" style={{  width:"20px", height:"22px" ,marginTop:"8px",filter: "invert(54%) sepia(88%) saturate(362%) hue-rotate(151deg) brightness(94%) contrast(92%)" }} />}
            {icon === 13 && <img src={ImageUrl} alt="" style={{  width:"20px", height:"22px" ,marginTop:"8px"}}/>}
            {icon === 14 && <img src={ImageUrl} alt="" style={{  width:"20px", height:"22px" ,marginTop:"8px",filter: "invert(40%) sepia(87%) saturate(1676%) hue-rotate(333deg) brightness(92%) contrast(105%)" }} />}
            {icon === 15 && <img src={ImageUrl} alt="" style={{  width:"20px", height:"22px" ,marginTop:"8px",filter:"invert(54%) sepia(88%) saturate(362%) hue-rotate(151deg) contrast(94%)  brightness(92%) "}}/>}
            {icon === 16 && <img src={ImageUrl} alt="" style={{  width:"20px", height:"22px",marginTop:"8px"}}/>}

            {icon === 17 && <ForwardToInboxIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 18 && <SmsIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 19 && <PeopleIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 20 && <CakeIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 21 && <ForwardToInboxIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
            {icon === 22 && <SmsIcon sx={{color: iconColor,mt:"7px"}} fontSize="medium" />}
           
            <Typography
              sx={{
                mt: '-3px',
                textAlign: 'center',
                fontSize: '12px',
                textDecoration:"none",
                color:'black',
                lineHeight: '1rem',
              
              }}
            >
              {text1}
            </Typography>
            <Typography
              sx={{
                mt: '-5px',
                textAlign: 'center',
                fontSize: '12px',
                lineHeight: '1.3rem',
                textDecoration:"none",
                color:'black',
            
              }}
            >
              {text2}
            </Typography>
          </Box>
          </IconButton>
      </Box>
      </Link>
 
    </>
  );
}

export default Card3;
