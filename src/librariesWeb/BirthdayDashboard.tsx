import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Badge,
  Box,
  Card,
  Grid,
  IconButton,
  Popover,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Carousel from 'src/libraries/card/Carousel';
import { getUpcomingStaffBdayList } from 'src/requests/Birthdays/RequestBirthdays';
import { RootState } from 'src/store';

import CheckIcon from '@mui/icons-material/Check';
function BirthdayDashboard() {
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
  const [alignment, setAlignment] = useState('T');

  const ClickStaff = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment != null) setAlignment(newAlignment);
    // setAlignment(newAlignment);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickpop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Card sx={{ height: '280px' }}>
      <Grid container sx={{ mb: '-7px' }}>
        <Grid item xs={6}>
          <Typography variant="h3" p={1} sx={{ color: '#304ffe' }}>
            Birthdays
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <RefreshIcon
              onClick={() => {
                setIsRefresh(!isRefresh);
              }}
              sx={{ mt: '11px', mr: '5px' }}
            />
            <IconButton sx={{ mt: '5px' }}>
              <Badge
                badgeContent={Birthdays.length !== 0 ? Birthdays.length : '0'}
                color="secondary"
              />
            </IconButton>
            <IconButton sx={{ mt: '5px' }}>
              <SettingsIcon onClick={handleClickpop} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
          <Typography>Select User</Typography>
          <ToggleButtonGroup value={alignment} exclusive onChange={ClickStaff}>
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
            onChange={handleChange}
            sx={{ ml: '25px' }}
          >
            <ToggleButton value="T">T</ToggleButton>
            <ToggleButton value="W">W</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Stack direction="row" spacing={2} sx={{ my: 1, px: 5 }}>
          <Tooltip title="Apply Filter">
            <Avatar sx={{ bgcolor: green[500] }} variant="square">
              <CheckIcon onClick={handleClose} />
            </Avatar>
          </Tooltip>
          <Avatar sx={{ bgcolor: orange[500] }} variant="square">
            <ReplayIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: red[500] }} variant="square">
            <CloseIcon onClick={handleClose} />
          </Avatar>
        </Stack>
      </Popover>

      <>
        {loading ? (
          <SuspenseLoader />
        ) : (
          <>
            {Birthdays.length !== 0 ? (
              <Carousel itemlist={Birthdays} />
            ) : (
              <ErrorMessages Error={'No records found'} />
            )}
          </>
        )}
      </>
    </Card>
  );
}

export default BirthdayDashboard;
