import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
  Grid, IconButton, Popover, Stack, ToggleButton,
  ToggleButtonGroup, Tooltip, Typography
} from '@mui/material';
import { green, grey, orange, red } from '@mui/material/colors';
import {
  differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Carousel from 'src/libraries/card/Carousel';
import { getUpcomingStaffBdayList } from 'src/requests/Birthdays/RequestBirthdays';
import { RootState } from 'src/store';

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
    <Box sx={{ height: '300px', backgroundColor: 'white', p: 1. }}>
      <Grid item sx={{ mb: '0px', display: 'flex', backgroundColor: '#38548A', borderRadius: '10px' }}>
        <Grid item xs={12}>
          <Typography variant="h3" p={0.8} sx={{ color: 'white', }}>
            Birthdays
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton sx={{ mt: '4px', pr: 1 }} >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',      // Circle diameter
              height: '30px',     // Circle diameter
              borderRadius: '50%', // Makes the Box a circle
              backgroundColor: 'white', // Secondary background color
              color: 'black',      // Text color
              fontSize: '0.8rem',
            }}> <b>{Birthdays.length !== 0 ? Birthdays.length : '0'}</b></Box>



          </IconButton>

          <Tooltip
            title={`You are viewing ${countdown} old data, click here to see the latest data.`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IconButton onClick={handleRefresh}>
              <RefreshIcon
                // sx={{ mt: '5px', mr: '0px' }} 
                sx={{
                  color: 'white',
                  borderRadius: '7px',
                  mt: '4px',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: grey[600] }
                }} />
            </IconButton>
          </Tooltip>
          <IconButton
            sx={{ mt: '4px' }} onClick={handleClickpop}>
            <SettingsIcon
              sx={{
                color: 'white',
                // background:'white',
                borderRadius: '7px',
                cursor: 'pointer',
                '&:hover':
                  { backgroundColor: grey[600] }
              }} />
          </IconButton>
        </Grid>
        {/* <Grid item xs={6}>
         
        </Grid> */}
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handleClose}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
          <Typography>Select User</Typography>
          <ToggleButtonGroup value={alignment} exclusive onChange={(e, newAlignment) => setAlignment(newAlignment)}>
            <ToggleButton value="T">T</ToggleButton>
            <ToggleButton value="S">S</ToggleButton>
            <ToggleButton value="A">A</ToggleButton>
            <ToggleButton value="O">O</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ display: 'flex' }} p={1}>
          <Typography>Select View</Typography>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, newView) => setView(newView)}
            sx={{ ml: '25px' }}
          >
            <ToggleButton value="T">T</ToggleButton>
            <ToggleButton value="W">W</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Stack direction="row" spacing={2} sx={{ my: 1, px: 5 }}>
          <Tooltip title="Apply Filter">
            <Avatar sx={{ bgcolor: green[500] }} variant="square">
              <CheckIcon onClick={applyFilter} />
            </Avatar>
          </Tooltip>
          <Tooltip title="Clear Filter">
            <Avatar sx={{ bgcolor: orange[500] }} variant="square">
              <ReplayIcon onClick={handleRefresh} />
            </Avatar>
          </Tooltip>
          <Tooltip title="Cancel">
            <Avatar sx={{ bgcolor: red[500] }} variant="square">
              <CloseIcon onClick={handleClose} />
            </Avatar>
          </Tooltip>
        </Stack>
      </Popover>

      <Box sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <SuspenseLoader />
        ) : Birthdays.length !== 0 ? (
          <Carousel itemlist={Birthdays} />
        ) : (
          <Typography variant="h4" color="textSecondary">
            No records found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default BirthdayDashboard;
