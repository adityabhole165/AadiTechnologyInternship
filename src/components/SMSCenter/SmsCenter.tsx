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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
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
        <Box sx={{ ml: '5px' }}>
          <Grid container>
            <Typography sx={{ fontSize: '13px', color: 'green' }}>
              <b>{'Free SMS'}:</b>
              {SentSMSData.AllowedSMSCount}
            </Typography>
            <Typography sx={{ ml: '6px', fontSize: '13px', color: 'blue' }}>
              <b>{'Sent SMS'}:</b>
              {SentSMSData.SentSMSCount}
            </Typography>
            <Typography sx={{ ml: '6px', fontSize: '13px', color: 'red' }}>
              <b>{'Exceeded SMS'}:</b>
              {SentSMSData.ExceededSMSCount}
            </Typography>
          </Grid>
        </Box>
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
                  sx={{ fontSize: '10px', marginLeft: '-2px', color: 'black' }}
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
                          fontSize: '10px',
                          backgroundColor: 'black',
                          color: 'white'
                        }
                      : { fontSize: '10px', color: 'black' }
                  }
                >
                  <InboxIcon />
                  <br />
                  <b>Recevied</b>
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
                          fontSize: '10px',
                          backgroundColor: 'black',
                          color: 'white'
                        }
                      : { fontSize: '10px', color: 'black' }
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
                          fontSize: '10px',
                          backgroundColor: 'black',
                          color: 'white',
                          mr: '2px'
                        }
                      : { fontSize: '10px', color: 'black' }
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
