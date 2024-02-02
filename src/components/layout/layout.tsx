import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import SmsIcon from '@mui/icons-material/Sms';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const Text = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  Leftpadding: theme.spacing(1),
  Rightpadding: theme.spacing(1),
  TextAlign: 'center',
  cursor: 'pointer'
}));

const useStyles = makeStyles((theme) => ({
  card: {
    justify: 'center',
    display: 'flex',
    Height: '100px'
  },
  root: {
    '&:active': {
      backgroundColor: 'green'
    }
  }
}));

function Card24() {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Card
          className={classes.card}
          sx={{
            marginTop: '15px',
            height: '150px',
            boxShadow: '1px 1px 20px ',
            backgroundImage: 'linear-gradient(to  right, #e57373, #ce93d8)',
            zIndex: 2
          }}
        >
          <Avatar
            src="https://image.shutterstock.com/image-photo/portrait-cute-kid-boy-four-260nw-193469120.jpg"
            sx={{ width: 76, height: 76, m: 4, border: '3px solid Green' }}
          ></Avatar>
          <Box
            sx={{ borderLeft: '2px solid white', height: '30px', my: '40px' }}
          ></Box>
          <CardContent>
            <Typography sx={{ marginTop: 2, marginLeft: -0.5 }} variant="h4">
              Gargi sharma
            </Typography>

            <Typography
              sx={{ marginTop: 0.8, marginLeft: -0.5 }}
              variant="h6"
              display="inline"
            >
              Class2
            </Typography>

            <Typography
              sx={{
                marginTop: 0.8,
                marginLeft: 2,
                paddingLeft: 2,
                borderLeft: '2px solid white'
              }}
              variant="h6"
              display="inline"
            >
              Roll No.12
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 2, boxShadow: '1px 1px 20px ' }}>
          <CardHeader title="School" />
          <CardContent>
            <Grid
              container
              columnSpacing={6}
              sx={{ marginTop: '-25px', textAlign: 'center' }}
            >
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/schoolnotice">
                  <IconButton>
                    <AssignmentIcon fontSize="large" color="primary" />
                  </IconButton>
                </Link>
                <Text>School Notice</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/eventoverview">
                  <IconButton>
                    <EventIcon fontSize="large" color="secondary" />
                  </IconButton>
                </Link>
                <Text>Annual Planner</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/holidays">
                  <IconButton>
                    <DateRangeIcon fontSize="large" color="warning" />
                  </IconButton>
                </Link>
                <Text>Holidays</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/Gallery">
                  <IconButton>
                    <PhotoIcon
                      fontSize="large"
                      sx={{ color: '#f06292', ml: -1.5 }}
                    />
                  </IconButton>
                </Link>
                <Text sx={{ ml: -1 }}>Photo Gallary</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/VideoGallery">
                  <IconButton>
                    <VideoLibraryIcon
                      fontSize="large"
                      sx={{ color: '#ef5350' }}
                    />
                  </IconButton>
                </Link>
                <Text>Video Gallary</Text>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: 2, boxShadow: '1px 1px 20px ' }}>
          <CardHeader title="Student" />
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ marginTop: '-50px', textAlign: 'center' }}
            >
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/attendance">
                  <IconButton>
                    <EventNoteIcon
                      fontSize="large"
                      sx={{ color: '#00bcd4' }}
                      className={classes.root}
                    />
                  </IconButton>
                </Link>
                <Text>Attendance</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/Timetable">
                  <IconButton>
                    <AccessTimeIcon
                      fontSize="large"
                      color="secondary"
                      className={classes.root}
                    />
                  </IconButton>
                </Link>
                <Text>Timetable</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/Fees">
                  <IconButton>
                    <MonetizationOnIcon
                      fontSize="large"
                      sx={{ color: '#81c784' }}
                      className={classes.root}
                    />
                  </IconButton>
                </Link>
                <Text>Fees</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/Homework">
                  <IconButton>
                    <MenuBookIcon fontSize="large" sx={{ color: '#80cbc4' }} />
                  </IconButton>
                </Link>
                <Text>Homework</Text>
              </Grid>
              <Grid item xs={3} sx={{ marginTop: '-50px' }}>
                <Link to="/extended-sidebar/Student/changePassword">
                  <IconButton>
                    <LockOpenIcon
                      fontSize="large"
                      color="secondary"
                      sx={{ mt: '1.5rem' }}
                    />
                  </IconButton>
                </Link>
                <Text>Change Password</Text>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 2, boxShadow: '1px 1px 20px ' }}>
          <CardHeader title="Exam" />
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ marginTop: '-60px', textAlign: 'center' }}
            >
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/SubjectTeacher">
                  <IconButton>
                    <PeopleIcon fontSize="large" color="primary" />
                  </IconButton>
                </Link>
                <Text sx={{ marginTop: -1 }}>Subject Teachers</Text>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/examschedule">
                  <IconButton>
                    <CalendarTodayIcon fontSize="large" color="success" />
                  </IconButton>
                </Link>
                <Text sx={{ marginTop: -1 }}>Exam Schedule</Text>
              </Grid>

              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/progressreport">
                  <IconButton>
                    <AssessmentIcon fontSize="large" color="warning" />
                  </IconButton>
                </Link>
                <Text sx={{ marginTop: -1 }}>Progress Report</Text>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card
          sx={{ marginTop: 2, marginBottom: 8, boxShadow: '1px 1px 20px ' }}
        >
          <CardHeader title="Communication" />
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ marginTop: '-60px', textAlign: 'center' }}
            >
              <Grid item xs={3}>
                <Link to="/extended-sidebar/MessageCenter/msgCenter">
                  <IconButton>
                    <ForwardToInboxIcon
                      fontSize="large"
                      sx={{ color: '#ff7043' }}
                    />
                  </IconButton>
                </Link>
                <Typography variant="body1" sx={{ marginTop: -1 }}>
                  Massege Center
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/smscenter">
                  <IconButton>
                    <SmsIcon fontSize="large" sx={{ color: '#aed581' }} />
                  </IconButton>
                </Link>
                <Typography variant="body1" sx={{ marginTop: -1 }}>
                  Sms center
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Link to="/extended-sidebar/Student/pta">
                  <IconButton>
                    <PeopleIcon fontSize="large" color="info" />
                  </IconButton>
                </Link>
                <Typography variant="body1" sx={{ marginTop: -1 }}>
                  PTA
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Card24;
