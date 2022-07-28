import React from 'react';
import {
  Paper,
  Grid,
  useTheme,
  Container,
  IconButton,
  Typography,
  Box,
  Card,
  Avatar,
  CardContent,
  ListItemAvatar
} from '@mui/material';


import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import AddCommentIcon from '@mui/icons-material/AddComment';

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
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { Link } from 'react-router-dom';
import { iteratorSymbol } from 'immer/dist/internal';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      color: 'red',
      width: '80px',
      // transition: "transform 2s",
      transform: 'rotate(5deg)'
    }
  }
}));

let fav = 'avatar';

function Card3({
  color,
  text,
  icon,
  iconColor,
  opacityLevel,
  Link1,
  isAvtar
}) {
  const classes = useStyles();
  //   const aLink = `/${location.pathname.split('/')[1]}/` + Link;
  const opacity =
    'rgba(255, 255, 255, ' + (opacityLevel === '1' ? '0.3' : '0') + ')';
const theme = useTheme();
  // console.log(icon)
  return (
    <>
      <Card
        sx={{
          background: color,
          mx: '5px',
          mb: '5px',
          height:"100px"
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Link to={`/${location.pathname.split('/')[1]}/${Link1}`}>
            <IconButton>
              <Avatar
                variant="square"
                sx={{
                  boxShadow: '6px 6px 6px grey !important',

                  backgroundColor: iconColor,
                  borderRadius: '10px'
                }}
              >
                {icon === 1 && <AssignmentIcon />}
                {icon === 2 && <EventIcon />}
                {icon === 3 && <DateRangeIcon  />}
                {icon === 4 && <PhotoIcon  />}
                {icon === 5 && <VideoLibraryIcon />}
                {icon === 6 && <EventNoteIcon />}
                {icon === 7 && <AccessTimeIcon />}
                {icon === 8 && <MonetizationOnIcon />}
                {icon === 9 && <MenuBookIcon  />}
                {icon === 10 && <LockOpenIcon  />}
                {icon === 11 && <PeopleIcon  />}
                {icon === 12 && <CalendarTodayIcon  />}
                {icon === 13 && <AssessmentIcon  />}
                {icon === 14 && <ForwardToInboxIcon  />}
                {icon === 15 && <SmsIcon  />}
                {icon === 16 && <PeopleIcon  />}
              </Avatar>
            </IconButton>
          </Link>
        </Box>

        <Typography
          sx={{
         
            textAlign: 'center',
            textShadow: '1px 1px 20px '
          }}
        >
          {text}
        </Typography>
      </Card>
    </>
  );
}
export default Card3;