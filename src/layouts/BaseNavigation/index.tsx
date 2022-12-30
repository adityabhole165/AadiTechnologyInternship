import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Grid, Fab, Typography, IconButton, Paper, useTheme, Avatar, Container,Card, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { makeStyles } from '@mui/styles';
import { Styles } from 'src/assets/style/student-style'
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SmsIcon from '@mui/icons-material/Sms';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Link, NavLink, BrowserRouter } from "react-router-dom";
import { ClassNames } from '@emotion/react';

import school2 from 'src/assets/img/Shool_Logo/school2.png';



const useStyles = makeStyles(theme => ({



  root: {


    "&:visited": {

      color: "black",
      textDecoration: "none"

    },

    "&:active": {

      textDecoration: "none",
      color: "black"

    },
    "&:link": {
      color: "black",

    }
  },
  FontFooter:{
    fontSize: "9px !important", 

    '@media (min-width: 270px) and ( max-width:380px)': {
      marginLeft:"10px!important",
      fontSize: "7px !important", 
  }}
}));


function Basenav() {
  const theme = useTheme();
  const RoleId = sessionStorage.getItem("RoleId");
  const classes = useStyles();
  
  return (
    <>
    <Paper square>
    <Box sx={{ pb: "3px", pt: "3px",  zIndex: "9999" ,backgroundColor:"#90caf9",borderTopLeftRadius:"5px",borderTopRightRadius:"5px"}}>
      <Grid container textAlign="center" >
        <Grid item xs={2.4}  >
          {
            (RoleId == "3") ?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
                  <ForwardToInboxIcon />
                </NavLink>
              </IconButton> : (RoleId == "2") ?
                <IconButton>
                  <NavLink to={`/${location.pathname.split('/')[1]}/Teacher/TAttendance`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
                    <EventNoteIcon />
                  </NavLink>
                </IconButton> : (RoleId == "6") ?
                  <IconButton>
                    <NavLink to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
                      <ForwardToInboxIcon />
                    </NavLink>
                  </IconButton> : null
          }
        </Grid>

        <Grid item xs={2.4}>
          {
            (RoleId == "3") ?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/Student/Homework`} className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
                  <MenuBookIcon />
                </NavLink>
              </IconButton> : (RoleId == "2") ?
                <IconButton>
                  <NavLink to={`/${location.pathname.split('/')[1]}/Teacher/TeacherTimeTable`} className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
                    < AccessTimeIcon />
                  </NavLink>
                </IconButton> : (RoleId == "6") ?
                  <IconButton>
                    <NavLink to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`} className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
                      <AssignmentIcon />
                    </NavLink>
                  </IconButton> : null
          }
        </Grid>

        <Grid item xs={2.4}>

          <Fab aria-label="add" size="small" sx={{ textAlign: "center", boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}>
            <NavLink to="/extended-sidebar/landing/landing" className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
              <HomeIcon sx={{ mt: "5px", color: "${theme.colors.gradients.pink1}" }} />
            </NavLink>
          </Fab>
        </Grid>

        <Grid item xs={2.4} >
          {
            (RoleId == "3") ?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`} className={classes.root}
                  activeStyle={
                    { color: '#9e9e9e' }
                  }>
                  <EventIcon />
                </NavLink>
              </IconButton> : (RoleId == "2") ?
                <IconButton>
                  <NavLink to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
                    <ForwardToInboxIcon />
                  </NavLink>
                </IconButton> : (RoleId == "6") ?
                  <IconButton>
                    <NavLink to={`/${location.pathname.split('/')[1]}/Common/EventOverview`} className={classes.root}
                      activeStyle={
                        { color: '#9e9e9e' }
                      }>
                      <EventIcon />
                    </NavLink>
                  </IconButton> : null
          }
        </Grid>

        <Grid item xs={2.4} >
          {
            (RoleId == "3") ?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/Student/attendance`} className={classes.root}
                  activeStyle={
                    { color: '#9e9e9e' }
                  }  >
                  <EventNoteIcon sx={{ color: "${theme.colors.gradients.pink1}" }} />
                </NavLink>
              </IconButton> : (RoleId == "2") ?
                <IconButton>
                  <NavLink to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`} className={classes.root}
                    activeStyle={
                      { color: '#9e9e9e' }
                    }>
                    <EventIcon />
                  </NavLink>
                </IconButton> : (RoleId == "6") ?
                  <IconButton>
                    <NavLink to={`/${location.pathname.split('/')[1]}/SMSCenter/smsCenter`} className={classes.root}
                      activeStyle={
                        { color: '#9e9e9e' }
                      }  >
                      < SmsIcon />
                    </NavLink>
                  </IconButton> : null
          }
        </Grid>
        </Grid>
        </Box>
     
        <Grid container >
        <Grid item xs={4} display="flex"  justifyContent="flex-start" alignItems="center">
          <a href='https://www.regulusit.net' target="_blank" rel="noreferrer">
            <img src={school2} height={25}/>
          </a>
        </Grid>
        <Grid item xs={8} display="flex" justifyContent="flex-start" alignItems="center">
          <Typography className={classes.FontFooter} sx={{mb:0.5}}><strong>Copyright © {new Date().getFullYear()} RegulusIT.net. All rights reserved.</strong></Typography>
        </Grid>
        </Grid>
        </Paper>
      
    
    </>
  )
}

export default Basenav;


