import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import ISent from 'src/interfaces/AdminSMSCenter/SentSMS';
import ButtonTab from 'src/libraries/button/ButtonTab';
import PageHeader from 'src/libraries/heading/PageHeader';
import { CardDetailB } from 'src/libraries/styled/CardStyle';
import { getSMSListt } from 'src/requests/AdminSMSCenter/SentSMS';
import { RootState } from 'src/store';

import { useParams } from 'react-router';
SMSCenter.PropTypes = {
  FreeSMS: PropTypes.string
};

function SMSCenter() {
  const dispatch = useDispatch();
  const { FromURL } = useParams();
  const SentSMSData: any = useSelector(
    (state: RootState) => state.SentSMSAdmin.SentSMS
  );

  const pathname = window.location.pathname;
  const pageName =
    pathname.indexOf('/extended-sidebar/SMSCenter/smsCenter/') === -1
      ? pathname.replace('/extended-sidebar/SMSCenter/smsCenter', '')
      : pathname.replace('/extended-sidebar/SMSCenter/smsCenter/', '');

  const body: ISent = {
    asUserId: sessionStorage.getItem('Id'),
    asAcademicYearId: sessionStorage.getItem('AcademicYearId'),
    asSchoolId: localStorage.getItem('localSchoolId')
  };

  useEffect(() => {
    dispatch(getSMSListt(body));
    setActiveTab(pageName === '' ? 'Received' : pageName);
  }, []);

  const classes = Styles();
  const [state, setState] = React.useState(false);
  const [activeTab, setActiveTab] = useState('');

  const clickTab = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <Container>
        <PageHeader heading={'SMS Center'} subheading={''} />

        <Grid container>
          <CardDetailB sx={{ color: 'green' }}>
            <b>{'Free SMS'}:</b>
            {SentSMSData.AllowedSMSCount}
          </CardDetailB>
          <CardDetailB sx={{ color: 'blue' }}>
            <b>{'Sent SMS'}:</b>
            {SentSMSData.SentSMSCount}
          </CardDetailB>
          <CardDetailB sx={{ color: 'red' }}>
            <b>{'Exceeded SMS'}:</b>
            {SentSMSData.ExceededSMSCount}
          </CardDetailB>
        </Grid>
        <br />

        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Link
              to="/extended-sidebar/SMSCenter/Compose"
              className={classes.TextDecoration}
            >
              <ButtonTab
                ButtonType="Compose"
                clickTab={clickTab}
                activeTab={activeTab}
              ></ButtonTab>
            </Link>
          </Grid>

          <Grid item xs={3}>
            <Link
              to="/extended-sidebar/SMSCenter/smsCenter/Received"
              className={classes.TextDecoration}
            >
              <ButtonTab
                ButtonType="Received"
                clickTab={clickTab}
                activeTab={activeTab}
              ></ButtonTab>
            </Link>
          </Grid>

          <Grid item xs={3}>
            <Link
              to="/extended-sidebar/SMSCenter/smsCenter/Sent"
              className={classes.TextDecoration}
            >
              <ButtonTab
                ButtonType="Sent"
                clickTab={clickTab}
                activeTab={activeTab}
              ></ButtonTab>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link
              to="/extended-sidebar/SMSCenter/smsCenter/Scheduled"
              className={classes.TextDecoration}
            >
              <ButtonTab
                ButtonType="Scheduled"
                clickTab={clickTab}
                activeTab={activeTab}
              ></ButtonTab>
            </Link>
          </Grid>
        </Grid>
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
