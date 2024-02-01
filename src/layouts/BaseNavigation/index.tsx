import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SmsIcon from '@mui/icons-material/Sms';
import {
  Box,
  Fab,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:visited': {
      color: 'black',
      textDecoration: 'none'
    },

    '&:active': {
      textDecoration: 'none',
      color: 'black'
    },
    '&:link': {
      color: 'black'
    }
  },
  FontFooter: {
    fontSize: '9px !important',

    '@media (min-width: 270px) and ( max-width:380px)': {
      marginLeft: '10px!important',
      fontSize: '7px !important'
    }
  }
}));

function Basenav() {
  const theme = useTheme();
  const RoleId = sessionStorage.getItem('RoleId');
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width : 600px )');

  return (
    <>
      <Paper square>
        {isMobile && (
          <Box
            sx={{
              pb: '3px',
              pt: '3px',
              zIndex: '9999',
              backgroundColor: '#90caf9'
            }}
          >
            <Grid container textAlign="center">
              <Grid item xs={2.4}>
                {RoleId == '3' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/MessageCenter/msgCenter`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <ForwardToInboxIcon />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '2' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Teacher/Texamschedule`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <img
                        src={'/imges/onlineExam.png'}
                        style={{ width: '20px', height: '22px' }}
                      />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '6' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/MessageCenter/msgCenter`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <ForwardToInboxIcon />
                    </NavLink>
                  </IconButton>
                ) : null}
              </Grid>

              <Grid item xs={2.4}>
                {RoleId == '3' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Student/Homework`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <MenuBookIcon />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '2' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Teacher/TeacherTimeTable`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <AccessTimeIcon />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '6' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Common/schoolnotice`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <AssignmentIcon />
                    </NavLink>
                  </IconButton>
                ) : null}
              </Grid>

              <Grid item xs={2.4}>
                <Fab
                  aria-label="add"
                  size="small"
                  sx={{
                    textAlign: 'center',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <NavLink
                    to="/extended-sidebar/landing/landing"
                    className={classes.root}
                    activeStyle={{ color: '#9e9e9e' }}
                  >
                    <HomeIcon
                      sx={{
                        mt: '5px',
                        color: '${theme.colors.gradients.pink1}'
                      }}
                    />
                  </NavLink>
                </Fab>
              </Grid>

              <Grid item xs={2.4}>
                {RoleId == '3' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Common/schoolnotice`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <EventIcon />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '2' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/MessageCenter/msgCenter`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <ForwardToInboxIcon />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '6' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Common/EventOverview`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <EventIcon />
                    </NavLink>
                  </IconButton>
                ) : null}
              </Grid>

              <Grid item xs={2.4}>
                {RoleId == '3' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Student/attendance`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <EventNoteIcon
                        sx={{ color: '${theme.colors.gradients.pink1}' }}
                      />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '2' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/Common/schoolnotice`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <EventIcon />
                    </NavLink>
                  </IconButton>
                ) : RoleId == '6' ? (
                  <IconButton>
                    <NavLink
                      to={`/${
                        location.pathname.split('/')[1]
                      }/SMSCenter/smsCenter`}
                      className={classes.root}
                      activeStyle={{ color: '#9e9e9e' }}
                    >
                      <SmsIcon />
                    </NavLink>
                  </IconButton>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        )}
        <Grid container height={30}>
          <Grid
            item
            xs={5}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <a href="http://riteschool.com" target="_blank" rel="noreferrer">
              <img
                src={'/imges/RITLOGO.png'}
                height={80}
                width={100}
                style={{ marginTop: '-25px' }}
              />
            </a>
          </Grid>
          <Grid
            item
            xs={7}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            style={{ marginTop: '-25px', float: 'right' }}
          >
            <Typography className={classes.FontFooter} sx={{ mb: 0.5 }}>
              <strong>
                Copyright © {new Date().getFullYear()} RegulusIT.net. All rights
                reserved.
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Basenav;
