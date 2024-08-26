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
import Carousel from 'src/libraries/card/Carousel';
import { getUpcomingStaffBdayList } from 'src/requests/Birthdays/RequestBirthdays';
import { RootState } from 'src/store';

import CheckIcon from '@mui/icons-material/Check';

function BirthdayDashboard() {
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const DOB = sessionStorage.getItem('DOB');
  const [view, setView] = useState('T'); // Set default view to 'T'
  const [isRefresh, setIsRefresh] = useState(false);
  const [alignment, setAlignment] = useState('S'); // Set default alignment to 'S'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView != null) {
      setView(newView);
    }
  };

  const ClickStaff = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment != null) {
      setAlignment(newAlignment);
    }
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
            <IconButton sx={{ mt: '5px', mr: '8px' }}>
              <Badge
                badgeContent={Birthdays.length !== 0 ? Birthdays.length : '0'}
                color="secondary"
              />
            </IconButton>
            <Tooltip title={`You are viewing old data, click here to see latest data.`}>
              <IconButton
                onClick={() => {
                  setView('T');
                  setAlignment('S');
                  setBirthdaysBody(prevBody => ({
                    ...prevBody,
                    aiUserRoleId: roleIdMapping['S'],
                    asView: 'T'
                  }));
                  setIsRefresh(prev => !prev);
                }}
              >
                <RefreshIcon
                  sx={{ mt: '5px', mr: '0px' }}
                />
              </IconButton>
            </Tooltip>
            <IconButton sx={{ mt: '5px' }} onClick={handleClickpop}>
              <SettingsIcon />
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
        onClose={handleClose} // Ensure Popover closes on clicking outside
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
              <CheckIcon onClick={applyFilter} />
            </Avatar>
          </Tooltip>
          <Avatar sx={{ bgcolor: orange[500] }} variant="square">
            <ReplayIcon onClick={() => {
              setView('T');
              setAlignment('S');
              setBirthdaysBody(prevBody => ({
                ...prevBody,
                aiUserRoleId: roleIdMapping['S'],
                asView: 'T'
              }));
              setIsRefresh(prev => !prev);
            }} />
          </Avatar>
          <Avatar sx={{ bgcolor: red[500] }} variant="square">
            <CloseIcon onClick={handleClose} />
          </Avatar>
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
    </Card>
  );
}

export default BirthdayDashboard;
