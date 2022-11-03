
import React from 'react';
import {useTheme,Container,IconButton,Typography,Box} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CakeIcon from '@mui/icons-material/Cake';
import SmsIcon from '@mui/icons-material/Sms';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventNoteIcon from '@mui/icons-material/EventNote';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { IconCard, IconCardSize, Text1, Text2 } from '../styled/DashboardStyled';


function Card3({color,text1,text2,icon,iconColor,opacityLevel,Link1,isAvtar,ImageUrl}) {
  const theme = useTheme();
  if (theme.colors.gradients.pink1 !== 'linear-gradient(135deg, white 0%, white 100%);')
    iconColor = 'white';
  return (
    <>
      <Link to={`/${location.pathname.split('/')[1]}/${Link1}`} style={{textDecoration:'none'}}>
      <IconCard>
        <IconButton>
          <IconCardSize>
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
           
            <Text1>
              {text1}
            </Text1>
            <Text2>
              {text2}
            </Text2>
          </IconCardSize>
          </IconButton>
      </IconCard>
      </Link>
 
    </>
  );
}

export default Card3;