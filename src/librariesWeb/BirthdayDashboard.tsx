import RefreshIcon from '@mui/icons-material/Refresh';

import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Grid,
  IconButton
} from '@mui/material';
import {
  differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
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
  const [alignment, setAlignment] = useState('S');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const Birthdays = useSelector((state: RootState) => state.Birthdays.BirthdaysList);
  const loading = useSelector((state: RootState) => state.Birthdays.Loading);

  const roleIdMapping = {
    T: '2',
    S: '3',
    A: '6',
    O: '7'
  };

  const [BirthdaysBody, setBirthdaysBody] = useState({
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserRoleId: roleIdMapping[alignment],
    asView: view
  });

  useEffect(() => {
    dispatch(getUpcomingStaffBdayList(BirthdaysBody));
  }, [BirthdaysBody, isRefresh]);

  const handleRefresh = () => {
    setLastRefreshTime(new Date());
    setView('T');
    setAlignment('S');
    setBirthdaysBody(prevBody => ({
      ...prevBody,
      aiUserRoleId: roleIdMapping['S'],
      asView: 'T'
    }));
    setIsRefresh(prev => !prev);
    setAnchorEl(null);
    setLastRefreshTime(new Date());
  };


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

  const updateCountdown = () => {
    setCountdown(getTimeDifference());
  };

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
  const handleClickpop = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(prevAnchorEl => (prevAnchorEl ? null : event.currentTarget));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilter = () => {
    setBirthdaysBody(prevBody => ({
      ...prevBody,
      aiUserRoleId: roleIdMapping[alignment],
      asView: view
    }));
    setAnchorEl(null);
    setLastRefreshTime(new Date());
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ height: '300px', backgroundColor: 'white', pt: 1 }}>
     <Grid container >
        <Grid item xs={6}>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Header Title="Birthdays" />
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3.5 }}>
          <Actions IconType="Label" DiplayText={Birthdays.length !== 0 ? Birthdays.length : '0'} />
         <Actions Icon={RefreshIcon} ClickIcon={handleRefresh}
            title={`You are viewing ${countdown} old data, click here to see the latest data.`}
            handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <Actions Icon={SettingsIcon} ClickIcon={handleClickpop} />
           </Grid>        
      </Grid>
     
      {/* <Grid xs={12} item sx={{ mb: '0px', display: 'flex', borderRadius: '10px', pr: 3  }}> */}
       {/* <Grid item xs={12}>  */}
        {/* <Header Title="Birthdays" /> */}
        {/* <Actions IconType="Label" DiplayText={Birthdays.length !== 0 ? Birthdays.length : '0'} /></Grid> */}
        {/* <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3 }}>
          <Actions Icon={RefreshIcon} ClickIcon={handleRefresh}
            title={`You are viewing ${countdown} old data, click here to see the latest data.`}
            handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <Actions Icon={SettingsIcon} ClickIcon={handleClickpop} />
        </Grid> */}
      {/* </Grid> */}
      <BirthdayPopup open={open} anchorEl={anchorEl} handleClose={handleClose}
        applyFilter={applyFilter} handleRefresh={handleRefresh} />
      <Carousel itemlist={Birthdays} />
    </Box>
  );  
}

export default BirthdayDashboard;
