import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getUpcomingStaffBdayList } from 'src/requests/Birthdays/RequestBirthdays';
import Carousel from 'src/libraries/card/Carousel';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Container, ToggleButton, ToggleButtonGroup, Card, CardHeader, Box, Badge } from '@mui/material';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';


function Birthdays() {
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const DOB = localStorage.getItem('DOB');
  const [view, setView] = useState('T');
  const [isRefresh, setIsRefresh] = useState(false)
  const Birthdays: any = useSelector(
    (state: RootState) => state.Birthdays.BirthdaysList
  );

  const loading = useSelector(
    (state: RootState) => state.Birthdays.Loading
  );


  const BirthdaysBody = {

    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserRoleId: "3",
    asView: view

  }

  useEffect(() => {
    dispatch(getUpcomingStaffBdayList(BirthdaysBody));
  }, [view, isRefresh]);


  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };


  return (
    <Container>
      <PageHeader heading={'Birthdays'} subheading={''} />
      <Card component={Box} my={2} pr={3}>
        <Box sx={{ float: "right", my: 1 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleChange}>
            <ToggleButton value="T">T</ToggleButton>
            <ToggleButton value="W">W</ToggleButton>
          </ToggleButtonGroup>

          <RefreshIcon onClick={() => { setIsRefresh(!isRefresh) }} sx={{ ml: 1 }} />


          <Badge sx={{ ml: 2, mt: -0.5 }}
            badgeContent={Birthdays.length !== 0 ? Birthdays.length : '0'}
            color="secondary" />
        </Box>
      </Card>
      {
        loading ? (
          <SuspenseLoader />
        ) :
        (<>
          {Birthdays.length !==0 ?  <Carousel itemlist={Birthdays} /> :
        <ErrorMessages Error={'No records found'} />}
        </>
      )
       
      }
    </Container>
  )
}

export default Birthdays
