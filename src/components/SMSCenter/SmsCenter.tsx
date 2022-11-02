import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InboxIcon from '@mui/icons-material/Inbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AlarmIcon from '@mui/icons-material/Alarm';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import ISent, {
  GetAllSentSMSPermissionAndCountsResult
} from 'src/interfaces/AdminSMSCenter/SentSMS';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getSMSListt } from 'src/requests/AdminSMSCenter/SentSMS';
import { CardDetail1, CardDetail2, CardDetail7 } from 'src/libraries/styled/CardStyle';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  color:'black',
  fontSize: '10px',
  boxShadow:
  '0px 8px 15px rgba(0, 0, 0, 0.1)',
  '@media (max-width: 280px)' : {
    fontSize: '8px',
  },
  
  
}));

SMSCenter.PropTypes = {
  FreeSMS: PropTypes.string
};

function SMSCenter() {
  const dispatch = useDispatch();

  const SentSMSData: any = useSelector(
    (state: RootState) => state.SentSMSAdmin.SentSMS
  );

  const body: ISent = {
    asUserId: '659',
    asAcademicYearId: '9',
    asSchoolId: '120'
  };

  useEffect(() => {
    dispatch(getSMSListt(body));
  }, []);

  const classes = Styles();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/SMSCenter/smsCenter/',
    ''
  );

  return (
    <>
      <Container>
        <PageHeader heading={'SMS Center'} subheading={''} />
      
          <Grid container>
            <CardDetail7 sx={{  color: 'green' }}>
              <b>{'Free SMS'}:</b>
              {SentSMSData.AllowedSMSCount}
            </CardDetail7> 
            <CardDetail7 sx={{  color: 'blue' }}>
              <b>{'Sent SMS'}:</b>
              {SentSMSData.SentSMSCount}
            </CardDetail7>
            <CardDetail7 sx={{  color: 'red' }}>
              <b>{'Exceeded SMS'}:</b>
              {SentSMSData.ExceededSMSCount}
            </CardDetail7>
          </Grid>
       <br/>
        <Box sx={{ width: '100%', mt: 'px', ml: '2px', mb: '10px' }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          >
            <Grid item xs={3}>
              {/* /:inputBoxValue */}
              <Link
                to="/extended-sidebar/SMSCenter/Compose"
                className={classes.TextDecoration}
              >
                <Item
                  sx={{  marginLeft: '-2px', color: 'black' }}
                >
                  <AddCircleIcon />
                  <br />
                  <b>Compose</b>
                </Item>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <Link
                to="/extended-sidebar/SMSCenter/smsCenter/Received"
                className={classes.TextDecoration}
              >
                <Item
                  sx={
                    pageName == '/extended-sidebar/SMSCenter/smsCenter' ||
                    pageName == 'Received'
                      ? {
                         
                          backgroundColor: 'black',
                          color: 'white'
                        }
                      : {  color: 'black' }
                  }
                >
                  <InboxIcon />
                  <br />
                  <b>Received</b>
                </Item>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <Link
                to="/extended-sidebar/SMSCenter/smsCenter/Sent"
                className={classes.TextDecoration}
              >
                <Item
                  sx={
                    pageName == 'Sent'
                      ? {
                        
                          backgroundColor: 'black',
                          color: 'white'
                        }
                      : {  color: 'black' }
                  }
                >
                  <SendIcon />
                  <br />
                  <b>Sent</b>
                </Item>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <Link
                to="/extended-sidebar/SMSCenter/smsCenter/Scheduled"
                className={classes.TextDecoration}
              >
                <Item
                  sx={
                    pageName == 'Scheduled'
                      ? {
                         
                          backgroundColor: 'black',
                          color: 'white',
                          ml: '-6px'
                        }
                      : {  color: 'black',    ml: '-6px' }
                  }
                >
                  <AlarmIcon />
                  <br />
                  <b>Scheduled</b>
                </Item>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box
        display="block"
        sx={{ position: 'absolute', width: '100%', paddingBottom: '80px' }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default SMSCenter;
