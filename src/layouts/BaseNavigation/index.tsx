import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Grid, Fab, Typography, IconButton, Paper, useTheme, Avatar, Container } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { makeStyles } from '@mui/styles';
import { Styles } from 'src/assets/style/student-style'
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SmsIcon from '@mui/icons-material/Sms';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Link, NavLink, BrowserRouter } from "react-router-dom";
import { ClassNames } from '@emotion/react';




const useStyles = makeStyles(theme => ({



  root: {


    "&:visited": {

      color: "black",
      textDecoration:"none"

    },

    "&:active": {


      color: "black"

    }
  }


}));


function Basenav() {
  const theme = useTheme();
  const RoleId=sessionStorage.getItem("RoleId");
  const classes = useStyles();







  return (
    <Paper square sx={{ py: 0.5, borderTop: "1px solid gray",zIndex:"9999"}}>
        <Grid container textAlign="center" sx={{ mx: "-5px" }} >
          <Grid item xs={2.4} lg={2.5} xl={2}  >
            { 
             (RoleId == "3" )?
             <IconButton>
               <NavLink to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
                 <ForwardToInboxIcon />
               </NavLink>
             </IconButton> : (RoleId == "2" )?
             <IconButton>
               <NavLink  to={`/${location.pathname.split('/')[1]}/Teacher/TAttendance`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
               <EventNoteIcon/>
               </NavLink>
             </IconButton> :(RoleId == "6" )?
             <IconButton>
               <NavLink to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
                 <ForwardToInboxIcon />
               </NavLink>
             </IconButton> :null
            }
          </Grid>

          <Grid item xs={2.4} lg={2.5} xl={2}>
            { 
              (RoleId == "3")?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/Student/Homework`} className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
                  <MenuBookIcon />
                </NavLink>
              </IconButton>:   (RoleId == "2")?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/Teacher/TeacherTimeTable`} className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
                < AccessTimeIcon/>
                </NavLink>
              </IconButton>:   (RoleId == "6")?
              <IconButton>
                <NavLink  to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`} className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
                <AssignmentIcon />
                </NavLink>
              </IconButton>: null
           }
          </Grid>

          <Grid item xs={2.4} lg={2.5} xl={2} sx={{ py: 0.5 }}>

            <Fab aria-label="add" size="small" sx={{ textAlign: "center", boxShadow: "1px 1px 20px black" }}>
              <NavLink to="/extended-sidebar/landing/landing" className={classes.root} activeStyle={{ color: '#9e9e9e' }} >
                <HomeIcon sx={{ color: "${theme.colors.gradients.pink1}" }} />
              </NavLink>
            </Fab>
          </Grid>

          <Grid item xs={2.4} lg={2.5} xl={2}>
            { 
              (RoleId == "3")?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`} className={classes.root}
                  activeStyle={
                    { color: '#9e9e9e' }
                  }>
                  <EventIcon />
                </NavLink>
              </IconButton>:  (RoleId == "2")?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`} className={classes.root} activeStyle={{ color: '#9e9e9e' }}>
                 <ForwardToInboxIcon />
               </NavLink>
              </IconButton>:  (RoleId == "6")?
              <IconButton>
                <NavLink to={`/${location.pathname.split('/')[1]}/Student/AstaffBirthday`} className={classes.root}
                  activeStyle={
                    { color: '#9e9e9e' }
                  }>
                  <DateRangeIcon />
                </NavLink>
              </IconButton>: null
            }
          </Grid>

          <Grid item xs={2.4} lg={1.7} xl={2}>
          { 
             (RoleId == "3")?
            <IconButton>
              <NavLink to={`/${location.pathname.split('/')[1]}/Student/attendance`} className={classes.root}
                activeStyle={
                  { color: '#9e9e9e' }
                }  >
                <EventNoteIcon sx={{ color: "${theme.colors.gradients.pink1}" }} />
              </NavLink>
            </IconButton>:(RoleId == "2")?
            <IconButton>
              <NavLink to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`} className={classes.root}
                activeStyle={
                  { color: '#9e9e9e' }
                }>
                <EventIcon />
              </NavLink>
            </IconButton>:(RoleId == "6")?
            <IconButton>
              <NavLink to={`/${location.pathname.split('/')[1]}/SMSCenter/smsCenter`} className={classes.root}
                activeStyle={
                  { color: '#9e9e9e' }
                }  >
               < SmsIcon/>
              </NavLink>
            </IconButton>:null
          }
          </Grid>
        </Grid>
    </Paper>
  )
}

export default Basenav;


