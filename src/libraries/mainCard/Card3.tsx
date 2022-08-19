
import React from 'react';
import {
  Paper,
  Grid,
  useTheme,
  Container,
  IconButton,
  Typography,
  Box,
  Avatar
} from '@mui/material';

import EventIcon from '@mui/icons-material/Event';
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


function Card3({
  color,
  text1,
  text2,
  icon,
  iconColor,
  opacityLevel,
  Link1,
  isAvtar
}) {
 

  const theme = useTheme();
if(theme.colors.gradients.pink1!=="linear-gradient(135deg, white 0%, white 100%);")
iconColor = "white"
  return (
    <>
      <Box
        sx={{
          mb: '7px',
          mt: '-3px'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Link to={`/${location.pathname.split('/')[1]}/${Link1}`}>
            <IconButton
              sx={{
                borderRadius: '10px',
                mt: '-3px'
              }}
            >
              <Avatar
                variant="square"
              
                sx={{
                  width: '50px',
                  background:`${theme.colors.gradients.pink1}`,
                  color: iconColor,
                  borderRadius: '10px',
               mb:"5px",
                 
                    boxShadow:' 5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                {icon === 1 && <AssignmentIcon />}
                {icon === 2 && <EventIcon />}
                {icon === 3 && <DateRangeIcon />}
                {icon === 4 && <PhotoIcon />}
                {icon === 5 && <VideoLibraryIcon />}
                {icon === 6 && <EventNoteIcon />}
                {icon === 7 && <AccessTimeIcon />}
                {icon === 8 && <MonetizationOnIcon />}
                {icon === 9 && <MenuBookIcon />}
                {icon === 10 && <LockOpenIcon />}
                {icon === 11 && <PeopleIcon />}
                {icon === 12 && <CalendarTodayIcon />}
                {icon === 13 && <AssessmentIcon />}
                {icon === 14 && <AssessmentIcon />}
                {icon === 15 && <AssessmentIcon />}
                {icon === 16 && <AssessmentIcon />}

                {icon === 17 && <ForwardToInboxIcon />}
                {icon === 18 && <SmsIcon />}
                {icon === 19 && <PeopleIcon />}
              </Avatar>
            </IconButton>
          </Link>
        </Box>

        <Typography
          sx={{
            mt: '-5px',
            textAlign: 'center',
            fontSize: '12px',
            lineHeight: '1rem',
            // textShadow:
            //   ' 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)'
          }}
        >
          {text1}
        </Typography>
        <Typography
          sx={{
            mt: '-5px',
            textAlign: 'center',
            fontSize: '12px',
            lineHeight: '1.3rem'
          }}
        >
          {text2}
        </Typography>
      </Box>
    </>
  );
}

export default Card3;
