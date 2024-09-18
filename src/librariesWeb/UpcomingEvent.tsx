import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Grid, Typography } from '@mui/material';
import {
  differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IUpcomingEventDashBody } from 'src/interfaces/UpcomingEventDash/IUpcomingEventDash';
import { getUpcomingEventDashdata } from 'src/requests/UpcomingEventDash/ReqUpcomingEventDash';
import { RootState } from 'src/store';
import Actions from './Actions';
import Header from './Header';

function UpcomingEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventType, setSelectedEventType] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asUserRoleId = Number(sessionStorage.getItem('RoleId'));

  const UpcomingEventDash = useSelector((state: RootState) => state.UpcomingEventDash.UpcomingEventData);

  const UpcomingEventDashBody: IUpcomingEventDashBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserId: asUserId,
    aiUserRoleId: asUserRoleId,
    isScreenFullAccess: false
  };

  useEffect(() => {
    dispatch(getUpcomingEventDashdata(UpcomingEventDashBody));
  }, []);



  const handleEventTypeClick = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  const filteredEvents = UpcomingEventDash.filter(event =>
    selectedEventType === '' || event.Text6 === selectedEventType
  );

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
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
  const handleRefresh = () => {
    dispatch(getUpcomingEventDashdata(UpcomingEventDashBody));
    setLastRefreshTime(new Date());
  };
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
  const getButtonColor = (eventType: string) => {
    switch (eventType) {
      case 'Event': return '#4db6ac';
      case 'Holiday': return '#64b5f6';
      case 'Exam': return 'orange';
      default: return '#F0F0F0';
    }
  };

  return (
    <Box sx={{ height: 'auto', width: 'auto', backgroundColor: 'white', p: 1 }}>
      <Grid item xs={12}>
        <Header Title="Upcoming Event" />
      </Grid>

      <Grid container spacing={1}>
        {/* <Grid item sm={6} md={12}>
          <Box justifyContent={'center'} px={4.5}>
            <MonthSelector
              DefaultDate={selectedDate}
              ClickDate={handleDateChange}
            />
          </Box>
        </Grid> */}

        <Actions Icon={RefreshIcon} ClickIcon={handleRefresh}
          title={`You are viewing ${countdown} old data, click here to see the latest data.`}
          handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />

        <Grid container spacing={1} sx={{ mt: 1 }}>
          {['Event', 'Holiday', 'Exam'].map((eventType) => (
            <Grid item xs={4} key={eventType}>
              <Button
                sx={{
                  backgroundColor: selectedEventType === eventType ? '#F0F0F0' : getButtonColor(eventType),
                  color: 'black',
                  height: '3rem',
                  width: '100%',
                }}
                onClick={() => handleEventTypeClick(eventType)}
              >
                <b>{eventType}</b>
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${getButtonColor(event.Text6)}`,
                  borderRadius: 2,
                  mb: 2
                }}
              >
                <Typography variant="h6">{event.Text3}</Typography>
                <Typography variant="body2" color="textSecondary">{event.Text1}</Typography>
                <Typography variant="body2">{event.Text4}</Typography>
              </Box>
            </Grid>
          ))}
          {filteredEvents.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                No events found for the selected type.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container py={1.5} >
        <Grid item xs={7} textAlign={'right'} onClick={() => { navigate('/extended-sidebar/Common/AnnualPlanner') }}>
          <Typography variant="h4"> <b>See all events</b></Typography>
        </Grid>
        <Grid item xs={5}>
          <ArrowCircleRightIcon />
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign={'right'}>
        <Typography variant="h4"> <b>Please re-login or refresh the widget to see the updates.</b></Typography>
      </Grid>
    </Box>
  );
}

export default UpcomingEvent;
