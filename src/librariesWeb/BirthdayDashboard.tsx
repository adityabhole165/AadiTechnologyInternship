import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Grid } from '@mui/material';
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'src/libraries/card/Carousel';
import { getUpcomingStaffBdayList } from 'src/requests/Birthdays/RequestBirthdays';
import { RootState } from 'src/store';
import Actions from './Actions';
import BirthdayPopup from './BirthdayPopup';
import Header from './Header';

function BirthdayDashboard() {
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const [view, setView] = useState('T');
  const [isRefresh, setIsRefresh] = useState(false);
  const [alignment, setAlignment] = useState('S'); // State to track selected role
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const Birthdays = useSelector((state: RootState) => state.Birthdays.BirthdaysList);
  const loading = useSelector((state: RootState) => state.Birthdays.Loading);

  // Role ID Mapping
  const roleIdMapping = {
    T: '2', // Teacher
    S: '3', // Student
    A: '6', // Admin
    O: '7'  // Other
  };

  // Setting up the initial body for fetching birthdays
  const [BirthdaysBody, setBirthdaysBody] = useState({
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserRoleId: roleIdMapping[alignment], // Mapping based on current alignment state
    asView: view
  });

  // Effect to fetch birthdays when the body or refresh state changes
  useEffect(() => {
    dispatch(getUpcomingStaffBdayList(BirthdaysBody));
  }, [BirthdaysBody, isRefresh]);

  // Refresh handler to reset filters and refetch data
  const handleRefresh = () => {
    setLastRefreshTime(new Date());
    setView('T');
    setAlignment('S');
    setBirthdaysBody({
      aiSchoolId: asSchoolId,
      aiAcademicYrId: asAcademicYearId,
      aiUserRoleId: roleIdMapping['S'], // Reset to default alignment 'S'
      asView: 'T'
    });
    setIsRefresh(prev => !prev);
    setAnchorEl(null);
  };

  // Function to get the time difference between the last refresh and now
  const getTimeDifference = () => {
    if (!lastRefreshTime) return 'no';

    const now = new Date();
    const seconds = differenceInSeconds(now, lastRefreshTime);
    if (seconds < 60) {
      return `${seconds} second(s)`;
    }

    const minutes = differenceInMinutes(now, lastRefreshTime);
    if (minutes < 60) {
      return `${minutes} minute(s)`;
    }

    const hours = differenceInHours(now, lastRefreshTime);
    return `${hours} hour(s)`;
  };

  // Function to update the countdown timer
  const updateCountdown = () => {
    setCountdown(getTimeDifference());
  };

  // Effect to manage the countdown timer
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [lastRefreshTime]);

  // Mouse event handlers for the refresh tooltip
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(updateCountdown, 1000);
  };

  // Handle click for the settings popover
  const handleClickpop = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(prevAnchorEl => (prevAnchorEl ? null : event.currentTarget));
  };

  // Close popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Apply filters based on selected role and view
  const applyFilter = () => {
    setBirthdaysBody({
      aiSchoolId: asSchoolId,
      aiAcademicYrId: asAcademicYearId,
      aiUserRoleId: roleIdMapping[alignment], // Apply selected role
      asView: view // Apply selected view
    });
    setAnchorEl(null);
    setLastRefreshTime(new Date());
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ height: '382px', backgroundColor: 'white', pt: 1 }}>
      <Grid container>
        <Grid item xs={6}>
          <Grid item xs={4} sx={{ pl: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
            <Header Title="Birthdays" />
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 4 }}>
          <Actions IconType="Label" DiplayText={Birthdays.length !== 0 ? Birthdays.length : '0'} />
          <Actions
            Icon={RefreshIcon}
            ClickIcon={handleRefresh}
            title={`You are viewing ${countdown} old data, click here to see the latest data.`}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
          <Actions Icon={SettingsIcon} ClickIcon={handleClickpop} />
        </Grid>
      </Grid>

      {/* Popover for role-based filtering */}
      <BirthdayPopup
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        applyFilter={applyFilter}
        handleRefresh={handleRefresh}
        alignment={alignment}
        setAlignment={setAlignment} // Passing setAlignment to update role
        view={view}
        setView={setView} // Passing setView to update view
      />

      {/* Carousel displaying the birthdays */}
      <Carousel itemlist={Birthdays} />
    </Box>
  );
}

export default BirthdayDashboard;
