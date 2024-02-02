import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Badge,
  Box,
  Card,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Carousel from 'src/libraries/card/Carousel';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getUpcomingStaffBdayList } from 'src/requests/Birthdays/RequestBirthdays';
import { RootState } from 'src/store';
import BdayCard from './BdayCard';

function Birthdays() {
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const DOB = sessionStorage.getItem('DOB');
  const [view, setView] = useState('T');
  const [isRefresh, setIsRefresh] = useState(false);
  const Birthdays: any = useSelector(
    (state: RootState) => state.Birthdays.BirthdaysList
  );

  const loading = useSelector((state: RootState) => state.Birthdays.Loading);
  //Birth date of student
  const curYear = new Date().getFullYear();
  const date = DOB;
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString('default', { month: 'short' });
  const newdate = `${day} ${month} ${curYear}`;

  // Todays date
  const d = new Date().getDate();
  const m = new Date().toLocaleString('default', { month: 'short' });
  const y = new Date().getFullYear();
  const ToDay = `${d} ${m} ${y}`;

  const BirthdaysBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserRoleId: '3',
    asView: view
  };

  useEffect(() => {
    dispatch(getUpcomingStaffBdayList(BirthdaysBody));
  }, [view, isRefresh]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView != null) setView(newView);
  };

  return (
    <Container>
      <PageHeader heading={'Birthdays'} subheading={''} />
      {newdate == ToDay ? <BdayCard /> : null}
      <Card component={Box} my={1} pr={3}>
        <Stack
          sx={{ display: 'flex', flexDirection: 'row', float: 'right', my: 1 }}
        >
          <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
            <ToggleButton value="T">T</ToggleButton>
            <ToggleButton value="W">W</ToggleButton>
          </ToggleButtonGroup>

          <RefreshIcon
            onClick={() => {
              setIsRefresh(!isRefresh);
            }}
            sx={{ ml: 1, mt: 0.2 }}
          />

          <Badge
            sx={{ ml: 2, mt: 1.5 }}
            badgeContent={Birthdays.length !== 0 ? Birthdays.length : '0'}
            color="secondary"
          />
        </Stack>
      </Card>
      <>
        {loading ? (
          <SuspenseLoader />
        ) : (
          <>
            {Birthdays.length !== 0 ? (
              <Card>
                {' '}
                <Carousel itemlist={Birthdays} />
              </Card>
            ) : (
              <ErrorMessages Error={'No records found'} />
            )}
          </>
        )}
      </>
    </Container>
  );
}

export default Birthdays;
